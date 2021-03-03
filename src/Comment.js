import React, { Component } from 'react';

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
          this.props.history.goBack();

        };

    render() {
        return (
          <div class="contain">
  <br/>
  
        <div class="container">
        
            <br/>
            <div class="panel panel-default">
              <div class="panel-body">
                <form onSubmit={this.commentSubmit}>
                  <div class="form-group">
                  <h5>Comment</h5>
                  <br/>
                    <textArea type="text" class="form-control" required="required" minLength="1" name="description" value={this.state.comment} onChange={e => this.setState({ post: e.target.value })} placeholder="Comment" />
                  </div>
                  <button type="submit" class="btn btn-primary">Post Comment</button>
                </form>
              </div>
            </div>
          </div>
          </div>
        );
      }
    }


export default Comment;
    