import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import './App.css'


class Read extends Component {

  constructor(props) {
    super(props);
    this.state = {
      post: {},
      key: '',
      response: '',
      title: '',
      responseToPost: '',
      upVotes: '',
      posts: [],
      user: '',
      creator: '',
      comment: '',
      id: this.props.match.params.id,
    };
  }
      
  componentDidMount() {
        
  var id = this.state.id
  var previd= window.location.pathname.split('/')[3]
  fetch('/ReadComment/' + id +'/'+ previd)
    .then(res => res.json())
    .then(
      (result) => {
          this.setState({
          key: result.id,
          post: result,
          comment: result.comment,
          upVotes: result.upVotes,
          isLoading: false
          }); console.log(result)
        },
            (error) => {
              this.setState({
                error
              });
            });
   };
        

        deleteComment = async e => {
          var id = this.state.id
          var previd= window.location.pathname.split('/')[3]
          e.preventDefault();
          const response = await fetch('/delete/comment/' + id +'/' + previd,{ 
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: this.state.post }),
          }).catch((error)=>{
              console.error("Error deleting", error);
      }); 
      const body = await response.text();
      this.setState({ responseToPost: body });
      this.props.history.goBack();
      }

  

    render() {
      
      return (
        <div class="contain">
        <div class="container">
            
              <br/>
                <div class="panel-heading">
                <h5>Delete Comment?</h5>
                  <br/>
                </div>
                  <div class="card">
                  {this.state.comment}
                  </div>
                  <br/>
                  <form onSubmit={this.deleteComment}>
                  <button type="submit" class="btn btn-danger" >Delete</button>
                  <br/>
                  </form>
            </div>
            </div>
             
      );
    }
  }
 
  export default Read;