import path from 'path'
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import config from '../../config/dotenv.js'
import errorMessages from '../constants/error_messages.js'
import { saveToken } from './token.services.js'
import { TokenTypes } from '../constants/enums.js'
import { v4 as uuidv4 } from 'uuid'

const sendEmail = async (to, subject, template, context) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.COMPANY_EMAIL,
      pass: config.COMPANY_EMAIL_APP_PASSWORD,
    },
  })
  const handlebarOptions = {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: path.resolve('./emails'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./emails'),
    extName: '.handlebars',
  }
  transporter.use('compile', hbs(handlebarOptions))
  let mailOptions = {
    from: config.COMPANY_EMAIL,
    to: to,
    subject: subject,
    template: template,
    context: context,
  }
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error)
    } else {
      console.log('Correo electrónico enviado: ' + info.response)
    }
  })
}

export const sendEmailVerificationEmail = async (ownerId, ownerEmail) => {
  const emailVerificationUuid = uuidv4()
  const token = await saveToken(ownerId, TokenTypes.EMAIL_VERIFICATION, emailVerificationUuid)
  const recipient = ownerEmail
  const subject = 'Por favor verifique su correo'
  const template = 'verifyEmail'
  const context = {
    title: 'Gracias por registrarse, está a sçolo un paso de poder usar la aplicación',
    text: "clique sobre el botón 'Confirmar Email' se completará su registro",
    url: `${config.FRONT_BASE_URL}/auth/emailVerification/${ownerId}/${token.uuid}`,
  }
  await sendEmail(recipient, subject, template, context)
}
