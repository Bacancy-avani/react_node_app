import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import InsertForm from './views/InsertForm';
import List from './views/List';
import EditForm from './views/EditForm';
import './App.css';

class App extends Component {


  render() {
    return (
      <div className="App">

        
         <Link to="/insert">
         <p className="text-xl-right m-5">
         Insert Record From Here....
         </p></Link>
        
        <Route exact path="/" component={List} />
        <Route exact path="/insert" component={InsertForm} />
        <Route exact path="/edit/:id" component={EditForm} />
      </div>
    );
  }
}

export default App;
