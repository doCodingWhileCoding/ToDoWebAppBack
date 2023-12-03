import Task from '../models/Task.js'
import { TasksQueryTypes } from '../constants/enums.js'
import { utcToZonedTime } from 'date-fns-tz'
import { startOfToday } from 'date-fns'
import config from '../../config/dotenv.js'

export const isDuplicatedTask = async (ownerId, title, isCompleted) => {
  return await Task.exists({ ownerId: ownerId, title: title, isCompleted: isCompleted })
}
export const isExistingTask = async (ownerId, taskId) => {
  return await Task.exists({ ownerId: ownerId, _id: taskId })
}
export const getTaskById = async (ownerId, taskId) => {
  const task = await Task.findOne({ ownerId: ownerId, _id: taskId })
  return task
}
export const getPaginatedTasks = async (ownerId, type, limit, page) => {
  if (type === TasksQueryTypes.Inbox) {
    const tasks = getInboxTasks(ownerId, limit, page)
    return tasks
  } else if (type === TasksQueryTypes.Today) {
    const tasks = getTodayTasks(ownerId, limit, page)
    return tasks
  } else if (type === TasksQueryTypes.Upcoming) {
    const tasks = getUpcomingTasks(ownerId, limit, page)
    return tasks
  } else if (type === TasksQueryTypes.Completed) {
    const tasks = getCompletedTasks(ownerId, limit, page)
    return tasks
  }
  const options = {
    limit,
    page,
    sort: { position: -1 },
  }
  const tasks = await Task.paginate(query, options)
  return tasks
}
const getInboxTasks = async (ownerId, limit, page) => {
  const query = { ownerId: ownerId, isCompleted: false, date: null }
  const options = {
    limit,
    page,
    sort: { position: -1 },
  }
  const tasks = await Task.paginate(query, options)
  return tasks
}
const getTodayTasks = async (ownerId, limit, page) => {
  //const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const today = utcToZonedTime(startOfToday(), config.TZ)
  const query = { ownerId: ownerId, isCompleted: false, date: today }
  const options = {
    limit,
    page,
    sort: { position: -1 },
  }
  const tasks = await Task.paginate(query, options)
  return tasks
}
const getUpcomingTasks = async (ownerId, limit, page) => {
  const today = utcToZonedTime(startOfToday(), config.TZ)
  const query = { ownerId: ownerId, isCompleted: false, date: { $gt: today } }
  const options = {
    limit,
    page,
    sort: { position: -1 },
  }
  const tasks = await Task.find(query)
  return tasks
}
const getCompletedTasks = async (ownerId, limit, page) => {
  const query = { ownerId: ownerId, isCompleted: true }
  const options = {
    limit,
    page,
    sort: { position: -1 },
  }
  const tasks = await Task.paginate(query, options)
  return tasks
}

export const deleteTaskById = async (ownerId, taskId) => {
  const taskBeforeDelete = await Task.findOne({ ownerId: ownerId, _id: taskId }).select({
    _id: 0,
    isCompleted: 1,
    position: 1,
  })
  const deletedTask = await Task.findOneAndDelete({ ownerId: ownerId, _id: taskId })
  await updateTasksPositionAfterDelete(ownerId, taskBeforeDelete.isCompleted, taskBeforeDelete.position)
  return deletedTask
}
export const deleteAllTasks = async () => {
  const deletedTasksNumber = await Task.deleteMany({})
  return deletedTasksNumber
}
export const updateTaskById = async (ownerId, taskId, body) => {
  const updatedTask = await Task.findOneAndUpdate({ ownerId: ownerId, _id: taskId }, body, { new: true })
  return updatedTask
}
export const updateTaskIsCompletedById = async (ownerId, taskId, isCompleted) => {
  const taskBeforeUpdate = await Task.findOne({ ownerId: ownerId, _id: taskId }).select({
    _id: 0,
    isCompleted: 1,
    position: 1,
  })
  const position = await getLastPosition(ownerId, isCompleted)
  const updatedTask = await Task.findOneAndUpdate(
    { ownerId: ownerId, _id: taskId },
    { isCompleted, position },
    { new: true }
  )
  await updateTasksPositionAfterisCompletedChange(ownerId, taskBeforeUpdate.isCompleted, taskBeforeUpdate.position)
  return updatedTask
}
export const updateTaskPositionById = async (ownerId, taskId, position) => {
  const updatedTask = await Task.findOneAndUpdate(
    { ownerId: ownerId, taskId: taskId },
    { position: position },
    { new: true }
  )
  //await updateTasksPositionAfterUserReorder(taskBeforeUpdate.isCompleted, taskBeforeUpdate.position, position)
  return updatedTask
}
const getLastPosition = async (ownerId, isCompleted) => {
  const count = await Task.countDocuments({ ownerId: ownerId, isCompleted: isCompleted })
  return count
}
const updateTasksPositionAfterUserReorder = async (isCompleted, oldPosition, newPosition) => {
  if (newPosition < oldPosition) {
    await Task.updateMany({ position: { $gte: newPosition, $lt: oldPosition }, isCompleted }, { $inc: { position: 1 } })
  } else if (newPosition > oldPosition) {
    await Task.updateMany(
      { position: { $gt: oldPosition, $lte: newPosition }, isCompleted },
      { $inc: { position: -1 } }
    )
  }
}
const updateTasksPositionAfterisCompletedChange = async (ownerId, isCompleted, oldPosition) => {
  await Task.updateMany(
    { ownerId: ownerId, isCompleted: isCompleted, position: { $gt: oldPosition } },
    { $inc: { position: -1 } }
  )
}
const updateTasksPositionAfterDelete = async (ownerId, isCompleted, oldPosition) => {
  await Task.updateMany(
    { position: { $gt: oldPosition }, ownerId: ownerId, isCompleted: isCompleted },
    { $inc: { position: -1 } }
  )
}
export const saveTask = async (ownerId, body) => {
  const lastPosition = await getLastPosition(ownerId, false)
  const taskData = {
    ...body,
    ownerId: ownerId,
    position: lastPosition,
  }
  const task = new Task(taskData)
  const savedTask = await task.save()
  return savedTask
}

export const createTask = async () => {}
