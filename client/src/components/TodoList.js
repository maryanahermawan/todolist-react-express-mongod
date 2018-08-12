import React from "react";

class AddTodo extends React.Component {
    constructor(props) {
        super(props)
        this.state = { newTodo: '', newCategory:'Work' } //Default category is Work
        this.updateTodo = this.updateTodo.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.updateTodoClick = this.updateTodoClick.bind(this)
    }
    updateTodo(e) {
        this.setState({ newTodo: e.target.value, })
    }
    updateTodoClick() {
        //const listInfo = this.state.newTodo;
        this.props.addNewTodo({todos:this.state.newTodo, category:this.state.newCategory})
        this.setState({ newTodo: '',newCategory: '' })
    }
    handleChange(event) {
        this.setState({ newCategory: event.target.value });
    }
    render() {
        return (
            
            <div className="inputTodo">
                <button class="btn" onClick={this.updateTodoClick}><i class="fa fa-plus"></i></button>
                <input
                    value={this.state.newTodo}
                    onChange={this.updateTodo}
                    placeholder=" Enter to-do.."
                />
                <select className="styled-select"
                    value={this.state.newCategory}
                    onChange={this.handleChange}>
                    <option value="Work">Work</option>
                    <option value="Learning">Learning</option>
                    <option value="Volunteering">Volunteering</option>
                    <option value="Relationships">Relationships</option>
                    <option value="Groceries">Groceries</option>
                </select>
            </div>
            
        )
    }
}

export class TodoList extends React.Component {

    constructor(props) {
        super(props)
        this.state = { todosObjects: [{ todos: '', isDone: false, dateAdded: '', category:'' }] }
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
        var dt = new Date();
        var utcDate = dt.toUTCString();
        let todoNewItem = { todos: newItem.todos, isDone: false, dateAdded: utcDate, category: newItem.category }
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
        return <div>
            <h1>My To-do List</h1>
            <AddTodo addNewTodo={this.addTodoMethod} />
            <div className="workClass">
              <h2>Work</h2>
              {this.state.todosObjects.map(a => {
                let completeClass = "";

                if (a.isDone) {
                  completeClass = "checked";
                }

                if (a.category === "Work") {
                  return <div className="todoElement">
                      <label className="container">
                        {a.todos}
                        <input type="checkbox" checked={completeClass} onClick={() => this.markTodoComplete(a)} />
                        <span class="checkmark" />
                      </label>
                      <button class="btn" onClick={() => this.removeTodo(a)}>
                        <i class="fa fa-trash" />
                      </button>
                      <label className="dateOnly">
                        {" "}
                        Added {a.dateAdded}
                      </label>
                    </div>;
                }
              })}
            </div>

            <div className="learningClass">
                <h2>Learning</h2>
                {this.state.todosObjects.map(a => {
                    let completeClass = "";

                    if (a.isDone) {
                        completeClass = "checked";
                    }

                    if (a.category === "Learning") {
                        return <div className="todoElement">
                            <label className="container">
                                {a.todos}
                                <input type="checkbox" checked={completeClass} onClick={() => this.markTodoComplete(a)} />
                                <span class="checkmark" />
                            </label>
                            <button class="btn" onClick={() => this.removeTodo(a)}>
                                <i class="fa fa-trash" />
                            </button>
                            <label className="dateOnly">
                                {" "}
                                Added {a.dateAdded}
                            </label>
                        </div>;
                    }
                })}
            </div>

            <div className="volnClass">
                <h2>Volunteering</h2>
                {this.state.todosObjects.map(a => {
                    let completeClass = "";

                    if (a.isDone) {
                        completeClass = "checked";
                    }

                    if (a.category === "Volunteering") {
                        return <div className="todoElement">
                            <label className="container">
                                {a.todos}
                                <input type="checkbox" checked={completeClass} onClick={() => this.markTodoComplete(a)} />
                                <span class="checkmark" />
                            </label>
                            <button class="btn" onClick={() => this.removeTodo(a)}>
                                <i class="fa fa-trash" />
                            </button>
                            <label className="dateOnly">
                                {" "}
                                Added {a.dateAdded}
                            </label>
                        </div>;
                    }
                })}
            </div>
            <div className="relnClass">
                <h2>Relationships</h2>
                {this.state.todosObjects.map(a => {
                    let completeClass = "";

                    if (a.isDone) {
                        completeClass = "checked";
                    }

                    if (a.category === "Relationships") {
                        return <div className="todoElement">
                            <label className="container">
                                {a.todos}
                                <input type="checkbox" checked={completeClass} onClick={() => this.markTodoComplete(a)} />
                                <span class="checkmark" />
                            </label>
                            <button class="btn" onClick={() => this.removeTodo(a)}>
                                <i class="fa fa-trash" />
                            </button>
                            <label className="dateOnly">
                                {" "}
                                Added {a.dateAdded}
                            </label>
                        </div>;
                    }
                })}
            </div>
            <div className="groceriesClass">
                <h2>Groceries</h2>
                {this.state.todosObjects.map(a => {
                    let completeClass = "";

                    if (a.isDone) {
                        completeClass = "checked";
                    }

                    if (a.category === "Groceries") {
                        return <div className="todoElement">
                            <label className="container">
                                {a.todos}
                                <input type="checkbox" checked={completeClass} onClick={() => this.markTodoComplete(a)} />
                                <span class="checkmark" />
                            </label>
                            <button class="btn" onClick={() => this.removeTodo(a)}>
                                <i class="fa fa-trash" />
                            </button>
                            <label className="dateOnly">
                                {" "}
                                Added {a.dateAdded}
                            </label>
                        </div>;
                    }
                })}
            </div>
          </div>;
    }
}