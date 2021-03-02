import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import './App.css'


class Show extends Component {

    constructor(props) {
        super(props);
        this.state = {
          post: {},
          key: '',
          response: '',
          title: '',
          responseToPost: '',
          upVotes: '',
          posts: [],
          user: '',
          creator: '',
          comment: '',
          description:'',
          id: this.props.match.params.id,
          
        };
      }
      
      componentDidMount() {
        
        var id = this.state.id
        this.commentApi();
          fetch('/api/readpost/'+ id)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                key: result.id,
                post: result,
                upVotes: result.upVotes,
                description: result.description,
                isLoading: false
              }); console.log(result)
            },
            (error) => {
              this.setState({
                error
              });
            });
         };
  
        commentApi = async () => {
        var id = this.state.id

        await fetch('/Read/' + id)
        .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                posts: result,
                key: result.id,
                title: result.title,
                comment: result.comment,
                creator: result.creator,
                isLoading: false
              }); 
            },
            (error) => {
              this.setState({
                error
              });
            }
          )
         }
      
    voteSubmit = async e => {
      var id = this.state.id
      e.preventDefault();
      const response = await fetch('/Vote/' + id, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },

      }).catch((error)=>{
        console.error("Error voting", error);
      });
      this.props.history.go();
    };
    // downVoteSubmit = async e => {
    //   var id = this.state.id
    //   e.preventDefault();
    //   const response = await fetch('/Vote/' + id, { 
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },

    //   }).catch((error)=>{
    //     console.error("Error voting", error);
    //   });
  
    // };

      deleteSubmit = async e => {
        var id = this.state.id
        e.preventDefault();
        const response = await fetch('/api/delete/' + id, { 
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ post: this.state.post }),
          
        }).catch((error)=>{
            console.error("Error deleting", error);
    }); 
    const body = await response.text();
    this.setState({ responseToPost: body });
    this.props.history.goBack();
    }

  //   renderNav = () => {
  
  //     if(this.props.user.user && this.props.user.user == this.state.post.creator){
  //     return <div class="card-body"> {this.state.posts.map(post =>
        
  //       <ul class="nav-item dropdown">
  //       <a class="nav-link dropdown-toggle" color='black'data-toggle="dropdown" href="" role="button" aria-haspopup="true" aria-expanded="false"></a>
  //       <div class="dropdown-menu">
  //       <a class="dropdown-item" href=""><Link to={`/Read/${this.state.id}/${post.key}`}>Delete</Link></a>
  //       <a class="dropdown-item" href=""><Link to={`/Edit/${this.state.id}/${post.key}`}>Edit</Link></a>

  //       </div>
  //       </ul>
        
  //     )}              
  //   </div>
  
  //   }
  // }
  // Dropdown for edit/delete comments
  renderNav = () => {
   return(this.state.posts.map((post) => {
   
    if (this.props.user.user && this.props.user.user==post.creator) {
      return <ul class="nav-item dropdown">
      <div class="card-body">{post.comment} </div>
      <a class="nav-link dropdown-toggle" color='black'data-toggle="dropdown" href="" role="button" aria-haspopup="true" aria-expanded="false"></a>
      <div class="dropdown-menu">
      <a class="dropdown-item" href=""><Link to={`/Read/${this.state.id}/${post.key}`}>Delete</Link></a>
      <a class="dropdown-item" href=""><Link to={`/Edit/${this.state.id}/${post.key}`}>Edit</Link></a>
     </div>
      </ul>
      
      }else{
        return <div class="card" >
        <div class="card-body">{post.comment} </div>
        </div>
      }
  })
   )
  }

  // renderNav = () => {
  //   let that = this;
  //   this.state.posts.map(function(post) {
    
  //   if (that.props.user.user && that.props.user.user == post.creator) {
  //      return <tbody> 
  //      <td>
  //      <ul class="nav-item dropdown">
  //      <a class="nav-link dropdown-toggle" color='black'data-toggle="dropdown" href="" role="button" aria-haspopup="true" aria-expanded="false"></a>
  //      <div class="dropdown-menu">
  //      <a class="dropdown-item" href=""><Link to={`/Read/${this.state.id}/${post.key}`}>Delete</Link></a>
  //      <a class="dropdown-item" href=""><Link to={`/Edit/${this.state.id}/${post.key}`}>Edit</Link></a>
  //     </div>
  //      </ul>
  //      </td>       
  //   </tbody>
  //      }
  //   });
  // }
    renderButtons = () =>{
  
      // if(this.props.user.firstName == 'tecace'){
        if(this.props.user.user && this.props.user.user == this.state.post.creator){
      return <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div class="btn-group mr-2" role="group" aria-label="First group">
            <Link to={`/Update/${this.state.id}`} class="btn btn-outline-success">Edit</Link>&nbsp; 
            <form onSubmit={this.deleteSubmit}>
            <button type="submit" class="btn btn-transparent" data-show="true" data-toggle="modal" data-target="#exampleModal" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
            </button>
            </form>           
            </div>
            </div>
    }
  }

  renderComment = () => {
    if(this.props.user.user){
      return <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
      <div class="btn-group mr-2" role="group" aria-label="First group">
      <Link to={`/Comment/${this.state.id}`} class="btn btn-outline-primary">Comment</Link>&nbsp;
      </div>
      </div>
    }

  }

  renderVotes = () =>{
    if(this.props.user.user){
      return <form onSubmit={this.voteSubmit}>
        <button type="submit" class="btn btn-transparent" value={this.state.post.upVotes} onChange={e => this.setState({ post: e.target.value })}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-triangle-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"/>
            </svg></button>
            </form>
    
      }
    }
  

    render() {

   //   let {responseToPost}=this.state;
     
      return (
    
        
       <div class="contain">
          
            <div class="card">
            
                {/* <form onSubmit={this.voteSubmit}> */}
                <div class="card-header"> <div class="font-weight-bold"> {this.state.post.title}</div></div>

                <div class="card-body">{this.state.post.description}
                 {this.renderVotes()} {this.state.post.upVotes}  upvotes</div>
              
                <div class="card-header">Comments </div>
                {this.renderNav()}
                 {/* {this.state.posts.map(post =>
                  <div class="card" >
                  
                  <div class="card-body">{post.comment} 
                  {post.creator}</div>
                  </div>
                )}               */}
    
               
            </div>
      <br/>
            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div class="btn-group mr-2" role="group" padding="5px" aria-label="First group">
          {this.renderComment()} {this.renderButtons()}
            </div>
            
           </div>
         </div>
     
      );
    }
  }
   export default withRouter(Show)
  //export default Show;

