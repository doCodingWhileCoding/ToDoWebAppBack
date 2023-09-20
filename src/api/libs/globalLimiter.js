import rateLimit from 'express-rate-limit'

const globalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutos
  max: 100, //limit each IP to 100 request
})

export default globalLimiter
