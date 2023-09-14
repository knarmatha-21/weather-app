import React, {Component} from 'react';
import './App.css';
import './responsive.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Weather from './component/Weather';


class App extends Component {
    render(){
        return (       
            <div>                 
                <Router>
                    <Switch>
                        <Route path="/" exact component={Weather}/>                         
                    </Switch>
                </Router>           
            </div>     
        )
    }
}

export default App;
