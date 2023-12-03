import { Router } from 'express'
import { GetUserSchema } from '../schemas/user.schemas.js'
import { getUser } from '../controllers/user.controller.js'
import validateSchema from '../middlewares/SchemaValidator.js'

const router = Router()

router.get('/', validateSchema(GetUserSchema), getUser)

export default router
