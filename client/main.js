$(document).ready(function () {
    let currentId = ''
    let currentProject = ''

    if (localStorage.getItem('projectId') === null && localStorage.getItem('token') === null) {
        $('#nav-add-self').hide()
        $('#nav-add-project-self').hide()
        $('#nav-add-project').hide()
        $('#nav-back').hide()
        $('#nav-add-member').hide()
        $('#add-todo').hide()
        $('#add-todo-project').hide()
        $('#update-todo').hide()
        $('#add-project').hide()
        $('#registerForm').hide()
        $('#googleOut').hide()
        $('#loginForm').show()
        $('#list-project-todo').hide()
        $('#homeIn').hide()
        $('#homeOut').show()
    }
    else if (localStorage.getItem('projectId') === null && localStorage.getItem('token') !== null) {
        $('#nav-add-self').show()
        $('#nav-add-project-self').show()
        $('#nav-add-project').hide()
        $('#nav-back').hide()
        $('#nav-add-member').hide()
        $('#googleOut').show()
        $('#registerForm').hide()
        $('#loginForm').hide()
        $('#add-todo').hide()
        $('#add-todo-project').hide()
        $('#update-todo').hide()
        $('#add-project').hide()
        $('#all-projects').show()
        $('#list-self-todo').show()
        $('#list-project-todo').hide()
        $('#homeIn').show()
        $('#homeOut').hide()
        getAllTodoSelf()
        getAllProject()
    }
    else if (localStorage.getItem('projectId') !== null && localStorage.getItem('token') !== null) {
        $('#nav-add-self').hide()
        $('#nav-add-project-self').hide()
        $('#nav-add-project').show()
        $('#nav-back').show()
        $('#nav-add-member').show()
        $('#googleOut').show()
        $('#registerForm').hide()
        $('#loginForm').hide()
        $('#add-todo').hide()
        $('#add-todo-project').hide()
        $('#update-todo').hide()
        $('#add-project').hide()
        $('#all-projects').hide()
        $('#list-self-todo').hide()
        $('#list-project-todo').show()
        $('#homeIn').show()
        $('#homeOut').hide()
        getAllTodoProject()
    }

    //==========================================================================================================

    //======================================================= User =============================================

    $('#login-form').submit(function () {
        // $('#main').empty()
        console.log('masuk ke login')
        event.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'http://13.58.52.58/users/signin',
            data: {
                email: $('#emailLogin').val(),
                password: $('#passwordLogin').val()
            }
        })
            .done(uLogin => {
                localStorage.setItem('token', uLogin.token)
                localStorage.setItem('id', uLogin.id)
                getAllTodoSelf()
                getAllProject()

                console.log('signin')
                console.log(uLogin)
                $('#main').show()
                $('#homeIn').show()
                $('#homeOut').hide()
                $('#nav-add-self').show()
                $('#nav-add-project-self').show()
                $('#nav-add-project').hide()
                $('#nav-back').hide()
                $('#nav-add-member').hide()
                $('#googleOut').show()
                $('#registerForm').hide()
                $('#loginForm').hide()
                $('#add-todo').hide()
                $('#add-todo-project').hide()
                $('#update-todo').hide()
                $('#add-project').hide()
                $('#list-self-todo').show()
                $('#all-projects').show()

                Swal.fire({
                    type: 'success',
                    title: 'Success Login',
                    showConfirmButton: false,
                    timer: 1500
                })
                // $('#name').val('')
                // $('#myRepo').append(`<li>${newRepo.full_name}</li>`)
            })
            .fail(err => {
                console.log(err)
            })
    })

    $('#register-form').submit(function () {
        event.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'http://13.58.52.58/users/signup',
            data: {
                email: $('#emailRegister').val(),
                password: $('#passwordRegister').val()
            }
        })
            .done(uRegister => {
                console.log('signUp')
                console.log(uRegister)
                $('#emailRegister').val('')
                $('#passwordRegister').val('')
                $('#loginForm').show()
                $('#registerForm').hide()
                // $('#name').val('')
                // $('#myRepo').append(`<li>${newRepo.full_name}</li>`)
            })
            .fail(err => {

                Swal.fire({
                    title: err.msg,
                    animation: false,
                    customClass: {
                        popup: "animated tada"
                    }
                });
                console.log(err)
            })
    })

})

