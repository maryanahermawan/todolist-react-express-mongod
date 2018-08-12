import React from "react";
import {About} from "./About";
import {TodoList} from "./TodoList";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends React.Component {
    
    render() {
        return (
            <Router>
                <div className="TabClass">
                    <span className="NavItem">
                        <Link to="/About" style={{ textDecoration: 'none' }}>ABOUT</Link>
                    </span>
                    <span className="NavSeparator">|</span>
                    <span className="NavItem">
                        <Link to="/TodoList" style={{ textDecoration: 'none' }}>TO-DOS</Link>
                    </span>
                   
                    <Route path="/About" component={About}/>
                    <Route path="/TodoList" component={TodoList}/>
                    <Route exact path="/" component={TodoList}/>
                </div>
            </Router>
        )
    }
}

export default App;