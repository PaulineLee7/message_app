import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';
const LOCAL_ENDPOINT = process.env.NODE_ENV !== "production" ? "http://localhost:5000" : ""; 

class Login extends Component {

render() {
    return (
      <div class="contain">
      <div class="container">
          <br />
          <div class="panel-body">
          <h2>Successfully logged in! </h2>
          </div>
          </div>
          </div>
        
    );
  }
}


export default Login;




// render() {
//     return (
// const Login = ({ login }) => {
//   return (
//     <form method="POST" className="header-form" onSubmit={login}>
    //   <input
    //     type="text"
    //     name="username"
    //     placeholder="Pick a display name"
    //     maxLength="20"
    //     required
    //   />
//       <button>Signup!</button>
//     </form>
//   )
// }
//     )};
