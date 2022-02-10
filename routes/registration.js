import express from 'express'
import fetch from 'node-fetch'
const router = express.Router()


router.get('/', async function(req, res, next) {
  let pageData;
  try {
    const response = await fetch(process.env.ADMIN_URL + '/api/registration-page?populate=*&locale=' + res.locale)
    if (response.ok) {
      const resData = await response.json()
      pageData = resData.data.attributes
      const templateFile = process.env.ADMIN_URL + pageData.template.data.attributes.ADMIN_URL
      res.render('registration', {
        metaTitle: 'Регистрация',
        pageData,
        templateFile
        
      });
    }

  } catch (error) {
    console.log(error);

  }
  
});

export default router