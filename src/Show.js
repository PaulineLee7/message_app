import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

class Show extends Component {

    constructor(props) {
        super(props);
        this.state = {
          post: {},
          key: '',
          response: '',
          post: '',
          title: '',
          responseToPost: '',
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
          fetch('/api/readpost/'+ id)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                key: result.id,
                post: result,
                comment: result.comment,
                isLoading: false
              });
            },
            (error) => {
              this.setState({
                error
              });
            }
          )
         }
      

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
                <dt>Post:</dt>
                <dd>{this.state.post.title}</dd>
                <br />
                <dt>Comments:</dt>
                <dd>{this.state.post.comment}</dd>
                <br/>
              </dl>
            
            <Link to={`/Comment/${this.state.id}`} class="btn btn-success">Comment</Link>&nbsp;
            <Link to={`/Update/${this.state.id}`} class="btn btn-success">Edit</Link>&nbsp;
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
   export default withRouter(Show)
  //export default Show;