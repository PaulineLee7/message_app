import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';
const LOCAL_ENDPOINT = process.env.NODE_ENV !== "production" ? "http://localhost:5000" : ""; 


class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      post: '',
      responseToPost: '',
      title: '',
      comment: '',
      message: '',
    };
    
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
    //console.log(body)
    };

    // const { title } = this.state;
    // let {responseToPost}=this.state;
    
    renderPost = () => {
     // console.log(this.state.responseToPost, this.state.responseToPost=="Service Unavailable");
      if (this.props.user.firstName =="tecace"){
        return <div class="modal fade show" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Nice!</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          <div class="modal-body">
            Successfully created a new post.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
          </div>
        </div>
      </div>
      // }else if(this.state.responseToPost=="Service Unavailable"){
      //   return <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      //     <div class="modal-dialog" role="document">
      //       <div class="modal-content">
      //         <div class="modal-header">
      //           <h5 class="modal-title" id="exampleModalLabel">Not Logged in</h5>
      //           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      //             <span aria-hidden="true">&times;</span>
      //           </button>
      //         </div>
      //       <div class="modal-body">
      //         Please Log in to create a post.
      //       </div>
      //       <div class="modal-footer">
      //         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      //       </div>
      //       </div>
      //     </div>
      //   </div>
        
      // }
      }}

render() {
 
  const { title } = this.state;
  return (
 
    <div class="contain">    
    <div class="container">
    {this.renderPost()}
        <div class="panel-body">
          <br />
          <br />
            <h3>ADD POST</h3>
              <form onSubmit={this.handleSubmit}>
              <br />
                <div class="form-group">
                  <textArea class="form-control" name="title"  value={this.state.post} onChange={e => this.setState({ post: e.target.value })}
                  placeholder="" cols="80" rows="3">{title}</textArea>
                </div>
                <button type="submit" class="btn btn-success" data-show="true" data-toggle="modal" data-target="#exampleModal">Submit</button>
               </form>
        </div>
      </div>
    </div>
  );
}
}

export default Create;