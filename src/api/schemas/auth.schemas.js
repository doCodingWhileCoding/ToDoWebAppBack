import { z } from 'zod'
import { UserEmailSchema, UserPasswordSchema } from './user.schemas.js'
import { ObjectIdSchema } from './common/index.js'
//params
const AuthParamsSchema = z.object({
  userId: ObjectIdSchema,
  uuid: z.string().uuid(),
})

//request
const SignUpUserSchema = z
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

const LoginUserSchema = z
  .object({
    body: z
      .object({
        email: UserEmailSchema,
        password: z.string(),
      })
      .strict()
      .required(),
  })
  .strict()

const VerifyEmailSchema = z
  .object({
    params: AuthParamsSchema.pick({
      userId: true,
      uuid: true,
    })
      .strict()
      .required(),
  })
  .strict()

const ResendEmailVerificationEmailSchema = z
  .object({
    params: AuthParamsSchema.pick({
      userId: true,
    })
      .strict()
      .required(),
  })
  .strict()

export { SignUpUserSchema, LoginUserSchema, VerifyEmailSchema, ResendEmailVerificationEmailSchema }
