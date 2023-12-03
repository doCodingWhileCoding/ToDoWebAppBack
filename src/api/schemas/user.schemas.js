import { z } from 'zod'
import { ObjectIdSchema } from './common/index.js'
import errorMessages from '../constants/error_messages.js'
import schemaValues from '../constants/schema_values.js'

const UserEmailSchema = z.string().email().max(schemaValues.USER_EMAIL_LENGTH)
const UserPasswordSchema = z
  .string()
  .min(schemaValues.USER_PASSWORD_MIN_LENGTH)
  .max(schemaValues.USER_PASSWORD_MAX_LENGTH)
  .regex(/[a-zA-Z]/, { message: errorMessages.SCHEMAS.USER.PASSWORD.NO_LETTER })
  .regex(/[0-9]/, { message: errorMessages.SCHEMAS.USER.PASSWORD.NO_NUMBER })
  .regex(/[^a-zA-Z0-9]/, { message: errorMessages.SCHEMAS.USER.PASSWORD.NO_SPECIALCHAR })

//params
const UserParamSchema = z.object({
  userId: ObjectIdSchema,
})

//request
const CreateUserSchema = z
  .object({
    body: z
      .object({
        email: UserEmailSchema,
        password: UserPasswordSchema,
      })
      .strict()
      .required(),
  })
  .strict()

const GetUserSchema = z.object({}).strict()

const UpdateUserEmail = z
  .object({
    body: z
      .object({
        newEmail: UserEmailSchema,
      })
      .strict()
      .required(),
  })
  .strict()

const DeleteUserSchema = z.object({}).strict()

export { CreateUserSchema, GetUserSchema, UpdateUserEmail, DeleteUserSchema, UserEmailSchema, UserPasswordSchema }
