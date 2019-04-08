const cron = require('node-cron'),
    kue = require('kue'),
    todo = require('../models/todo'),
    mail = require('./mail'),
    queue = kue.createQueue()

module.exports = () => {
    cron.schedule('00 07 * * *', () => {
        todo
            .find()
            .populate('userId')
            .then(function (allTodo) {
                allTodo.forEach(e => {
                    if (e.userId) {
                        if (e.status === false) {
                            console.log(e)
                            let text = `Hello, ${e.userId.email}!<br>Your todo for "${e.name}" not yet completed so we remind you to about this todo<br>Thank You!`
                            let email = e.userId.email
                            queue.create('email', {
                                email,
                                text
                            }).save()
                        }
                    }
                });
            })
            .catch(function (err) {
                console.log(err)
            })
        queue.process('email', function (job, done) {
            mail(job.data.email, job.data.text)
            done()
        })
    })
}