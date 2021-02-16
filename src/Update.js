import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';


class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      key: '',
      response: '',
      post: '',
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
 
  
  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <br/>
          <h3><Link to="/">Postings </Link></h3>
          <br />
            <h4 class="panel-title">
              EDIT POST
            </h4>
          </div>
          <div class="panel-body">
            <form onSubmit={this.updateSubmit}>
              <div class="form-group">
                <label for="description">Post:</label>
                <textArea type="text" class="form-control" name="description" value={this.state.title} onChange={e => this.setState({ post: e.target.value })} 
                placeholder="Edit" />
              </div>
              <button type="submit" class="btn btn-success">Edit</button>
            </form>
            <p>{this.state.responseToPost}</p>
          </div>
        </div>
      </div>
    );
  }
}
  export default Update;
