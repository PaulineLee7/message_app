import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Create from './Create';
import Update from './Update';
import Show from './Show';
import Comment from './Comment';

ReactDOM.render(
  <Router>
  <div>
    <Route exact path='/' component={App} />
    <Route path='/Create' component={Create} />
    <Route path='/Update/:id' component={Update} />
    <Route path='/Show/:id' component={Show} />
    <Route path='/Comment/:id' component={Comment} />
  </div>
  </Router>,
  document.getElementById('root')
);


