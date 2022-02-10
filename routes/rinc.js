import express from 'express'
import fetch from 'node-fetch'
const router = express.Router()

/* GET home page. */

router.get('/', async function(req, res, next) {
  let pageData;
  try {
    const resp = await fetch(process.env.ADMIN_URL + '/api/rinc-page?populate=*&locale=' + res.locale)
    const respData = await resp.json()
    pageData = respData.data.attributes
    const template = pageData.template.data ? process.env.ADMIN_URL + pageData.template.data.attributes.url : '#'
    res.render('rinc', {
      metaTitle: 'Публикация в РИНЦ',
      pageData,
      template
    });
    
  } catch (error) {
    
  }
  
});

export default router