//======================================== Initial ================================================

function changeToRegister() {
    console.log('masuk ke hide')
    $('#loginForm').hide()
    $('#registerForm').show()
}

function changetoLogin() {
    $('#loginForm').show()
    $('#registerForm').hide()
}

function showAddFormSelf() {
    $('#add-todo').show()
    $('#add-todo-project').hide()
    $('#update-todo').hide()
    $('#add-project').hide()
    $('#registerForm').hide()
    $('#loginForm').hide()
    $('#all-projects').hide()
    $('#list-self-todo').hide()
}

function showAddProject() {
    $('#add-todo').hide()
    $('#add-todo-project').hide()
    $('#update-todo').hide()
    $('#add-project').show()
    $('#registerForm').hide()
    $('#loginForm').hide()
    $('#all-projects').hide()
    $('#list-self-todo').hide()
}

function showList() {
    $('#add-todo').hide()
    $('#add-todo-project').hide()
    $('#update-todo').hide()
    $('#add-project').hide()
    $('#registerForm').hide()
    $('#loginForm').hide()
    $('#all-projects').show()
    $('#list-self-todo').show()
}

function showAddToDoProject() {
    $('#googleOut').show()
    $('#registerForm').hide()
    $('#loginForm').hide()
    $('#add-todo').hide()
    $('#add-todo-project').show()
    $('#update-todo').hide()
    $('#add-project').hide()
    $('#all-projects').hide()
    $('#list-self-todo').hide()
    $('#list-project-todo').hide()
}

//===================================================================================================

//============================================ Google ===============================================

