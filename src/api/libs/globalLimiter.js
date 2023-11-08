import rateLimit from 'express-rate-limit'

const globalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutos
  max: 5000, //limit each IP to x request
})

export default globalLimiter
