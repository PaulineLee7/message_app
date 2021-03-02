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
    creator: '',
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
            description: result.description,
            creator: result.creator,
            isLoading: false
          });console.log(result)
        },
        (error) => {
          this.setState({
            error
          });
        });
     }


  render() {
    return (
     <div class= "card">
     
   
              {/* <h3 class="card-header">Posts</h3> */}
                 {this.state.posts.map(post =>
                  <div class= "card">
                  <div class="card-header"><Link to={`/Show/${post.key}`}style={{ color: 'black', textDecoration:'none', }}class="font-weight-bold">{post.title}</Link></div>
                  <div class="card-body">
                  {post.description}
                  </div>
                  </div>
                  
                )} 
             
            
            
    </div>
    );
  }
}

export default App;