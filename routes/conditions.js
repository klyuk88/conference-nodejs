import express from 'express'
import fetch from 'node-fetch'
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  let pageData;
  fetch(`${process.env.ADMIN_URL}/api/condition?populate=*&locale=${res.locale}`)
  .then(response => response.json())
  .then(body => {
    pageData = body.data.attributes
    const registrationCheck = process.env.ADMIN_URL + pageData.registration_check.data.attributes.url
    const registrationContract = process.env.ADMIN_URL + pageData.registration_contract.data.attributes.url
    const liveContract = process.env.ADMIN_URL + pageData.live_contract.data.attributes.url
    const liveCheck = process.env.ADMIN_URL + pageData.live_check.data.attributes.url
    const publicationContract = process.env.ADMIN_URL + pageData.publication_contract.data.attributes.url
    res.render('conditions', {
      metaTitle: 'Условия участия',
      pageData,
      registrationCheck,
      registrationContract,
      liveContract,
      liveCheck,
      publicationContract

    });
  })
  .catch((error) => {
    throw new Error(error)
  })


  
});

export default router