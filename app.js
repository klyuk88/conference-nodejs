import 'dotenv/config'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import globalContacts from './middelwares/globalContacts.js'
import setCookieLang from './middelwares/setCookieLang.js'
import {
  I18n
} from 'i18n'
import {
  fileURLToPath,
} from 'url';

// import nodemailer from 'nodemailer'


import indexRouter from './routes/index.js'
import orgCommitet from './routes/organizing-committee.js'
import progCommitet from './routes/programmCommit.js'
import keySpeakers from './routes/keySpeakers.js'
import dates from './routes/dates.js'
import register from './routes/registration.js'
import coditions from './routes/conditions.js'
import rinc from './routes/rinc.js'
import scopus from './routes/scopus.js'
import sendApp from './routes/sendAp.js'
import sendMaterials from './routes/sendMaterials.js'
import contacts from './routes/contacts.js'
import accom from './routes/accom.js'
import sendMail from './routes/send.js'
import programm from './routes/programm.js'
import downLoad from './routes/downLoad.js'


const app = express();

app.use(cookieParser())

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// console.log(__dirname, __filename);

  
const i18n = new I18n()

app.use(i18n.init)

i18n.configure({
  locales: ['ru', 'en'],
  directory: path.join(__dirname, '/locales'),
  queryParameter: 'lang',
  cookie: 'langchange',
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//регистрация вывода глобальных контактов
app.use(globalContacts)

//запись настроек языка к куки
app.use(setCookieLang)

app.use('/', indexRouter);
app.use('/organizing-committee', orgCommitet)
app.use('/programm-committee', progCommitet)
app.use('/key-speakers', keySpeakers)
app.use('/major-dates', dates)
app.use('/registration', register)
app.use('/conditions', coditions)
app.use('/publication-rinc', rinc)
app.use('/publication-scopus', scopus)
app.use('/send-materials', sendMaterials)
app.use('/send-app', sendApp)
app.use('/contacts', contacts)
app.use('/accommodation', accom)
app.use('/programm', programm)

app.use('/tech/send-mail', sendMail)
app.use('/download', downLoad)


//Handling 404
app.use(function (req, res) {
  res.status(404).render('404');
});

const port = process.env.PORT || '3000'
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('Listen port' + port);
})