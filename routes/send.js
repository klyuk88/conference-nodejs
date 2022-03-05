import express from 'express'
import nodemailer from 'nodemailer'
import fetch from 'node-fetch'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
import path from 'path'


const router = express.Router()

const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: "smtp.mail.ru",
    auth: {
      user: 'conference-mai@mail.ru',
      pass: 'EZxzELUWXqpUEnbGcHA1',
    },
    secure: true,
  });

const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
  })

const upload = multer({ storage: storage })

router.post('/', upload.fields([{name: 'file', maxCount: 1},{name: 'file2', maxCount: 1}]), async(req, res, next) => {
    const emailPost = {
        data: {
          subject: req.body.subject,
          name: req.body['Имя'],
          surname: req.body['Фамилия'],
          patronymic: req.body['Отчество'],
          organization: req.body['Организация'],
          email: req.body['Email'],
          post: req.body['Должность'] || 'Данные не соответсвуют типу формы',
          work_name: req.body['Название работы'] || 'Данные не соответсвуют типу формы',
          annotation: req.body['Аннотация'] || 'Данные не соответсвуют типу формы',
          section: req.body['Секция'] || 'Данные не соответсвуют типу формы',
          participation_form: req.body['Форма участия'] || 'Данные не соответсвуют типу формы',
          scopus_publication: req.body['Публикация Scopus'] || 'Данные не соответсвуют типу формы',
          request_number: req.body['Номер заявки'] || 'Данные не соответсвуют типу формы',
          file: `${req.protocol}://${req.hostname}/uploads/${req.files['file'][0].filename}`,
          file2: req.files['file2'] ? `${req.protocol}://${req.hostname}/uploads/${req.files['file2'][0].filename}` : null
        }
      }

      try {
        const respMail = await fetch(`${process.env.ADMIN_URL}/api/emails/`, {
            method: 'post',
            headers: {
              Authorization: "Bearer 72339e56cd7822b7acac763618fede97370e865269fb2a963f4f1ba452230f5fdf92993fc82a2452394d71a77bd7ca1a46b5962fd17be77aaf89ccbcc99f04972898af0ebb084f7d71196dfbaab1bdc03d4a131579c4007d99628c66e83012c97219deb9d3ff5771966a6a83f45f28091eb9e73884b0e6771a3d06daa432fe8d",
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailPost)
          })
          
      } catch (error) {
          console.log(error);
      }
      
    let textBody = ``
    let htmlBody = `<table style="width: 100%;">`
    let subject = req.body.subject || 'Запрос с сайта Сверхзвук'
    for (const key in req.body) {
        if (Object.hasOwnProperty.call(req.body, key)) {
            if(req.body[key] !== 'subject') {
                htmlBody = htmlBody + `<tr style="background-color: #f8f8f8;">
                <td style="padding: 10px; border: #e9e9e9 1px solid;"><b>${key}</b></td>
                <td style="padding: 10px; border: #e9e9e9 1px solid;">${req.body[key]}</td>
                </tr>`
                textBody = textBody + `${key}:${req.body[key]}`
            }
        }
    }
    htmlBody = htmlBody + `</table>`

    let attachments = []
    for (const key in req.files) {
        if (Object.hasOwnProperty.call(req.files, key)) {
            attachments.push(req.files[key][0])
        }
    }

    const mailData = {
        from: 'conference-mai@mail.ru',
        to: 'conference-mai@mail.ru',
        subject: subject,
        text: textBody,
        html: htmlBody,
        attachments: attachments
    }
    transporter.sendMail(mailData, (error, info) => {
        if(error) {
            return console.log(error);
        }
        res.status(200).render('thanks')
    })
})
export default router