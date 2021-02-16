import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './App.css';

 
class App extends Component {
  constructor(props){
    super(props);
  this.state = {
    post: '',
    title: '',
    author: '',
    key: '',
    comment: '',
    posts: []
  };
}

  componentDidMount() {
    fetch('/api/read')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            posts: result,
            key: result.id,
            title: result.title,
            comment: result.comment,
            isLoading: false
          });
        },
        (error) => {
          this.setState({
            error
          });
        })
     }

render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <br/>
            <h3 class="panel-title">
              Message Board
            </h3>
            <br/>
          </div>
        </div>
        <div class="panel-body">
        <h4><Link to="/Create">NEW POST</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Posts</th>
                </tr>
              </thead>
              <tbody>
                 {this.state.posts.map(post =>
                  <tr>
                    <td><Link to={`/Show/${post.key}`}>{post.title}</Link></td>
                  </tr>
                )} 
              </tbody>
              </table>
          </div>
        <br/>
        
      </div>
    );
  }
}

export default App;