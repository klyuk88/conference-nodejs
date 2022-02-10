export default function (req, res, next) {
    if(req.query.lang === 'en') {
        res.cookie('langchange', 'en', {
          maxAge: 900000,
          httpOnly: true
        })
      } else if(req.query.lang === 'ru') {
        res.cookie('langchange', 'ru', {
          maxAge: 900000,
          httpOnly: true
        })
      }
    next()
}