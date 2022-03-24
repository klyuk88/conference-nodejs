import express from 'express'
import fetch from 'node-fetch'
import qs from 'qs'
import Showdown from 'showdown'
const converter = new Showdown.Converter()
const router = express.Router()

router.get('/', async function(req, res, next) {
  let pageData;
  const query = qs.stringify({
    populate: '*',
    locale: res.locale
  })
    try {
        const resp = await fetch(process.env.ADMIN_URL + '/api/accommodation?' + query)
        if (resp.ok) {
            const respData = await resp.json()
            pageData = respData.data
            const paragraph = converter.makeHtml(pageData.attributes.paragraph_2)
            const imageGallery = pageData.attributes.image_gallery.data
            const adminUrl = process.env.ADMIN_URL
            
            // const image1 = pageData.attributes.image_1 ? process.env.ADMIN_URL + pageData.attributes.image_1.data.attributes.url : '/assets/img/hotel/1.jpg'
            // const image2 = pageData.attributes.image_2 ? process.env.ADMIN_URL + pageData.attributes.image_2.data.attributes.url : '/assets/img/hotel/2.jpg'

            res.render('accommodation', {
                metaTitle: 'Размещение',
                pageData,
                paragraph,
                adminUrl,
                imageGallery

            })
        }

    } catch (error) {
        throw new Error(error)
    }
});

export default router