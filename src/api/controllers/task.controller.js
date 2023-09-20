import {
  isDuplicatedTask,
  saveTask,
  isExistingTask,
  getTaskById,
  getPaginatedTasks,
  deleteTaskById,
  deleteAllTasks,
  updateTaskById,
} from '../services/task.services.js'
import errorMessages from '../constants/error_messages.js'

export const createTask = async (req, res, next) => {
  if (await isDuplicatedTask(req.body.title, req.body.completed)) {
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
  const id = req.params.id
  if (!(await isExistingTask(id))) {
    const err = {
      statusCode: 404,
      errMsg: errorMessages.NOT_FOUND,
    }
    return next(err)
  }
  try {
    const task = await getTaskById(id)
    return res.status(200).json(task)
  } catch (error) {
    return next(error)
  }
}

export const getTasks = async (req, res, next) => {
  const limit = req.body.limit || 10
  const page = req.body.page || 1
  try {
    const tasks = await getPaginatedTasks(limit, page)
    return res.status(200).json(tasks)
  } catch (error) {
    return next(error)
  }
}

export const deleteTask = async (req, res, next) => {
  const id = req.params.id
  if (!(await isExistingTask(id))) {
    const err = {
      statusCode: 404,
      errMsg: errorMessages.NOT_FOUND,
    }
    return next(err)
  }
  try {
    const deletedTask = await deleteTaskById(id)
    return res.status(200).json(`Deleted: ${deletedTask}`)
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
  const id = req.params.id
  if (!(await isExistingTask(id))) {
    const err = {
      statusCode: 404,
      errMsg: errorMessages.NOT_FOUND,
    }
    return next(err)
  }
  try {
    const updatedTask = await updateTaskById(id, req.body)
    return res.status(200).json(`Updated: ${updatedTask}`)
  } catch (error) {
    return next(error)
  }
}
