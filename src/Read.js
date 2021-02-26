import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

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
          id: this.props.match.params.id,
        };
      }
      onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }
      
      componentDidMount() {
        
        var id = this.state.id
        this.commentApi();
          fetch('/api/readpost/'+ id)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                key: result.id,
                post: result,
                upVotes: result.upVotes,
                isLoading: false
              }); //console.log(result.comment);
            },
            (error) => {
              this.setState({
                error
              });
            }
          )
         }
  
        commentApi = async () => {
        var id = this.state.id

        await fetch('/Read/' + id + '/' + id)
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
            });
         };
      

      deleteSubmit = async e => {
        var id = this.state.id

        e.preventDefault();
        const response = await fetch('/api/delete/' + id, { 
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }).catch((error)=>{
            console.error("Error deleting", error);
    });
    }
  
    render() {
      return (
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
            <br/>
            <h3><Link to="/">HOME </Link></h3>
            </div>
            <br />
            <div class="panel-body">
              <dl>
                <br />
                <table class="table table-stripe">
                <dt>Comments:</dt>
                <tbody>
                 {this.state.posts.map(post =>
                  <tr>
                    <td>{post.comment}</td>
                  </tr>
                )} 
              </tbody>
              </table>
                <br/>
              </dl>
            <form onSubmit={this.deleteSubmit}>
            <br/>
            <button type="submit" class="btn btn-danger">Delete</button>
            </form>
            </div>
          </div>
        </div>
      );
    }
  }
   
  export default Read;