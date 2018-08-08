import React from "react";

/*importing React library from react
class is collection of React components
Render is what needs to be written on the page.
Every component must at least return 'render' method.
JSX: HTML combined with Java Script.
We cannot have two renders.
*/
class App extends React.Component {
    constructor (props) {
        super (props)
        this.state = {username: 'Maryana'}
        this.handleChange=this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState ({
            username: e.target.value
        })
    }
    render (){
        return(
            <div>
                Hello {this.state.username}
                <input
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
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
