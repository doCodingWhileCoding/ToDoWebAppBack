import {
  isDuplicatedTask,
  saveTask,
  isExistingTask,
  getTaskById,
  getPaginatedTasks,
  deleteTaskById,
  deleteAllTasks,
  updateTaskById,
  updateTaskIsCompletedById,
  updateTaskPositionById,
} from '../services/task.services.js'
import errorMessages from '../constants/error_messages.js'

export const createTask = async (req, res, next) => {
  if (await isDuplicatedTask(req.body.title, false)) {
    const err = {
      statusCode: 301,
      errMsg: errorMessages.MODELS.TASK.DUPLICATED,
    }
    return next(err)
  }
  try {
    const savedTask = await saveTask(req.body)
    return res.status(200).json(savedTask)
  } catch (error) {
    return next(error)
  }
}

export const getTask = async (req, res, next) => {
  const taskId = req.params.taskId
  if (!(await isExistingTask(taskId))) {
    const err = {
      statusCode: 404,
      errMsg: errorMessages.NOT_FOUND,
    }
    return next(err)
  }
  try {
    const task = await getTaskById(taskId)
    return res.status(200).json(task)
  } catch (error) {
    return next(error)
  }
}

export const getTasks = async (req, res, next) => {
  const { type, page = 1, limit = 10 } = req.query
  try {
    const tasks = await getPaginatedTasks(type, limit, page)
    return res.status(200).json(tasks)
  } catch (error) {
    return next(error)
  }
}

export const deleteTask = async (req, res, next) => {
  const taskId = req.params.taskId
  if (!(await isExistingTask(taskId))) {
    const err = {
      statusCode: 404,
      errMsg: errorMessages.NOT_FOUND,
    }
    return next(err)
  }
  try {
    const deletedTask = await deleteTaskById(taskId)
    return res.status(200).json(deletedTask)
  } catch (error) {
    return next(error)
  }
}

export const deleteTasks = async (req, res, next) => {
  try {
    const deletedTasksNumber = await deleteAllTasks()
    return res.status(200).json(deletedTasksNumber)
  } catch (error) {
    return next(error)
  }
}

export const updateTask = async (req, res, next) => {
  const taskId = req.params.taskId
  if (!(await isExistingTask(taskId))) {
    const err = {
      statusCode: 404,
      errMsg: errorMessages.NOT_FOUND,
    }
    return next(err)
  }
  try {
    const updatedTask = await updateTaskById(taskId, req.body)
    return res.status(200).json(`Updated: ${updatedTask}`)
  } catch (error) {
    return next(error)
  }
}
export const updateTaskIsCompleted = async (req, res, next) => {
  const taskId = req.params.taskId
  if (!(await isExistingTask(taskId))) {
    const err = {
      statusCode: 404,
      errMsg: errorMessages.NOT_FOUND,
    }
    return next(err)
  }
  try {
    const updatedTask = await updateTaskIsCompletedById(taskId, req.body.isCompleted)
    return res.status(200).json(`Updated: ${updatedTask}`)
  } catch (error) {
    return next(error)
  }
}
export const updateTaskPosition = async (req, res, next) => {
  const taskId = req.params.taskId
  if (!(await isExistingTask(taskId))) {
    const err = {
      statusCode: 404,
      errMsg: errorMessages.NOT_FOUND,
    }
    return next(err)
  }
  try {
    const updatedTask = await updateTaskPositionById(taskId, req.body.position)
    return res.status(200).json(`Updated: ${updatedTask}`)
  } catch (error) {
    return next(error)
  }
}
