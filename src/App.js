import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';
import './App.css'
// import ReactGA from 'react-ga';
// const TRACKING_ID = ""; // YOUR_OWN_TRACKING_ID
// ReactGA.initialize(TRACKING_ID);

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
     <div class= "card">

                 {this.state.posts.map(post =>
                  <div class= "card">
                  <div class="card-header"><Link to={`/Show/${post.key}`} style={{ color: 'black', textDecoration:'none', }} class="font-weight-bold">{post.title}</Link></div>
                  <div class="card-body">
                  {post.description}
                  </div>
                  </div>
                  
                )} 
                <div class="card-footer"> </div>
    </div>
    );
  }
}

export default App;