const router = require('express').Router(),
    controllerTodo = require('../controllers/todo'),
    { authorizationTodo, authorizeProject } = require('../middleware/auth')

router.post('/', authorizeProject, controllerTodo.addTodo)

router.get('/:id',authorizationTodo,authorizeProject, controllerTodo.getOneTodo)

router.put('/:id',authorizationTodo,authorizeProject, controllerTodo.updateTodo)

router.delete('/:id',authorizationTodo,authorizeProject, controllerTodo.deleteTodo)

router.get('/allSelf/:id', controllerTodo.getAllTodoSelf)

router.get('/allProject/:id', controllerTodo.getAllTodoProject)

module.exports = router