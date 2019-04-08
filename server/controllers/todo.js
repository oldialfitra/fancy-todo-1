const todo = require('../models/todo')

class Todo {
    static addTodo(req, res) {
        if (req.body.userId) {
            console.log('masuk ke if 1')
            todo
                .create({
                    name: req.body.name,
                    description: req.body.description,
                    dueDate: req.body.dueDate,
                    userId: req.body.userId
                })
                .then(function (newTodo) {
                    res.status(201).json(newTodo)
                })
                .catch(function (err) {
                    if (err.errors.name) {
                        res.status(400).json(err.errors.name.message)
                    }
                    else if (err.errors.description) {
                        res.status(400).json(err.errors.description.message)
                    }
                    else if (err.errors.dueDate) {
                        res.status(400).json(err.errors.dueDate.message)
                    }
                    else {
                        res.status(500).json(err)
                    }
                })
        }
        else {
            console.log('masuk ke else 1')
            todo
                .create({
                    name: req.body.name,
                    description: req.body.description,
                    dueDate: req.body.dueDate,
                    projectId: req.body.projectId
                })
                .then(function (newTodo) {
                    res.status(201).json(newTodo)
                })
                .catch(function (err) {
                    if (err.errors.name) {
                        res.status(400).json(err.errors.name.message)
                    }
                    else if (err.errors.description) {
                        res.status(400).json(err.errors.description.message)
                    }
                    else if (err.errors.dueDate) {
                        res.status(400).json(err.errors.dueDate.message)
                    }
                    else {
                        res.status(500).json(err)
                    }
                })
        }
    }

    static getAllTodoSelf(req, res) {
        // console.log(req.query.userId)
        console.log('masuk ke all todo self')
        todo
            .find({
                userId: req.params.id
            })
            .populate('userId')
            .then(function (allTodo) {
                res.status(200).json(allTodo)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static getAllTodoProject(req, res) {
        todo
            .find({
                projectId: req.params.id
            })
            .populate('projectId')
            .then(function (allTodo) {
                res.status(200).json(allTodo)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static getOneTodo(req, res) {
        console.log(req.params)
        todo
            .findById(req.params.id)
            .then(function (oneTodo) {
                console.log(oneTodo)
                res.status(200).json(oneTodo)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    // static getOneTodoProject(req, res) {
    //     todo
    //         .findById(req.params.id)
    //         .then(function (oneTodo) {
    //             res.status(200).json(oneTodo)
    //         })
    //         .catch(function (err) {
    //             res.status(500).json(err)
    //         })
    // }

    static updateTodo(req, res) {
        todo
            .findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                    new: true
                })
            .then(function (oneTodo) {
                res.status(200).json(oneTodo)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static deleteTodo(req, res) {
        todo
            .findByIdAndDelete(req.params.id)
            .then(function (oneTodo) {
                res.status(200).json(oneTodo)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }
}

module.exports = Todo