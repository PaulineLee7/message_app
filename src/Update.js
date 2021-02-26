import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';
const LOCAL_ENDPOINT = process.env.NODE_ENV !== "production" ? "http://localhost:5000" : ""; 


class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      key: '',
      response: '',
      responseToPost: '',
      id: this.props.match.params.id,
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  
  updateSubmit = async e => {
    var id = this.state.id
      e.preventDefault();
      const response = await fetch('/Update/' + id, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post: this.state.post }),
      });
      const body = await response.text();
      this.setState({ responseToPost: body });
  
    };
 
    renderUpdate = () => {
      if(this.props.user.firstName =="tecace"){
      return <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Success!</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          <div class="modal-body">
            Post Updated!
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
  <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <br />
            <h4 class="panel-title">
              EDIT POST
            </h4>
            <br/>
          </div>
          <div class="panel-body">
          {this.renderUpdate()}
            <form onSubmit={this.updateSubmit}>
              <div class="form-group">
                <textArea type="text" class="form-control" name="description" value={this.state.title} onChange={e => this.setState({ post: e.target.value })} 
                placeholder="Edit" />
              </div>
              <button type="submit" class="btn btn-success" data-show="true" data-toggle="modal" data-target="#exampleModal">Edit</button>
            </form>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
  export default Update;
