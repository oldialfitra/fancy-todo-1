const project = require('../models/project'),
    user = require('../models/user')

class Project {
    static addProject(req, res) {
        console.log(req.body)
        project
            .create({
                name: req.body.name,
                members: [req.body.memberId]
            })
            .then(function (newProject) {
                res.status(201).json(newProject)
            })
            .catch(function (err) {
                if (err.errors.name) {
                    res.status(400).json(err.errors.name.message)
                }
                else {
                    res.status(500).json(err)
                }
            })
    }

    static getAllProject(req, res) {
        console.log('masuk ke all project')
        project
            .find()
            .populate('members')
            .then(function (allProject) {
                res.status(200).json(allProject)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static getOneProject(req, res) {
        project
            .findById(req.params.id)
            .populate('members')
            .then(function (allProject) {
                res.status(200).json(allProject)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static addMember(req, res) {
        user
            .findOne({
                email: req.body.email
            })
            .then(function (userOne) {
                console.log(userOne, 'ini memeber')
                if (userOne === null) {
                    throw new Error({
                        message: 'User not found'
                    })
                }
                else {
                    return project
                        .findByIdAndUpdate(req.params.id, {
                            $push: {
                                members: userOne
                            }
                        }, {
                                new: true
                            })
                }
            })
            .then(function (oneProject) {
                res.status(200).json(oneProject)
            })
            .catch(function (err) {
                console.log(err)
                res.status(500).json(err)
            })
    }

    static deleteProject(req, res) {
        project
            .findByIdAndDelete(req.params.id)
            .then(function (oneProject) {
                res.status(200).json(oneProject)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }
}

module.exports = Project