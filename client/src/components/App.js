import React from "react";
import Tabs from "./Tabs";
import {About} from "./About";
import glamorous from "glamorous";

class AddTodo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {newTodo:''}
        this.updateTodo=this.updateTodo.bind(this)
        this.updateTodoClick=this.updateTodoClick.bind(this)
    }
    updateTodo (e) {
        this.setState({newTodo: e.target.value,})
    }
    updateTodoClick () {
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
                <button onClick={this.updateTodoClick}> Add New Todo </button>
            </div>
        )
    }
}
/*
class TodoList extends React.Component {

}
*/
class App extends React.Component {
    
    constructor (props) {
        super (props)
        this.state = {todosObjects: [{todos:'',isDone:false}]}
        this.addTodoMethod=this.addTodoMethod.bind(this)
    }
    
    //state = {todosObjects: [{todos:'',isDone:false}]};
    async componentDidMount(){
        const response = await fetch("/toDos");
        const {toDos} = await response.json();
        this.setState({
            todosObjects:toDos,
        });
    }


    addTodoMethod (newItem) { //newItem is returned by addNewTodo
        //Assemble data
        let todoNewItem = {todos: newItem, isDone:false}
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
        this.setState({todosObjects: [...this.state.todosObjects,todoNewItem]})
    }
    markTodoComplete (todosObj) {
        todosObj.isDone=!todosObj.isDone;
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
        this.setState({todosObjects: this.state.todosObjects})
    }

    removeTodo (todosObj) {
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
        tempTodosObject.splice(index,1);
        if (index > -1) {
            this.setState({todosObjects: tempTodosObject })
        }
    }
    //pass 'addTodoMethod' to the component 'AddTodo' as props
    //Whenever setting the new state of component based on the previous state (as we’re doing with our friends todos), 
    //you want to pass setState a function which takes in the current state and returns the data to merge with the new state.

     render (){
        return (
            <div>
                <Tabs activeTab={{id: "tab1"}}>
                    <Tabs.Tab id="tab1" title="ABOUT">
                        <glamorous.Div padding={20}>This is tab 1</glamorous.Div>
                    </Tabs.Tab>
                    <Tabs.Tab id="tab2" title="TODOS">
                        <About/>
                        <AddTodo addNewTodo={this.addTodoMethod}/>
                        <glamorous.Div padding={20}>My Todo List</glamorous.Div>
                        <ul>
                            {this.state.todosObjects.map(a => {
                                let completeClass="";
                    
                                if (a.isDone) {
                                    completeClass="complete";
                                };
                
                                return (
                                    <li 
                                    className={completeClass}>
                                    
                                        <div onClick={() => this.markTodoComplete(a)}>{a.todos}</div>
                                        <button onClick={() => this.removeTodo(a)}> X </button>
                                    </li>
                                )  
                            })}
                        </ul>
                    </Tabs.Tab>
                </Tabs>
            </div>
        )
    }
    
}

export default App;
