import fetch from 'node-fetch'
export default async function (req, res, next) {   
    try {
        const resp = await fetch(process.env.ADMIN_URL + '/api/contact-page')
        const respData = await resp.json()
        res.locals.globalPhone = respData.data.attributes.phone
        res.locals.globalMail = respData.data.attributes.email
    } catch (error) {
        throw new Error(error)
    }
    next()
    
}
