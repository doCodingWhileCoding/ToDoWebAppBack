import { Schema, model } from 'mongoose'
import { schemaValues } from '../constants/index.js'

const TaskStep = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: schemaValues.TASKSTEP_TITLE_LENGTH,
    },
    isCompleted: {
      type: Boolean,
      required: true,
    },
    position: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
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

export default model('TaskStep', TaskStep)
