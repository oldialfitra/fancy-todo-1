const cron = require('node-cron'),
    kue = require('kue'),
    todo = require('../models/todo'),
    mail = require('./mail'),
    queue = kue.createQueue()

module.exports = () => {
    cron.schedule('00 07 * * *', () => {
        todo
            .find()
            .populate({
                path: 'projectId',
                populate: {
                    path: 'members'
                }
            })
            .then(function (allTodo) {
                allTodo.forEach(e => {
                    if (e.projectId) {
                        if (e.status === false) {
                            console.log(e.projectId.members)
                            e.projectId.members.forEach(f => {
                                let text = `Hello, ${f.email}!<br>Your todo for "${e.name}" in project "${e.projectId.name}" not yet completed so we remind you to about this todo<br>Thank You!`
                                let email = f.email
                                queue.create('email', {
                                    email,
                                    text
                                }).save()
                            });
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