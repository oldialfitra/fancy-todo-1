# fancy-todo


## Todo Route
**Note:**  <br>*  *is required*<br> ** *required if from project**
 HTTP | Router | Headers | Body | Success | Error | Description
------|--------|---------|------|---------|-------|------------
 POST | <span style="color:red">/todos</span> | *token, **projectId | *name, *description, *dueDate, **projectId / *userId | Status: 201<br>Object{id, name, description, dueDate, projectId / userId} | Status: 400<br>Object { message: `name / description / dueDate required` }<br>Status: 500<br>Object { message: `Internal Server Error`, err } | Create a Todo
 GET | <span style="color:red">/todos/allSelf/:id</span> | *token |  | Status: 200<br>[Object{id, name, description, dueDate, projectId / userId}] | Status: 500<br>Object { message: `Internal Server Error`, err } | All User's Todo without Project's Todo
 GET | <span style="color:red">/todos/allProject/:id</span> | *token |  | Status: 200<br>[Object{id, name, description, dueDate, projectId / userId}] | Status: 500<br>Object { message: `Internal Server Error`, err } | All Project's Todo without User's Todo
 DELETE | <span style="color:red">/todos/:id</span> | *token, **projectId |  | Deleted Todo -> Object{id, name, description, dueDate, projectId / userId} | Status: 500<br>Object { message: `Internal Server Error`, err } | Delete a Todo
 PUT | <span style="color:red">/todos/:id</span> | *token, **projectId | name, description | Updated Todo -> Object{id, name, description, dueDate, projectId / userId} | Status: 500<br>Object { message: `Internal Server Error`, err } | Update a Todo
 GET | <span style="color:red">/todos/:id</span> | *token, **projectId |  | Object{id, name, description, dueDate, projectId / userId} | Status: 500<br>Object { message: `Internal Server Error`, err } | Get a Todo
 PUT | <span style="color:red">/todos/:id</span> | *token | userId | Updated Todo -> Object{id, name, description, dueDate, projectId / userId} | Status: 500<br>Object { message: `Internal Server Error`, err } | dueDate a Todo

<br>

## Users Route
**Note:**  *  *is required*
 HTTP | Router | Body | Success | Error | Description
------|--------|------|---------|-------|------------
 POST | <span style="color:red">/users/signin</span> |  *email, *password | Status: 200<br>Object{token, id} | Status: 500<br>Object { message: `Internal Server Error`, err } | Sign In User  
 POST | <span style="color:red">/users/signup</span> |  *email, *password | Status: 201<br>Object{email, password} | Status: 400<br>Object { message: `Email / password required` }<br>Status: 500<br>Object { message: `Internal Server Error`, err } | Sign Up User  
 POST | <span style="color:red">/users/googlesignin</span> |  *email, *password | Status: 200<br>Object{token, id} | Status: 500<br>Object { message: `Internal Server Error`, err } | Sign In User using Google Sign In 

<br>

## Project Route
**Note:**  <br>*  *is required*
  HTTP | Router | Headers | Body | Success | Error | Description
------|--------|---------|------|---------|-------|------------
 POST | <span style="color:red">/projects</span> | *token | *name, *membersId | Status: 201<br> Object {id, name, [membersId]} | Object { message: `Internal Server Error`, err } | Create a Project
 GET | <span style="color:red">/projects</span> | *token |  | Status: 200<br>[Object {id, name, [membersId]}] | Status: 500<br>Object { message: `Internal Server Error`, err } | All Projects
 DELETE | <span style="color:red">/projects/:id</span> | *token |  | Status: 200<br>Object {id, name, [membersId]} | Status: 500<br>Object { message: `Internal Server Error`, err } | Delete a Project
 PUT | <span style="color:red">/projects/:id</span> | *token, *projectId | *email | Status:200<br>Object {id, name, [membersId]} | Status: 500<br>Object { message: `Internal Server Error`, err } | Add a member to project
 GET | <span style="color:red">/projects/:id</span> | *token |  | Status: 200<br>Object {id, name, [membersId]} | Status: 500<br>Object { message: `Internal Server Error`, err } | Get a Project

## Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:<br>
$npm install<br>
$npm run start or $npm run dev<br>

Access the Server side via http://localhost:5000/.

Access the Client side via http://localhost:8080/.