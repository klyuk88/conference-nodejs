import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()

router.get('/', async function (req, res, next) {
  let homeData;
  try {
    const response = await fetch(process.env.ADMIN_URL + '/api/home-page?locale=' + res.locale)
    if (response.ok) {
      const resData = await response.json()
      homeData = resData.data.attributes
      res.render('index', {
        metaTitle: 'Главная',
        homeData,
      });
    }

  } catch (error) {
    console.log(error);
  }

});

export default router