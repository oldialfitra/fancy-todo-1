const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const todoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    description: {
        type: String,
        required: [true, 'Description required']
    },
    status: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        required: [true, 'Due Date required']
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'fancy-todo-project'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'fancy-todo-user'
    }
})

const Todo = mongoose.model('fancy-todo-todo', todoSchema)

module.exports = Todo