function onSignIn(googleUser) {
    console.log('masuk ke google sign in')
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var id_token = googleUser.getAuthResponse().id_token;
    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', 'http://13.58.52.58/users');
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.onload = function () {
    //     console.log('Signed in as: ' + xhr.responseText);
    // };
    // xhr.send('idtoken=' + id_token);
    if (!localStorage.getItem('token')) {
        // $('#main').empty()
        $.ajax({
            url: 'http://13.58.52.58/users/googlesignin',
            method: 'POST',
            data: {
                idToken: id_token
            }
        })
            .done(function (data) {
                console.log(data)
                localStorage.setItem('token', data.token)
                localStorage.setItem('id', data.id)
                getAllTodoSelf()
                getAllProject()

                $('#main').show()
                $('#homeIn').show()
                $('#homeOut').hide()
                $('#nav-add-self').show()
                $('#nav-add-project-self').show()
                $('#nav-add-project').hide()
                $('#nav-back').hide()
                $('#nav-add-member').hide()
                $('#googleOut').show()
                $('#registerForm').hide()
                $('#loginForm').hide()
                $('#add-todo').hide()
                $('#add-todo-project').hide()
                $('#update-todo').hide()
                $('#add-project').hide()
                $('#list-self-todo').show()
                $('#all-projects').show()

                Swal.fire({
                    type: 'success',
                    title: 'Success Login',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .fail(function (err) {
                console.log(err)
                console.log(err.response)
            })
    }
}

//=================================================================================================

//========================================== Project =================================================

function addProject() {
    $.ajax({
        method: 'POST',
        url: 'http://13.58.52.58/projects',
        data: {
            name: $('#nameProject').val(),
            memberId: localStorage.getItem('id')
        },
        headers: {
            token: localStorage.getItem('token'),
            projectId: localStorage.getItem('projectId')
        }
    })
        .done(newProject => {
            $('#nameProject').val('')
            console.log('added project')
            console.log(newProject)
            $('#add-todo').hide()
            $('#add-todo-project').hide()
            $('#update-todo').hide()
            $('#add-project').hide()
            $('#registerForm').hide()
            $('#loginForm').hide()
            $('#all-projects').show()
            $('#list-self-todo').show()
            getAllProject()
            Swal.fire({
                type: 'success',
                title: 'Success Add Project',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .fail(err => {
            console.log(err)
        })
}

function getAllProject() {
    $('#all-projects').empty()
    let myProjects = ''
    $.ajax({
        method: 'GET',
        url: `http://13.58.52.58/projects`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(function (allProjects) {
            console.log(allProjects, 'ini project')
            console.log(allProjects.length)
            if (allProjects.length === 0) {
                myProjects += `
                <h3 class="well text-center">My Project</h3>
                <div id="div1" class="well text-center">
                    <div id="div2" class="container">
                        <span>You don't have any project</span>
                    </div>
                </div>`
                $('#all-projects').append(myProjects)
            }
            else {
                myProjects += `
            <h3 class="well text-center">My Project</h3>
            <div id="div1" class="well text-center">
            <ol>`
                // console.log(myProjects)
                // console.log(allProjects)
                // allProjects.forEach(e => {
                //     myProjects += `<a href="#">${allProjects.name}</a>`
                // });
                // $('#all-projects').append(myProjects)
                // let myProject = ``
                let id = localStorage.getItem('id')
                allProjects.forEach(e => {
                    console.log(e)
                    e.members.forEach(f => {
                        if (f._id === id) {
                            console.log(e._id, 'inijiniin')
                            myProjects += `    
                        <li><a href="#" role="button" onclick="getOneProject('${e._id}')">${e.name}</a> <div class="delete">
                        <a href="#" role="button" onclick="deleteProject('${e._id}')">
                        <i class="far fa-trash-alt"></i> Delete
                        </a>
                    </div><br></li>
                        `
                        }
                    });
                });
                myProjects += `
            </ol>
            </div>`
                // console.log(myProjects)
                $('#all-projects').append(myProjects)
                // localStorage.setItem('projectId', oneProject._id)
            }
        })
        .fail(function (err) {
            console.log(err)
        })
}

function getOneProject(id) {
    $.ajax({
        method: 'GET',
        url: `http://13.58.52.58/projects/${id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(function (oneProject) {
            $('#homeIn').show()
            $('#homeOut').hide()
            $('#nav-add-self').hide()
            $('#nav-add-project-self').hide()
            $('#nav-add-project').show()
            $('#nav-back').show()
            $('#nav-add-member').show()
            $('#googleOut').show()
            $('#add-todo').hide()
            $('#add-todo-project').hide()
            $('#update-todo').hide()
            $('#add-project').hide()
            $('#all-projects').hide()
            $('#list-self-todo').hide()
            $('#list-project-todo').show()
            console.log(oneProject)
            localStorage.setItem('projectId', oneProject._id)
            getAllTodoProject()
            // localStorage.setItem('projectId', oneProject._id)
        })
        .fail(function (err) {
            console.log(err)
        })
}

function addMember() {
    let projectId = localStorage.getItem('projectId')
    $.ajax({
        method: 'PUT',
        url: `http://13.58.52.58/projects/${projectId}`,
        data: {
            email: $('#emailMember').val()
        },
        headers: {
            token: localStorage.getItem('token'),
            projectId: localStorage.getItem('projectId')
        }
    })
        .done(oneProject => {
            $('#emailMember').val('')
            Swal.fire({
                type: 'success',
                title: 'Success Add Member',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .fail(err => {
            console.log(err)
        })
}

function deleteProject(projectId) {
    $.ajax({
        method: 'DELETE',
        url: `http://13.58.52.58/projects/${projectId}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(newProject => {
            $("#main").show()
            getAllProject()
            Swal.fire({
                type: 'success',
                title: 'Success delete project',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .fail(err => {
            console.log(err)
        })
}

function backToDo() {
    localStorage.removeItem('projectId')
    $('#homeIn').show()
    $('#homeOut').hide()
    $('#nav-add-self').show()
    $('#nav-add-project-self').show()
    $('#nav-add-project').hide()
    $('#nav-back').hide()
    $('#nav-add-member').hide()
    $('#googleOut').show()
    $('#add-todo').hide()
    $('#add-todo-project').hide()
    $('#update-todo').hide()
    $('#add-project').hide()
    $('#all-projects').show()
    $('#list-self-todo').show()
    $('#list-project-todo').hide()
    getAllTodoSelf()
    getAllProject()
}

//=================================================================================================

//================================================== ToDo ====================================================

function addTodo() {
    event.preventDefault()
    console.log('masuk ke add todo')
    $.ajax({
        method: 'POST',
        url: 'http://13.58.52.58/todos',
        data: {
            name: $('#nameAddSelf').val(),
            description: $('#descriptionAddSelf').val(),
            dueDate: $('#dueDateAddSelf').val(),
            userId: localStorage.getItem('id')
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(newTodo => {
            $('#nameAddSelf').val('')
            $('#descriptionAddSelf').val('')
            $('#dueDateAddSelf').val('')
            console.log('signin')
            console.log(newTodo)
            // $('#add-todo').hide()
            // $('#add-todo-project').hide()
            // $('#update-todo').hide()
            // $('#add-project').hide()
            // $('#registerForm').hide()
            // $('#loginForm').hide()
            // $('#all-projects').show()
            // $('#list-self-todo').hide()
            getAllTodoSelf()
            // $('#main').show()
            Swal.fire({
                type: 'success',
                title: 'Success Add Todo',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .fail(err => {
            console.log(err)
        })
}

function addTodoProject() {
    event.preventDefault()
    console.log('masuk ke add todo')
    console.log(localStorage.getItem('projectId'))
    $.ajax({
        method: 'POST',
        url: 'http://13.58.52.58/todos',
        data: {
            name: $('#nameAddProject').val(),
            description: $('#descriptionAddProject').val(),
            dueDate: $('#dueDateAddProject').val(),
            projectId: localStorage.getItem('projectId')
        },
        headers: {
            token: localStorage.getItem('token'),
            projectId: localStorage.getItem('projectId')
        }
    })
        .done(newTodo => {
            $('#nameAddProject').val('')
            $('#descriptionAddProject').val('')
            $('#dueDateAddProject').val('')
            console.log('signin')
            console.log(newTodo)
            // $('#main').show()
            $('#add-todo').hide()
            $('#add-todo-project').hide()
            $('#update-todo').hide()
            $('#add-project').hide()
            $('#all-projects').hide()
            $('#list-self-todo').hide()
            $('#list-project-todo').show()
            getAllTodoProject()
            Swal.fire({
                type: 'success',
                title: 'Success Add Todo',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .fail(err => {
            console.log(err)
        })
}

function getAllTodoSelf() {
    $('#list-self-todo').empty()
    console.log('masuk ke ini')
    let id = localStorage.getItem('id')
    console.log(id)
    let myTodos = ''
    $.ajax({
        method: 'GET',
        url: `http://13.58.52.58/todos/allSelf/${id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(function (allProjects) {
            console.log(allProjects)
            myTodos += '<h3 class="well text-center">My Todos</h3>'
            if (allProjects.length === 0) {
                myTodos += `
                <div id="div1" class="well text-center">
                    <div id="div2" class="container">
                        <span>You don't have any todo</span>
                    </div>
                </div>`
            }
            else {
                myTodos += `
                <div id="div1" class="well text-center">
                `
                allProjects.forEach(e => {
                    console.log(e)
                    let statusTodo = ''
                    if (e.status === false) {
                        statusTodo = 'incomplete'
                    }
                    else {
                        statusTodo = 'complete'
                    }
                    console.log(e._id)
                    myTodos += `
                    <div id="div2">
                        <div class="title"><h4>${e.name}</h4></div>
                        <div><p>${e.description}</p><div>
                        <div><p>${statusTodo}</p><div>
                        <div><p>${new Date(e.dueDate).toISOString().substring(0, 10)}</p><div>
                        <div class="update">
                            <a href="#" role="button" onclick="getOneTodo('${e._id}')">
                                <i class="fas fa-edit"></i> Update
                            </a>
                        </div>
                        <div class="delete">
                            <a href="#" role="button" onclick="deleteTodo('${e._id}')">
                            <i class="far fa-trash-alt"></i> Delete
                            </a>
                        </div>
                    </div>
                    `
                });
                myTodos += `
                
                </div>
                `
            }
            $('#list-self-todo').append(myTodos)
        })
        .fail(function (err) {
            console.log(err)
        })
}

function getAllTodoProject() {
    $('#list-project-todo').empty()
    console.log('masuk ke dalama all')
    let id = localStorage.getItem('projectId')
    let myTodos = ''
    $.ajax({
        method: 'GET',
        url: `http://13.58.52.58/todos/allProject/${id}`,
        headers: {
            token: localStorage.getItem('token'),
            projectId: localStorage.getItem('projectId')
        }
    })
        .done(function (allProjects) {
            console.log(allProjects)
            myTodos += `<h3 class="well text-center">Project's Todos</h3>`
            if (allProjects.length === 0) {
                myTodos += `
                <div id="div1" class="well text-center">
                    <div id="div2" class="container">
                        <span>You don't have any todo</span>
                    </div>
                </div>`
            }
            else {
                myTodos += `
                <div id="div1" class="well text-center">
                `
                allProjects.forEach(e => {
                    console.log(e)
                    let statusTodo = ''
                    if (e.status === false) {
                        statusTodo = 'incomplete'
                    }
                    else {
                        statusTodo = 'complete'
                    }
                    console.log(e._id)
                    myTodos += `
                    <div id="div2">
                        <div class="title"><h4>${e.name}</h4></div>
                        <div><p>${e.description}</p><div>
                        <div><p>${statusTodo}</p><div>
                        <div><p>${new Date(e.dueDate).toISOString().substring(0, 10)}</p><div>
                        <div class="update">
                            <a href="#" role="button" onclick="getOneTodo('${e._id}')">
                                <i class="fas fa-edit"></i> Update
                            </a>
                        </div>
                        <div class="delete">
                            <a href="#" role="button" onclick="deleteTodo('${e._id}')">
                            <i class="far fa-trash-alt"></i> Delete
                            </a>
                        </div>
                    </div>
                    `
                });
                myTodos += `
                </div>
                `
            }
            $('#list-project-todo').append(myTodos)
        })
        .fail(function (err) {
            console.log(err)
        })
}

// function getOneTodoSelf(id) {
//     $.ajax({
//         method: 'GET',
//         url: `http://13.58.52.58/todos/oneSelf/${id}`
//     })
//     .done(function (oneProject) {
//         console.log(oneProject)
//         // localStorage.setItem('projectId', oneProject._id)
//     })
//     .fail(function (err) {
//         console.log(err)
//     })
// }

function getOneTodo(id) {
    let idProject = ''
    if (localStorage.getItem('projectId')) {
        idProject = localStorage.getItem('projectId')
    }
    else {
        idProject = ''
    }
    $('#update-todo').show()
    event.preventDefault()
    console.log('masuk ke get one')
    id = id.toString()
    $.ajax({
        method: 'GET',
        url: `http://13.58.52.58/todos/${id}`,
        headers: {
            token: localStorage.getItem('token'),
            projectId: idProject
        }
    })
        .done(function (oneProject) {
            console.log(oneProject)
            currentId = oneProject._id
            console.log(typeof oneProject.dueDate)
            $('#nameUpdate').val(oneProject.name)
            $('#descriptionUpdate').val(oneProject.description)
            $('#dueDateUpdate').val(new Date(oneProject.dueDate).toISOString().substring(0, 10))
            $('#statusUpdate').val(oneProject.status)
            $('#add-todo').hide()
            $('#add-todo-project').hide()
            $('#update-todo').show()
            $('#add-project').hide()
            $('#registerForm').hide()
            $('#loginForm').hide()
            $('#all-projects').hide()
            $('#list-self-todo').hide()
            $('#list-project-todo').hide()
            // localStorage.setItem('projectId', oneProject._id)
        })
        .fail(function (err) {
            console.log(err)
        })
}

function updateTodo() {
    let idProject = ''
    if (localStorage.getItem('projectId')) {
        idProject = localStorage.getItem('projectId')
    }
    else {
        idProject = ''
    }
    $.ajax({
        method: 'PUT',
        url: `http://13.58.52.58/todos/${currentId}`,
        data: {
            name: $('#nameUpdate').val(),
            description: $('#descriptionUpdate').val(),
            dueDate: $('#dueDateUpdate').val(),
            status: $('#statusUpdate').val()
        },
        headers: {
            token: localStorage.getItem('token'),
            projectId: idProject
        }
    })
        .done(function (oneProject) {
            Swal.fire({
                type: 'success',
                title: 'Success update todo',
                showConfirmButton: false,
                timer: 1500
            })
            $('#nameUpdate').val('')
            $('#descriptionUpdate').val('')
            $('#dueDateUpdate').val('')
            $('#statusUpdate').val('')
            $('#add-todo').hide()
            $('#add-todo-project').hide()
            $('#update-todo').hide()
            $('#add-project').hide()
            $('#registerForm').hide()
            $('#loginForm').hide()
            if (localStorage.getItem('projectId') !== null) {
                $('#list-project-todo').show()
            }
            else {
                $('#all-projects').show()
                $('#list-self-todo').show()
            }
            getAllTodoSelf()
            getAllTodoProject()
            // localStorage.setItem('projectId', oneProject._id)
        })
        .fail(function (err) {
            console.log(err)
        })
}

function deleteTodo(id) {
    let idProject = ''
    if (localStorage.getItem('projectId')) {
        idProject = localStorage.getItem('projectId')
    }
    else {
        idProject = ''
    }
    $.ajax({
        method: 'DELETE',
        url: `http://13.58.52.58/todos/${id}`,
        headers: {
            token: localStorage.getItem('token'),
            projectId: idProject
        }
    })
        .done(function (oneProject) {
            Swal.fire({
                type: 'success',
                title: 'Success delete todo',
                showConfirmButton: false,
                timer: 1500
            })
            console.log(oneProject)
            $('#add-todo').hide()
            $('#add-todo-project').hide()
            $('#update-todo').hide()
            $('#add-project').hide()
            $('#registerForm').hide()
            $('#loginForm').hide()
            $('#all-projects').show()
            $('#list-self-todo').show()
            getAllTodoSelf()
            getAllTodoProject()
            // localStorage.setItem('projectId', oneProject._id)
        })
        .fail(function (err) {
            console.log(err)
        })
}

//======================================================================================================

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        console.log(localStorage.getItem('token'))
        // localStorage.removeItem('token')
        $('#homeIn').hide()
        $('#homeOut').show()
        $('#nav-add-self').hide()
        $('#nav-add-project-self').hide()
        $('#nav-add-project').hide()
        $('#nav-back').hide()
        $('#nav-add-member').hide()
        $('#googleOut').hide()
        $('#registerForm').hide()
        $('#loginForm').show()
        $('#add-todo').hide()
        $('#add-todo-project').hide()
        $('#update-todo').hide()
        $('#add-project').hide()
        $('#all-projects').hide()
        $('#list-self-todo').hide()
        $('#list-project-todo').hide()
        localStorage.clear()
    });
}