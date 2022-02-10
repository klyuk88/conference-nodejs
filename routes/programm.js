import express from 'express'
import fetch from 'node-fetch'
import Showdown from 'showdown'

const converter = new Showdown.Converter()

const router = express.Router()

router.get('/', async (req, res) => {
    let pageData;
    try {
        const resp = await fetch(process.env.ADMIN_URL + '/api/programms?locale=' + res.locale)
        if (resp.ok) {
            const respData = await resp.json()
            pageData = respData.data
            pageData.map(item => {
                item.attributes.content = converter.makeHtml(item.attributes.content)
            })

            res.render('programm.pug', {
                metaTitle: 'Программа',
                pageData
            })
        }

    } catch (error) {
        throw new Error(error)
    }
    
})

export default router