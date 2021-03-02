import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Main from './main'
//import ReactGA from 'react-ga';

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);



// ReactDOM.render(
//   <Router>
//       <div>
//   <Route exact path='/' component={App} />
//   <Route path='/Create' component={Create} />
//   <Route path='/Update/:id' component={Update} />
//   <Route path='/Show/:id' component={Show} />
//   <Route path='/Comment/:id' component={Comment} />
//   <Route path='/Read/:id/:id' component={Show} />
//   <Route path='/Read' component={Read} />
//   <Route path='/Vote/:id' component={Show} />
//   <Route path='/Login' component={Login} />
//   <Route path='/log_out' component={log_out} />
  
//       </div>
//     </Router>,
//     document.getElementById('root')
//   );