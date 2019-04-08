const router = require('express').Router(),
    controllerProject = require('../controllers/project'),
    { authorizeProject, authorizeDeleteProject } = require('../middleware/auth')

router.post('/', controllerProject.addProject)

router.get('/', controllerProject.getAllProject)

router.get('/:id', controllerProject.getOneProject)

router.put('/:id',authorizeProject, controllerProject.addMember)

router.delete('/:id',authorizeDeleteProject, controllerProject.deleteProject)

module.exports = router