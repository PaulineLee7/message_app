import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";


class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      key: '',
      response: '',
      responseToPost: '',
      comment: '',
      id: this.props.match.params.id,
    };
  }

  commentSubmit = async e => {
    var id = this.state.id
    var newid= window.location.pathname.split('/')[3]
      e.preventDefault();
      const response = await fetch('/update/comment/' + id + '/' + newid, { 
        method: 'PUT',
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
        <div class="container">
            
              <br/>
                <div class="panel-heading">
                <h5>Edit Comment</h5>
                  <br/>
                </div>
 
                <form onSubmit={this.commentSubmit}>
              <div class="form-group">
                <textArea type="text" class="form-control" required="required" minLength="1" name="description" value={this.state.post} onChange={e => this.setState({ post: e.target.value })} 
                placeholder="Edit" />
              </div>
              <button type="submit" class="btn btn-primary">Edit</button>
            </form>
  
            </div>
            </div>
    );
  }
}
  export default Edit;
