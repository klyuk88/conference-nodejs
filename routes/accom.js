import express from 'express'
import fetch from 'node-fetch'
import qs from 'qs'
import Showdown from 'showdown'
const converter = new Showdown.Converter()
const router = express.Router()

router.get('/', async function(req, res, next) {
  let pageData;
  const query = qs.stringify({
    populate: {
      image_1: {
        filelds: ['url']
      },
      image_2: {
        filelds: ['url']
      }
    },
    locale: res.locale
  })
    try {
        const resp = await fetch(process.env.ADMIN_URL + '/api/accommodation?' + query)
        if (resp.ok) {
            const respData = await resp.json()
            pageData = respData.data

            const paragraph = converter.makeHtml(pageData.attributes.paragraph_2)
            const image1 = pageData.attributes.image_1 ? process.env.ADMIN_URL + pageData.attributes.image_1.data.attributes.url : '/assets/img/hotel/1.jpg'
            const image2 = pageData.attributes.image_2 ? process.env.ADMIN_URL + pageData.attributes.image_2.data.attributes.url : '/assets/img/hotel/2.jpg'

            res.render('accommodation', {
                metaTitle: 'Размещение',
                pageData,
                paragraph,
                image1,
                image2
            })
        }

    } catch (error) {
        throw new Error(error)
    }
});

export default router