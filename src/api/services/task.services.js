import Task from '../models/Task.js'

export const isDuplicatedTask = async (title, isCompleted) => {
  return await Task.exists({ title, isCompleted })
}
export const isExistingTask = async (id) => {
  return await Task.exists({ _id: id })
}
export const getTaskById = async (id) => {
  const task = await Task.findById(id)
  return task
}
export const getPaginatedTasks = async (completed, limit, page) => {
  const query = { isCompleted: completed }
  const options = {
    limit,
    page,
    sort: { position: -1 },
  }
  const tasks = await Task.paginate(query, options)
  return tasks
}
export const deleteTaskById = async (id) => {
  const taskBeforeDelete = await Task.findById(id).select({ _id: 0, isCompleted: 1, position: 1 })
  const deletedTask = await Task.findByIdAndDelete(id)
  await updateTaskPositionAfterDelete(taskBeforeDelete.isCompleted, taskBeforeDelete.position)
  return deletedTask
}
export const deleteAllTasks = async () => {
  const deletedTasksNumber = await Task.deleteMany({})
  return deletedTasksNumber
}
export const updateTaskById = async (id, body) => {
  const updatedTask = await Task.findByIdAndUpdate(id, body, { new: true })
  return updatedTask
}
export const updateTaskIsCompletedById = async (id, isCompleted) => {
  const taskBeforeUpdate = await Task.findById(id).select({ _id: 0, isCompleted: 1, position: 1 })
  const position = await getLastPosition(isCompleted)
  const updatedTask = await Task.findByIdAndUpdate(id, { isCompleted, position }, { new: true })
  await updateTasksPositionAfterisCompletedChange(taskBeforeUpdate.isCompleted, taskBeforeUpdate.position)
  return updatedTask
}
export const updateTaskPositionById = async (id, position) => {
  const updatedTask = await Task.findByIdAndUpdate(id, { position }, { new: true })
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
  console.log('updateTaskPositionAfterDelete')
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
