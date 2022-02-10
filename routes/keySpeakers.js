import express from 'express'
import qs from 'qs'
import fetch from 'node-fetch'
const router = express.Router()

router.get('/', async (req, res) => {
    let pageData;
    const query = qs.stringify({
        populate: {
            Photo: {
                fields: ['url']
            }
        },
        locale: res.locale
    })
    try {
        const resp = await fetch(`${process.env.ADMIN_URL}/api/speakers?${query}`)
        const respData = await resp.json()
        pageData = respData.data
    
        res.render('key-speakers', {
          metaTitle: 'Ключевые спикеры',
          pageData,
          adminUrl: process.env.ADMIN_URL
        });
        
    } catch (error) {
        throw new Error(error)
    }
})

export default router