const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SEND_GRID_API_KEY)


const sendWelcomeEmail = (email,name)=>{
    const msg = {
        to:email, // Change to your recipient
        from: 'kamrajcalm7373@gmail.com', // Change to your verified sender
        subject: 'Thanks for Joining in',
        text: `welcome to the app,${name}.Let me know how you get along with the app`,
    }

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}
const sendFareWellEmail = (email, name) => {
    const msg = {
        to: email, // Change to your recipient
        from: 'kamrajcalm7373@gmail.com', // Change to your verified sender
        subject: 'Good Bye',
        text: `we miss you,${name}.Let me know how how we improve things`,
    }

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}
module.exports = {
  sendWelcomeEmail,
  sendFareWellEmail
}
