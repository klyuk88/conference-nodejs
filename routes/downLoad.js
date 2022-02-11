import express from 'express'
import fetch from 'node-fetch'
import excelJS from 'exceljs'

import {fileURLToPath} from 'url'
import path from 'path'

const router = express.Router()

router.get('/', async (req, res) => {

    try {
        const emailsReq = await fetch(`${process.env.ADMIN_URL}/api/emails`, {
            method: 'get',
            headers: {
                Authorization: "Bearer 72339e56cd7822b7acac763618fede97370e865269fb2a963f4f1ba452230f5fdf92993fc82a2452394d71a77bd7ca1a46b5962fd17be77aaf89ccbcc99f04972898af0ebb084f7d71196dfbaab1bdc03d4a131579c4007d99628c66e83012c97219deb9d3ff5771966a6a83f45f28091eb9e73884b0e6771a3d06daa432fe8d",
              },
        })
        if(emailsReq.ok) {
            const emailsRes = await emailsReq.json()
            const emailsData = emailsRes.data

            const workbook = new excelJS.Workbook();
            const worksheet = workbook.addWorksheet('Emails');
            worksheet.columns = [
                { header: "Тема", key: "subject", width: 10 },
                { header: "Фамилия", key: "surname", width: 10 },
                { header: "Имя", key: "name", width: 10 },
                { header: "Отчество", key: "patronymic", width: 10 },
                { header: "Организация", key: "organization", width: 10 },
                { header: "Название работы", key: "work_name", width: 10 },
                { header: "Секция", key: "section", width: 10 },
                { header: "Формат участия", key: "participation_form", width: 10 },
                { header: "Публикация в Scopus", key: "scopus_publication", width: 10 },
                { header: "Дата создания", key: "createdAt", width: 10 },
                { header: "Файл 1", key: "file", width: 10 },
                { header: "Файл 2", key: "file2", width: 10 },
                { header: "Номер заявки", key: "request_number", width: 10 },
            ]

            emailsData.forEach(item => {
                worksheet.addRow(item.attributes)
            });

            await workbook.xlsx.writeFile('emails.xlsx');

            // const __dirname = path.dirname(fileURLToPath(import.meta.url));
            // const __filename = fileURLToPath(import.meta.url);

            // console.log(__dirname, __filename);

            res.send('ok')
            
            const filePath = '/emails.xlsx'
            const fileName = 'emails.xlsx'
            

            // res.download(filePath, fileName)
        }
        
    } catch (error) {
        res.send(error)
    }   
    
})


export default router