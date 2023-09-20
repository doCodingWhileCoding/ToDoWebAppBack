import { Schema, model } from 'mongoose'
import { schemaValues } from '../constants/index.js'
import TaskStep from './TaskStep.js'
import mongoosePaginate from 'mongoose-paginate-v2'

const Task = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: schemaValues.TASK_TITLE_LENGTH,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    position: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    isImportant: {
      type: Boolean,
      required: true,
      default: false,
    },
    isMyDay: {
      type: Boolean,
      required: true,
      default: false,
    },
    steps: {
      type: [String],
      ref: 'TaskStep',
      required: true,
      validate: {
        validator: async function (steps) {
          for (const step of steps) {
            const stepExists = await TaskStep.exists({ _id: step })
            if (!stepExists) {
              return false
            }
          }
          return true
        },
        message: 'El step no existe.',
      },
    },
    dueDate: {
      type: Date,
      required: true,
    },
    repetitionRate: {
      type: Map,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collation: {
      locale: 'es',
      strength: 2,
    },
    strict: 'throw',
  }
)

Task.plugin(mongoosePaginate)

export default model('Task', Task)
