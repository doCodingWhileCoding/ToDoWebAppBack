import { Schema, model } from 'mongoose'
import schemaValues from '../constants/schema_values.js'
import mongoosePaginate from 'mongoose-paginate-v2'
import User from './User.js'
import { Types } from 'mongoose'

const { ObjectId } = Types

const Task = new Schema(
  {
    ownerId: {
      type: ObjectId,
      ref: 'User',
      validate: {
        validator: async function (own) {
          const userExist = await User.exists({ _id: own })
          return userExist
        },
        message: 'El autor especificado no existe en la colección de Usuarios.',
      },
      required: true,
    },
    title: {
      type: String,
      required: true,
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
    date: {
      type: Date,
      default: null,
    },
    dueDate: {
      type: Date,
      default: null,
    },
    repetitionRate: {
      type: Map,
      default: null,
    },
    note: {
      type: String,
      default: null,
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
