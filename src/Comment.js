import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
          post: {},
          key: '',
          response: '',
          post: '',
          title: '',
          comment: '',
          responseToPost: '',
          id: this.props.match.params.id,
        };
      }
      onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }
 
    commentSubmit = async e => {
        var id = this.state.id
          e.preventDefault();
          const response = await fetch('/Comment/' + id, { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: this.state.post }),
          });
          const body = await response.text();
          this.setState({ responseToPost: body });
      
        };
     

    render() {
        return (
          <div class="container">
            <div class="panel panel-default">
              <div class="panel-heading">
              <br/>
              <h3><Link to="/">Postings </Link></h3>
              <br />
              </div>
              <div class="panel-body">
                <form onSubmit={this.commentSubmit}>
                  <div class="form-group">
                    <label for="description">Comment:</label>
                    <textArea type="text" class="form-control" name="description" value={this.state.comment} onChange={e => this.setState({ post: e.target.value })}placeholder="Comment" />
                  </div>
                  <button type="submit" class="btn btn-success">Post Comment</button>
                </form>
              </div>
            </div>
          </div>
        );
      }
    }

export default Comment;
    