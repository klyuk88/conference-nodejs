import express from 'express'
import fetch from 'node-fetch'
import Showdown from 'showdown'

const converter = new Showdown.Converter()
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  let pageData;
  fetch(`${process.env.ADMIN_URL}/api/condition?populate=*&locale=${res.locale}`)
  .then(response => response.json())
  .then(body => {
    pageData = body.data.attributes
    const registrationCheck = pageData.registration_check.data ? process.env.ADMIN_URL + pageData.registration_check.data.attributes.url : '#'
    const registrationContract = pageData.registration_contract.data ? process.env.ADMIN_URL + pageData.registration_contract.data.attributes.url : '#'
    const liveContract = pageData.live_contract.data ? process.env.ADMIN_URL + pageData.live_contract.data.attributes.url : '#'
    const liveCheck = pageData.live_check.data ? process.env.ADMIN_URL + pageData.live_check.data.attributes.url : '#'
    const publicationContract = pageData.publication_contract.data ? process.env.ADMIN_URL + pageData.publication_contract.data.attributes.url : '#'
    const afterTableText = converter.makeHtml(pageData.after_table_text)
    const beforeTableText = converter.makeHtml(pageData.before_table_text)
    console.log(pageData);
    res.render('conditions', {
      metaTitle: 'Условия участия',
      pageData,
      registrationCheck,
      registrationContract,
      liveContract,
      liveCheck,
      publicationContract,
      afterTableText,
      beforeTableText

    });
  })
  .catch((error) => {
    throw new Error(error)
  })


  
});

export default router