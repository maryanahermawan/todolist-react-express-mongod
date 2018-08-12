import React from "react";

class AddTodo extends React.Component {
    constructor(props) {
        super(props)
        this.state = { newTodo: '' }
        this.updateTodo = this.updateTodo.bind(this)
        this.updateTodoClick = this.updateTodoClick.bind(this)
    }
    updateTodo(e) {
        this.setState({ newTodo: e.target.value, })
    }
    updateTodoClick() {
        this.props.addNewTodo(this.state.newTodo)
        this.setState({ newTodo: '' })
    }
    render() {
        return (
            <div className="todoElement">
                <button class="btn" onClick={this.updateTodoClick}><i class="fa fa-plus"></i></button>
                <input
                    value={this.state.newTodo}
                    onChange={this.updateTodo}
                    placeholder="Enter to-do.."
                />
            </div>
        )
    }
}

export class TodoList extends React.Component {

    constructor(props) {
        super(props)
        this.state = { todosObjects: [{ todos: '', isDone: false }] }
        this.addTodoMethod = this.addTodoMethod.bind(this)
    }

    //state = {todosObjects: [{todos:'',isDone:false}]};
    async componentDidMount() {
        const response = await fetch("/toDos");
        const { toDos } = await response.json();
        this.setState({
            todosObjects: toDos,
        });
    }


    addTodoMethod(newItem) {
        //Assemble data
        let todoNewItem = { todos: newItem, isDone: false }
        const body = {
            todo: todoNewItem,
        };
        fetch(
            "/toDos",
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }
        );
        this.setState({ todosObjects: [...this.state.todosObjects, todoNewItem] })
    }
    markTodoComplete(todosObj) {
        todosObj.isDone = !todosObj.isDone;
        const body = {
            todo: todosObj,
        };
        fetch(
            "/toDos",
            {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }
        );
        /*
        this.state.todosObjects.map(
            todos => todo.todos === todosObj.todos ?
            {todo.isDone = todosObj.isDone} :
            todo
        )
        */
        this.setState({ todosObjects: this.state.todosObjects })
    }

    removeTodo(todosObj) {
        const body = {
            todo: todosObj,
        };
        fetch(
            "/toDos",
            {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }
        );
        var index = this.state.todosObjects.indexOf(todosObj);
        var tempTodosObject = this.state.todosObjects;
        tempTodosObject.splice(index, 1);
        if (index > -1) {
            this.setState({ todosObjects: tempTodosObject })
        }
    }

    render() {
        return (
            <div>
                <h1>My To-do List</h1>
                <AddTodo addNewTodo={this.addTodoMethod} />

                {this.state.todosObjects.map(a => {
                    let completeClass = "";

                    if (a.isDone) {
                        completeClass = "checked";
                    };

                    return (
                        <div className="todoElement">
                            <label className="container">{a.todos}
                                <input type="checkbox" checked={completeClass} onClick={() => this.markTodoComplete(a)}></input>
                                <span class="checkmark"></span>
                            </label>
                            <button class="btn" onClick={() => this.removeTodo(a)}><i class="fa fa-trash"></i></button>
                        </div>
                    )
                })}
            </div>
        )
    }
}