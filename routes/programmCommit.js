import express from 'express'
import qs from 'qs'
import fetch from 'node-fetch'
const router = express.Router()

router.get('/', async (req, res) => {
    const query = qs.stringify({
        filters: {
            categories: {
                slug: {
                    $eq: 'programmnyj'
                }
            }
        },
        sort: ['updatedAt'],
        locale: res.locale
    })
    try {
        const response = await fetch(`${process.env.ADMIN_URL}/api/committees?${query}`)
        const responseData = await response.json()
        res.render('programm-committee', {
            pageData: responseData.data
        })
    } catch (error) {
        console.log(error);
    }
})

export default router