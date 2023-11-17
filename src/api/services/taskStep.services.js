import TaskStep from '../models/TaskStep.js'

const updateTaskStepsPositions = async (taskId, newTaskStepPosition) => {
  await TaskStep.updateMany({ taskId: taskId, position: { $gte: newTaskStepPosition } }, { $inc: { position: 1 } })
}
const updateTaskStepPositionAfterDelete = async (taskId, oldPosition) => {
  await TaskStep.updateMany({ taskId: taskId, position: { $gt: oldPosition } }, { $inc: { position: -1 } })
}
const updateTaskStepsPositionAfterUserReorder = async (taskId, reorderedTaskStepId, oldPosition, newPosition) => {
  if (newPosition < oldPosition) {
    await TaskStep.updateMany(
      { position: { $gte: newPosition, $lt: oldPosition }, taskId: taskId, _id: { $ne: reorderedTaskStepId } },
      { $inc: { position: 1 } }
    )
  } else if (newPosition > oldPosition) {
    await TaskStep.updateMany(
      { position: { $gt: oldPosition, $lte: newPosition }, taskId: taskId, _id: { $ne: reorderedTaskStepId } },
      { $inc: { position: -1 } }
    )
  }
}
export const isExistingTaskStep = async (taskStepId) => {
  return await TaskStep.exists({ _id: taskStepId })
}

export const saveTaskStep = async (taskId, prevPosition) => {
  let position
  if (prevPosition !== null) {
    position = ++prevPosition
    await updateTaskStepsPositions(taskId, position)
  } else {
    position = 0
  }
  const taskStepData = {
    position: position,
    taskId: taskId,
  }
  const taskStep = new TaskStep(taskStepData)
  const savedTaskStep = await taskStep.save()
  return savedTaskStep
}
export const getTaskStepsByTasId = async (taskId) => {
  const query = { taskId: taskId }
  const taskSteps = await TaskStep.find(query).sort({ position: 1 })
  return taskSteps
}
export const updateTaskStepByTaskId = async (taskId, taskStepId, body) => {
  const updatedTaskStep = await TaskStep.findOneAndUpdate({ taskId: taskId, _id: taskStepId }, body, { new: true })
  return updatedTaskStep
}
export const updateTaskStepPositionById = async (taskId, taskStepId, position) => {
  const taskStepBeforeUpdate = await TaskStep.findOne({ taskId: taskId, _id: taskStepId }).select({
    _id: 0,
    position: 1,
  })
  const updatedTaskStep = await TaskStep.findOneAndUpdate(
    { taskId: taskId, _id: taskStepId },
    { position: position },
    { new: true }
  )
  await updateTaskStepsPositionAfterUserReorder(taskId, taskStepId, taskStepBeforeUpdate.position, position)
  return updatedTaskStep
}
export const deleteTaskStepById = async (taskId, taskStepId) => {
  const taskStepBeforeDelete = await TaskStep.findOne({ taskId: taskId, _id: taskStepId }).select({
    _id: 0,
    position: 1,
  })
  const deletedTaskStep = await TaskStep.findOneAndDelete({ taskId: taskId, _id: taskStepId })
  await updateTaskStepPositionAfterDelete(taskId, taskStepBeforeDelete.position)
  return deletedTaskStep
}
