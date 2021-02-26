import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
const LOCAL_ENDPOINT = process.env.NODE_ENV !== "production" ? "http://localhost:5000" : ""; 

class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
          post: {},
          key: '',
          response: '',
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
        var id = this.state.id;
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
          console.log(body)
        };
        renderComment = () => {
          if(this.props.user.firstName =="tecace"){
          return <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Nice!</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              <div class="modal-body">
                Comment Posted!
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
              </div>
            </div>
          </div>
        }
        }

    render() {
        return (
          <div class="contain">
  <br/>
  <br/>
        <div class="container">
        {this.renderComment()}
        <h4 class="panel-title">COMMENT</h4>
            <br/>
            <div class="panel panel-default">
              <div class="panel-body">
                <form onSubmit={this.commentSubmit}>
                  <div class="form-group">
                    <textArea type="text" class="form-control" name="description" value={this.state.comment} onChange={e => this.setState({ post: e.target.value })} placeholder="Comment" />
                  </div>
                  <button type="submit" class="btn btn-success"data-toggle="modal" data-target="#exampleModal">Post Comment</button>
                </form>
              </div>
            </div>
          </div>
          </div>
        );
      }
    }


export default Comment;
    