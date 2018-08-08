import React from "react";

/*importing React library from react
class is collection of React components
Render is what needs to be written on the page.
Every component must at least return 'render' method.
JSX: HTML combined with Java Script.
We cannot have two renders.
*/

class AddTodo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {newTodo:''}
        this.updateTodo=this.updateTodo.bind(this)
        this.handleUpdateTodo=this.handleUpdateTodo.bind(this)
    }
    updateTodo (e) {
        this.setState({newTodo: e.target.value,})
    }
    handleUpdateTodo () {
        this.props.addNewTodo(this.state.newTodo)
        this.setState({newTodo:''})
    }
    render () {
        return (
            <div>
                <input 
                value={this.state.newTodo}
                onChange={this.updateTodo}
                />
                <button onClick={this.handleUpdateTodo}> Add New Todo </button>
            </div>
        )
    }
}
/*
class ShowList extends React.Component {
    render () {
        return (
            <div>
                <ul>
                    {this.props.names.map(item => <li>{item}</li>)}
                </ul>
            </div>
        )
    }
}
*/
class App extends React.Component {
    constructor (props) {
        super (props)
        this.state = {todosObject: [{todos:'',isDone:false}]}
        this.addTodoMethod=this.addTodoMethod.bind(this)
    }
    
    addTodoMethod (newItem) { //newItem is returned by addNewTodo
        //Assemble data
        let todoNewItem = {todos: newItem, isDone:false}
        //update data
        this.state.todosObject.push(todoNewItem)
        //update state
        this.setState({todosObject: this.state.todosObject})
    }
    //pass 'addTodoMethod' to the component 'AddTodo' as props
    //Whenever setting the new state of component based on the previous state (as we’re doing with our friends todos), 
    //you want to pass setState a function which takes in the current state and returns the data to merge with the new state.
    // <ShowList names={this.state.todos}/>
     render (){
        return (
            <div>
                <AddTodo addNewTodo={this.addTodoMethod}/>
                <h1>My Todo List</h1>
                <ul>
                    {this.state.todosObject.map(a => {
                        let completeClass="";
                    
                        if (a.isDone) {
                            completeClass="complete";
                        };
                
                        return (
                        <li 
                        className={completeClass}>
                            {a.todos}
                        </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}



/*
class App extends React.Component {
    state = { //state is always an object
        todos: [ 
            {description: "buy apples", isDone: false},
            {description: "buy oranges", isDone: true},
        ]
    }
    
    handleToDoClick = (currentToDo) => {
        currentToDo.isDone = true
        //alert("you clicked to do"); //alert function to display msg to user
        const updatedState = {
            todos: this.state.todos
        }

        this.setState(updatedState)
    };

    render() {
        return <div> 
            <h1>Hello from React</h1>
            <p>My To Do List</p>
           
            <ul>
                {this.state.todos.map(a => {
                    let completeClass="";
                    
                    if (a.isDone) {
                        completeClass="complete";
                    };
                
                    return (
                        <li 
                        className={completeClass}
                        onClick={() => this.handleToDoClick(a)}>
                            {a.description}
                        </li>
                    )
                })}
            </ul>
        </div>
    };
};
*/
export default App;
