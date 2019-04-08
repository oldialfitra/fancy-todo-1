const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const projectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'fancy-todo-user'
    }]
})

const Project = mongoose.model('fancy-todo-project', projectSchema)

module.exports = Project