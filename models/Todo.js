const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema(
    {
        todos: {
            type: String,
            // required: [true, 'cannot be blank'],
        },
        isDone: {
            type: Boolean,
        },
    }
);

TodoSchema.methods.toJSON = function() {
    return {
        id: this._id,
        todos: this.todos,
        isDone: this.isDone,
    };
};

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = { Todo };