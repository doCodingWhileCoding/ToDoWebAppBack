import errorMessages from '../constants/error_messages.js'
import { isExistingTask } from '../services/task.services.js'
import {
  saveTaskStep,
  getTaskStepsByTaskId,
  isExistingTaskStep,
  updateTaskStepByTaskId,
  updateTaskStepPositionById,
  deleteTaskStepById,
} from '../services/taskStep.services.js'

export const createTaskStep = async (req, res, next) => {
  const userId = req.userId
  const taskId = req.params.taskId
  if (!(await isExistingTask(userId, taskId))) {
    const err = {
      statusCode: 404,
      errMsg: errorMessages.NOT_FOUND,
    }
    return next(err)
  }
  const prevTaskStepPosition = req.body.prevPosition
  try {
    const savedTaskStep = await saveTaskStep(taskId, prevTaskStepPosition)
    return res.status(200).json(savedTaskStep)
  } catch (error) {
    return next(error)
  }
}
export const getTaskSteps = async (req, res, next) => {
  const userId = req.userId
  const taskId = req.params.taskId
  if (!(await isExistingTask(userId, taskId))) {
    const err = {
      statusCode: 404,
      errMsg: errorMessages.NOT_FOUND,
    }
    return next(err)
  }
  try {
    const taskSteps = await getTaskStepsByTaskId(taskId)
    return res.status(200).json(taskSteps)
  } catch (error) {
    return next(error)
  }
}
export const updateTaskStep = async (req, res, next) => {
  const userId = req.userId
  const taskId = req.params.taskId
  if (!(await isExistingTask(userId, taskId))) {
    const err = {
      statusCode: 404,
      errMsg: errorMessages.NOT_FOUND,
    }
    return next(err)
  }
  const taskStepId = req.params.taskStepId
  if (!(await isExistingTaskStep(taskStepId))) {
    const err = {
      statusCode: 404,
      errMsg: errorMessages.NOT_FOUND,
    }
    return next(err)
  }
  try {
    const updatedTaskStep = await updateTaskStepByTaskId(taskId, taskStepId, req.body)
    return res.status(200).json(updatedTaskStep)
  } catch (error) {
    return next(error)
  }
}
export const updateTaskStepPosition = async (req, res, next) => {
  const userId = req.userId
  const taskId = req.params.taskId
  if (!(await isExistingTask(userId, taskId))) {
    const err = {
      statusCode: 404,
      errMsg: errorMessages.NOT_FOUND,
    }
    return next(err)
  }
  const taskStepId = req.params.taskStepId
  if (!(await isExistingTaskStep(taskStepId))) {
    const err = {
      statusCode: 404,
      errMsg: errorMessages.NOT_FOUND,
    }
    return next(err)
  }
  const position = req.body.position
  try {
    const updatedTaskStep = await updateTaskStepPositionById(taskId, taskStepId, position)
    return res.status(200).json(updatedTaskStep)
  } catch (error) {
    return next(error)
  }
}
export const deleteTaskStep = async (req, res, next) => {
  const userId = req.userId
  const taskId = req.params.taskId
  if (!(await isExistingTask(userId, taskId))) {
    const err = {
      statusCode: 404,
      errMsg: errorMessages.NOT_FOUND,
    }
    return next(err)
  }
  const taskStepId = req.params.taskStepId
  if (!(await isExistingTaskStep(taskStepId))) {
    const err = {
      statusCode: 404,
      errMsg: errorMessages.NOT_FOUND,
    }
    return next(err)
  }
  try {
    const deletedTaskStep = await deleteTaskStepById(taskId, taskStepId)
    return res.status(200).json(deletedTaskStep)
  } catch (error) {
    return next(error)
  }
}
