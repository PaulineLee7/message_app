import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      post: '',
      responseToPost: '',
      title: '',
      description:'',
    };
    
  }

    handleSubmit = async e => {
      e.preventDefault();

      const response = await fetch('/Create', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ post: this.state.post, description: this.state.description }),
      }); 
      const body = await response.text();
      this.setState({ responseToPost: body });
      this.props.history.push('/');
    
    };


render() {
 
  const { title, description } = this.state;
  return (
 
    <div class="contain">    
    <div class="container">
        <div class="panel-body">
          <br />
              <form onSubmit={this.handleSubmit}>
              <br />
                <div class="form-group">
                <h5>Title</h5>
                  <textArea class="form-control" required="required" minLength="1" name="title"  value={this.state.post} onChange={e => this.setState({ post: e.target.value })}
                  placeholder="Title" cols="80" rows="1">{title}</textArea>
                </div>
                <div class="form-group">
                <h5>Description</h5>
                  <textArea class="form-control" required="required" minLength="1" name="Description"  value={this.state.description} onChange={e => this.setState({ description: e.target.value })}
                  placeholder="Post" cols="80" rows="3">{description}</textArea>
                </div>
                <button type="submit" class="btn btn-success" >Post</button>
                
               </form>
               
        </div>
        
      </div>
    </div>
  );
}
}

export default Create;