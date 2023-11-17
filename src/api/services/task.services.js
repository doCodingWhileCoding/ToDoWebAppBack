import Task from '../models/Task.js'
import { TasksQueryTypes } from '../constants/enums.js'
import { utcToZonedTime } from 'date-fns-tz'
import { startOfToday } from 'date-fns'
import config from '../../config/dotenv.js'

export const isDuplicatedTask = async (title, isCompleted) => {
  return await Task.exists({ title, isCompleted })
}
export const isExistingTask = async (taskId) => {
  return await Task.exists({ _id: taskId })
}
export const getTaskById = async (taskId) => {
  const task = await Task.findById(taskId)
  return task
}
export const getPaginatedTasks = async (type, limit, page) => {
  if (type === TasksQueryTypes.Inbox) {
    const tasks = getInboxTasks(limit, page)
    return tasks
  } else if (type === TasksQueryTypes.Today) {
    const tasks = getTodayTasks(limit, page)
    return tasks
  } else if (type === TasksQueryTypes.Upcoming) {
    const tasks = getUpcomingTasks(limit, page)
    return tasks
  } else if (type === TasksQueryTypes.Completed) {
    const tasks = getCompletedTasks(limit, page)
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
const getInboxTasks = async (limit, page) => {
  const query = { isCompleted: false, date: null }
  const options = {
    limit,
    page,
    sort: { position: -1 },
  }
  const tasks = await Task.paginate(query, options)
  return tasks
}
const getTodayTasks = async (limit, page) => {
  //const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const today = utcToZonedTime(startOfToday(), config.TZ)
  const query = { isCompleted: false, date: today }
  const options = {
    limit,
    page,
    sort: { position: -1 },
  }
  const tasks = await Task.paginate(query, options)
  return tasks
}
const getUpcomingTasks = async (limit, page) => {
  const today = utcToZonedTime(startOfToday(), config.TZ)
  const query = { isCompleted: false, date: { $gt: today } }
  const options = {
    limit,
    page,
    sort: { position: -1 },
  }
  const tasks = await Task.find(query)
  return tasks
}
const getCompletedTasks = async (limit, page) => {
  const query = { isCompleted: true }
  const options = {
    limit,
    page,
    sort: { position: -1 },
  }
  const tasks = await Task.paginate(query, options)
  return tasks
}

export const deleteTaskById = async (taskId) => {
  const taskBeforeDelete = await Task.findById(taskId).select({ _id: 0, isCompleted: 1, position: 1 })
  const deletedTask = await Task.findByIdAndDelete(taskId)
  await updateTaskPositionAfterDelete(taskBeforeDelete.isCompleted, taskBeforeDelete.position)
  return deletedTask
}
export const deleteAllTasks = async () => {
  const deletedTasksNumber = await Task.deleteMany({})
  return deletedTasksNumber
}
export const updateTaskById = async (taskId, body) => {
  const updatedTask = await Task.findByIdAndUpdate(taskId, body, { new: true })
  return updatedTask
}
export const updateTaskIsCompletedById = async (taskId, isCompleted) => {
  const taskBeforeUpdate = await Task.findById(taskId).select({ _id: 0, isCompleted: 1, position: 1 })
  const position = await getLastPosition(isCompleted)
  const updatedTask = await Task.findByIdAndUpdate(taskId, { isCompleted, position }, { new: true })
  await updateTasksPositionAfterisCompletedChange(taskBeforeUpdate.isCompleted, taskBeforeUpdate.position)
  return updatedTask
}
export const updateTaskPositionById = async (taskId, position) => {
  const updatedTask = await Task.findByIdAndUpdate(taskId, { position }, { new: true })
  //await updateTasksPositionAfterUserReorder(taskBeforeUpdate.isCompleted, taskBeforeUpdate.position, position)
  return updatedTask
}
const getLastPosition = async (isCompleted) => {
  const count = await Task.countDocuments({ isCompleted })
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
const updateTasksPositionAfterisCompletedChange = async (isCompleted, oldPosition) => {
  await Task.updateMany({ position: { $gt: oldPosition }, isCompleted }, { $inc: { position: -1 } })
}
const updateTaskPositionAfterDelete = async (isCompleted, oldPosition) => {
  await Task.updateMany({ position: { $gt: oldPosition }, isCompleted }, { $inc: { position: -1 } })
}
export const saveTask = async (body) => {
  const lastPosition = await getLastPosition(false)
  const taskData = {
    ...body,
    position: lastPosition,
  }
  const task = new Task(taskData)
  const savedTask = await task.save()
  return savedTask
}

export const createTask = async () => {}
