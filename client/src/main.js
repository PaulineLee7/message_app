
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import './index.css';
import App from './App';
import Create from './Create';
import Update from './Update';
import Show from './Show';
import Comment from './Comment';
import Read from './Read';
import Edit from './Edit'
import RouteChangeTracker from './RouteChangeTracker';
import ReactGA from 'react-ga';

require('dotenv').config();
ReactGA.initialize(process.env.REACT_APP_TRACKING_ID);

const LOCAL_ENDPOINT = process.env.NODE_ENV !== "production" ? "http://localhost:5000" : "";

ReactGA.initialize(`${process.env.REACT_APP_TRACKING_ID}`, {
    debug: true,
    titleCase: false,
    gaOptions: {
      userId: 123
    }
  });

class Main extends Component {  
    constructor(props){
        super(props);
      this.state = {
       user: '',
       userInfo: '',
      };
    };
    
    componentDidMount() {
        fetch('/userInfo')
        .then(res => {
            return res.json()
        }).then(user=>{
            this.setState({
               user
              });   
        })
      };

      renderNav = () =>{
         if(this.state.user.user){
        return <nav class="navbar navbar-dark bg-dark">
         <a class="navbar-brand" href= {process.env.REACT_APP_PORTS} >Message Board</a>
         <ul class="nav justify-content-end">
         <li class="nav-item"><Link to={`/Create`} class="nav-link active" > New Post </Link></li>
         <li class="nav-item"><a class="navbar-brand" href={LOCAL_ENDPOINT + "/logout"} class="nav-link active"> Logout </a> </li>
         </ul>
       </nav>
      }
   else{
        return <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" href= {process.env.REACT_APP_PORTS} >Message Board</a>
        <ul class="nav justify-content-end">
        <li class="nav-item"><a class="navbar-brand" href={LOCAL_ENDPOINT + "/login"}  class="nav-link active"> Login </a> </li>
        </ul>
      </nav>
      }
    }



render(){
    
   return(
       
    <Router>
    
    <div>
    {this.renderNav()}
    <Route exact path='/' render={(props) => (
        <App {...props} user={this.state.user} />)}/>
    <Route path='/Create' render={(props) => (
        <Create {...props} user={this.state.user}/>)}/>
    <Route path='/Update/:id' render={(props) => (
        <Update {...props} user={this.state.user} />)}/>
    <Route path='/Show/:id' render={(props) => (
        <Show {...props} user={this.state.user} />)}/>
    <Route path='/Comment/:id' render={(props) => (
        <Comment {...props} user={this.state.user} />)}/>
    <Route path='/Read/:id' render={(props) => (
        <Read {...props} user={this.state.user} />)}/>
    <Route path='/Edit/:id' render={(props) => (
        <Edit {...props} user={this.state.user} />)}/>
    <Route path='/Vote/:id'render={(props) => (
        <Show {...props} user={this.state.user} />)}/>
    </div>
    </Router>
   )}
  };

export default Main
