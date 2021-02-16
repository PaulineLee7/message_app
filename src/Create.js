import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';


class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      post: '',
      responseToPost: '',
      title: '',
      description: '',
      id: '',
      comment: '',
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

    handleSubmit = async e => {
      e.preventDefault();

      const response = await fetch('/Create', { 
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
  const { title, comment } = this.state;
  return (
    <div class="container">
      <div class="panel panel-default">
        <div class="panel-heading">
        </div>
        <div class="panel-body">
          <br />
       
            <h4><Link to="/" >Home</Link></h4>
            <br />
            <h3>ADD POST</h3>
          
            <form onSubmit={this.handleSubmit}>
            <br />
            <div class="form-group">
              <label for="description">Post:</label>
              <textArea class="form-control" name="title"  value={this.state.post} onChange={e => this.setState({ post: e.target.value })}
              placeholder="" cols="80" rows="3">{title}</textArea>
            </div>
            <button type="submit" class="btn btn-success">Submit</button>
          </form>
          <p>{this.state.responseToPost}</p>
          
        </div>
      </div>
    </div>
      
    
  );
}
}

export default Create;