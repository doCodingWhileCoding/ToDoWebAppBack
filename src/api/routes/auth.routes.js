import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import {
  signUpUser,
  loginUser,
  verifyEmail,
  resendEmailVerificationEmail,
  forgotPasswordByEmail,
  forgotPasswordByUserId,
  resetPassword,
} from '../controllers/auth.controller.js'
import {
  SignUpUserSchema,
  LoginUserSchema,
  VerifyEmailSchema,
  ResendEmailVerificationEmailSchema,
  ForgotPasswordByUserIdSchema,
  ForgotPasswordByEmailSchema,
  ResetPasswordSchema,
} from '../schemas/auth.schemas.js'
import validateSchema from '../middlewares/SchemaValidator.js'
import errorMessages from '../constants/error_messages.js'

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutos
  max: 1, //limit ech IP to 5 request
  handler: (req, res) => {
    res.status(429).json(errorMessages.TOO_MANY_REQUESTS)
  },
})
const router = Router()

router.post('/signup', validateSchema(SignUpUserSchema), signUpUser)
router.post('/login', validateSchema(LoginUserSchema), loginUser)
router.get('/verifyEmail/:userId/:uuid', validateSchema(VerifyEmailSchema), verifyEmail)
router.get(
  '/resendEmailVerificationEmail/:userId',
  limiter,
  validateSchema(ResendEmailVerificationEmailSchema),
  resendEmailVerificationEmail
)
router.get('/forgotPassword/:userId', limiter, validateSchema(ForgotPasswordByUserIdSchema), forgotPasswordByUserId)
router.post('/forgotPassword/', limiter, validateSchema(ForgotPasswordByEmailSchema), forgotPasswordByEmail)
router.put('/resetPassword/:userId/:uuid', validateSchema(ResetPasswordSchema), resetPassword)

export default router
