import express from 'express'
import qs from 'qs'
import fetch from 'node-fetch'
const router = express.Router()

// organizing-committee page
router.get('/', async (req, res) => {

    const queryOrg = qs.stringify({
        filters: {
            categories: {
                slug: {
                    $eq: 'organizaczionnyj'
                }
            }
        },
        sort: ['updatedAt'],
        pagination: {
            pageSize: 100
        },
    })
    const queryTech = qs.stringify({
        filters: {
            categories: {
                slug: {
                    $eq: 'tehnicheskij'
                }
            }
        },
        sort: ['updatedAt'],
        pagination: {
            pageSize: 100
        },
    })
    
    try {
        const responseOrg = await fetch(`${process.env.ADMIN_URL}/api/committees?${queryOrg}&locale=${res.locale}`)
        const responseTech = await fetch(`${process.env.ADMIN_URL}/api/committees?${queryTech}&locale=${res.locale}`)
        const responseDataOrg = await responseOrg.json()
        const responseDataTech = await responseTech.json()
        res.render('organizing-committee', {
            dataOrg: responseDataOrg.data,
            dataTech: responseDataTech.data
        })
    } catch (error) {
        console.log(error);
    }

})

export default router