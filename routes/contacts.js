import express from 'express'
import fetch from 'node-fetch'
const router = express.Router()


router.get('/', async function(req, res, next) {
  let pageData;
  try {
    const resp = await fetch(process.env.ADMIN_URL + '/api/contact-page?locale=' + res.locale)
    const respData = await resp.json()
    pageData = respData.data.attributes
    res.render('contact', {
      metaTitle: 'Контакты',
      pageData
    });
  } catch (error) {
    throw new Error(error)
  }
  
});

export default router