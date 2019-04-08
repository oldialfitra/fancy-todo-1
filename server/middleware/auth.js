const jwt = require('jsonwebtoken'),
    todo = require('../models/todo'),
    project = require('../models/project')

module.exports = {
    authentication(req, res, next) {
        if (req.headers.hasOwnProperty('token')) {
            try {
                req.userLoggedIn = jwt.verify(req.headers.token, process.env.SECRET)
                next();
            }
            catch {
                res.status(401).json({ message: `You are not Authenticate` })
            }
        }
        else {
            res.status(401).json({ message: `Login First` })
        } 
    },
    authorizationTodo(req, res, next) {
        console.log('masuk ke author todo')
        let idOwner = jwt.decode(req.headers.token)
        todo
            .findById(req.params.id)
            .then(function (oneTodo) {
                if (oneTodo.userId) {
                    if (JSON.stringify(idOwner.id) === JSON.stringify(oneTodo.userId)) {
                        console.log('masuk ke if 2')
                        next()
                    }
                    else {
                        res.status(401).json({
                            message: 'User not authorize'
                        })
                    }
                }
                else {
                    if (JSON.stringify(oneTodo.projectId) === JSON.stringify(req.headers.projectid)) {
                        console.log('masuk ke if 3')
                        next()
                    }
                    else {
                        res.status(401).json({
                            message: 'User not authorize'
                        })
                    }
                }
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    },
    authorizeProject(req, res, next) {
        if (req.headers.hasOwnProperty('projectid') && req.headers.projectid !== '') {
            let idOwner = jwt.decode(req.headers.token)
            project
                .findById(req.headers.projectid)
                .populate('members')
                .then(function (oneProject) {
                    let isMember = false
                    oneProject.members.forEach(e => {
                        if (e._id.toString() === idOwner.id) {
                            console.log('masuk ke if 1')
                            isMember = true
                        }
                    });
                    if (isMember) {
                        console.log('masuk ke if 2')
                        next()
                    }
                    else {
                        res.status(401).json({
                            message: 'User not authorize'
                        })
                    }
                })
                .catch(function (err) {
                    res.status(500).json(err)
                })
        }
        else {
            console.log(req.headers.projectId)
            console.log('masuk ke else 1')
            next()
        }
    },
    authorizeDeleteProject(req, res, next) {
        let idOwner = jwt.decode(req.headers.token)
        project
        .findById(req.params.id)
        .populate('members')
        .then(function (oneProject) {
            let isMember = false
            oneProject.members.forEach(e => {
                if (e._id.toString() === idOwner.id) {
                    console.log('masuk ke if 1')
                    isMember = true
                }
            });
            if (isMember) {
                console.log('masuk ke if 2')
                next()
            }
            else {
                res.status(401).json({
                    message: 'User not authorize'
                })
            }
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
    }
}