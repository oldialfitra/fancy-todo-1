const router = require('express').Router(),
    routerUser = require('./user'),
    routerTodo = require('./todo'),
    routerProject = require('./project'),
    { authentication } = require('../middleware/auth')

router.use('/users', routerUser)

router.use('', authentication)

router.use('/todos', routerTodo)

router.use('/projects', routerProject)

module.exports = router