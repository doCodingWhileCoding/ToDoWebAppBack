import { z } from 'zod'
import { Types } from 'mongoose'

const { ObjectId } = Types

const ObjectIdSchema = z.string().refine((value) => {
  try {
    const objectId = new ObjectId(value)
    return ObjectId.isValid(objectId)
  } catch (error) {
    return false
  }
})
const CreatedAtSchema = z.date()
const UpdatedAtSchema = z.date()

const MongooseCommonSchema = z.object({
  _id: ObjectIdSchema,
  createdAT: CreatedAtSchema,
  updatedAt: UpdatedAtSchema,
})

const ColorRGBSchema = z.object({
  r: z.number().min(0).max(255),
  g: z.number().min(0).max(255),
  b: z.number().min(0).max(255),
})
const BooleanParamSchema = z.string().refine(
  (value) => {
    return value === 'true' || value === 'false'
  },
  {
    message: "Value should be 'true' or 'false'.",
  }
)
const NumberParamSchema = z.string().refine(
  (value) => {
    return !isNaN(Number(value))
  },
  {
    message: 'Value should be a valid number in string format.',
  }
)

export { ObjectIdSchema, MongooseCommonSchema, ColorRGBSchema, BooleanParamSchema, NumberParamSchema }
