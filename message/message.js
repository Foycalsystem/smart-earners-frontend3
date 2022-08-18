const mailgun = require("mailgun-js")
const express = require("express")
require("dotenv").config()

const route = express.Router()

const setUp = mailgun({
    domain: process.env.DOMAIN_MAILGUN,
    apiKey: process.env.API_KEY_MAILGUN
});



const data = {
    to: "support@tonictoken.net",
    from: "inedumozey@gmail.com",
    subject: 'testing mailgun',
    html: `<h1>Hello World</h1>`
}

setUp.messages().send(data, (err, body)=>{
    if(err){
        console.log({err})
    }else{
        console.log({body})
    }
})