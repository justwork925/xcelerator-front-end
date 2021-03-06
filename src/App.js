import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import DetailedView from './components/DetailedView';
import ListView from './components/ListView';
import Navbar from './components/Navbar';

class App extends Component {
   render() {
      return (
         <div className="App">
            <Router>
               <Navbar></Navbar>
               <div className="container">
               <Route path="/" exact component={ListView}></Route>
               <Route path="/posts/:postId"  exact component={DetailedView} ></Route>
               </div>
            </Router>
         </div>
      );
   }
}

export default App;
