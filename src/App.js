import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './App.css'
const LOCAL_ENDPOINT = process.env.NODE_ENV !== "production" ? "http://localhost:5000" : ""; 
 
class App extends Component {
  constructor(props){
    super(props);
  this.state = {
    post: '',
    title: '',
    key: '',
    comment: '',
    upVotes: '',
    user:'',
    posts: [],
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
            upVotes: result.upVotes,
            isLoading: false
          });
        },
        (error) => {
          this.setState({
            error
          });
        });
     }


  render() {
    return (
     
      <div class="contain">
      <div class="container">
          <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Posts</th>
                </tr>
              </thead>
              <tbody>
                 {this.state.posts.map(post =>
                  <tr>
                    <td><Link to={`/Show/${post.key}`}style={{ color: 'black', textDecoration:'none'}}>{post.title}</Link></td>
                  </tr>
                )} 
              </tbody>
            </table>
        </div>
      </div>
    );
  }
}

export default App;