import Task from '../models/Task.js'

export const isDuplicatedTask = async (title, completed) => {
  return await Task.exists({ title, completed })
}
export const isExistingTask = async (id) => {
  return await Task.exists({ _id: id })
}
export const getTaskById = async (id) => {
  const task = await Task.findById(id)
  return task
}
export const getPaginatedTasks = async (limit, page) => {
  const tasks = await Task.paginate(
    {},
    {
      limit,
      page,
    }
  )
  return tasks
}
export const deleteTaskById = async (id) => {
  const deletedTask = await Task.findByIdAndDelete(id)
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
export const saveTask = async (body) => {
  const task = new Task(body)
  const savedTask = await task.save()
  return savedTask
}

export const createTask = async () => {}
