import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";


class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      key: '',
      response: '',
      responseToPost: '',
      description: '',
      id: this.props.match.params.id,
    };
  }

  updateSubmit = async e => {
    var id = this.state.id
      e.preventDefault();
      const response = await fetch('/Update/' + id, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post: this.state.post, description: this.state.description }),
      });
      const body = await response.text();
      this.setState({ responseToPost: body });
      this.props.history.goBack();

    };
 
  render() {
    return (
  <div class="contain">
  <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          
            <br/>
          </div>
          <div class="panel-body">
            <form onSubmit={this.updateSubmit}>
            <h5>Title</h5>
                  <textArea class="form-control" name="title"  value={this.state.post} onChange={e => this.setState({ post: e.target.value })}
                  placeholder="Title" cols="80" rows="1"></textArea>
                <br/>
                <div class="form-group">
                <h5>Description</h5>
                  <textArea class="form-control" name="Description"  value={this.state.description} onChange={e => this.setState({ description: e.target.value })}
                  placeholder="Post" cols="80" rows="3"></textArea>
                </div>
                <button type="submit" class="btn btn-success" >Edit Post</button>
            </form>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
  export default Update;
