import express from 'express'
const router = express.Router()

router.get('/', function(req, res, next) {
  res.render('accommodation');
});

export default router