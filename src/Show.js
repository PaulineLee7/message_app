import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import './App.css'

const LOCAL_ENDPOINT = process.env.NODE_ENV !== "production" ? "http://localhost:5000" : ""; 



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
                
                //comment: result.comment,
                isLoading: false
              }); //console.log(result.upVotes);
            },
            (error) => {
              this.setState({
                error
              });
            });
         };
  
        commentApi = async () => {
        var id = this.state.id

        await fetch('/Read/' + id + '/' + id)
        .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                posts: result,
                key: result.id,
                title: result.title,
                comment: result.comment,
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
    //console.log(body)
    }
    
    renderButtons = () =>{
  
      if(this.props.user.firstName == 'tecace'){
      return <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div class="btn-group mr-2" role="group" aria-label="First group">
            <Link to={`/Comment/${this.state.id}`} class="btn btn-outline-primary">Comment</Link>&nbsp;
            <Link to={`/Update/${this.state.id}`} class="btn btn-outline-success">Edit</Link>&nbsp;
         {/* below delete modal */}    
            <div class="modal fade show" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Delete Post</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          <div class="modal-body">
           Post Deleted.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
          </div>
        </div>
      </div>
      {/* above delete */}
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

  renderVotes = () =>{
    if(this.props.user.username  == 'tecace 102'){
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
        
      <div class="container">
          <div class="panel panel-default">
            <br />
            <div class="panel-body">
              <dl>
              
                {/* <form onSubmit={this.voteSubmit}> */}
                
                <h6> {this.state.post.title}</h6> 
                <br/>

                {this.state.post.upVotes}  votes    {this.renderVotes()}
                {/* <button type="submit" class="btn btn-transparent"  data-show="true" data-toggle="modal" data-target="#exampleModal" value={this.state.post.upVotes} onChange={e => this.setState({ post: e.target.value })}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-triangle-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"/>
                </svg>&nbsp;{" "}{this.state.post.upVotes}  votes</button>
                </form> */}
                {/* <form onSubmit={this.downVoteSubmit}>
              
                <button type="submit"  class="btn btn-transparent" value={this.state.post.upVotes} onChange={e => this.setState({ post: e.target.value })}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16" fill="red">
                <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"/>
                </svg>
                </button>
                </form> */}
                <table class="table table-stripe">
                <br/>
                <h7>Comments:</h7>
                <br/>
                <tbody>
                 {this.state.posts.map(post =>
                  <tr>
                  {/* <td><Link to={`/Read/${post.key}`}>{post.comment}</Link></td> */}
                    <td>{post.comment}</td>
                  </tr>
                )} 
              </tbody>
              </table>
                <br/>
                
              </dl>
            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
          <div class="btn-group mr-2" role="group" aria-label="First group">
          {this.renderButtons()}
          
          </div>
            </div>
            </div>
          </div>
        </div>
        </div>
      );
    }
  }
   export default withRouter(Show)
  //export default Show;