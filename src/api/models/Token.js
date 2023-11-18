import { Schema, model } from 'mongoose'
import { TokenTypes } from '../constants/enums.js'
import User from './User.js'
import { Types } from 'mongoose'

const { ObjectId } = Types

const Token = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(TokenTypes),
      required: true,
    },
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
    uuid: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      expires: '120m',
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

export default model('Token', Token)
