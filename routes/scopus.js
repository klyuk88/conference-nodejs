import express from 'express'
import fetch from 'node-fetch'
const router = express.Router()

/* GET home page. */

router.get('/', async function(req, res, next) {
  let pageData;
  try {
    const resp = await fetch(process.env.ADMIN_URL + '/api/scopus-page?populate=*&locale=' + res.locale)
    const respData = await resp.json()
    pageData = respData.data.attributes
    const template = pageData.template.data ? process.env.ADMIN_URL + pageData.template.data.attributes.url : '#'
    res.render('scopus', {
      metaTitle: 'Публикация в Scopus',
      pageData,
      template
    });
    
  } catch (error) {
    throw new Error(error)
  }

  
});

export default router