import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Data from './Data';
import Editor from './Editor';
import {BrowserRouter as BR, Route, Switch} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <BR>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/editor/:docid" component={Editor}></Route>
          <Route exact path="/profile" component={Data}></Route>
          <Route exact path="/profile/:userid/editor/:docid" component={Editor}></Route>
        </Switch>
      </BR>
      );
  }
}

export default App;
