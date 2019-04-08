const nodemailer = require('nodemailer')

module.exports = (emailTo, text) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAILPASS
        }
    });

    let HelperOptions = {
        from: process.env.EMAIL,
        to: emailTo,
        subject: 'Fancy Todo',
        html: text
    }

    transporter.sendMail(HelperOptions, (err, info) => {
        if (err) {
            return console.log(err)
        } else {
            console.log('berhasil')
            console.log(info)
        }
    })
}