import React,{ Component, PropTypes } from 'react';
import { Card, CardImg, CardText, CardBody,Button, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import '../css/commentForm.css';
import '../css/newsdetail.css';
import "../css/commentsComponent.css";
import Backdrop from '../components/UI/Backdrop'
import Spinner from '../components/UI/Spinner'
import axios from '../axiosNew'
import {Redirect, Link} from 'react-router-dom'
import moment from 'moment';

class Comments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comments : this.props.comments,
            newsId : this.props.newsId,
            currentComment : "",
            currentCommentAuthor : null,
            isLoggedin : false,
        }

        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){ 
        console.log("request send");
            axios.get("http://localhost:3000/dashboard",{
              headers : {
                "auth-token": localStorage.getItem("token")
              }
            })
            .then( (res)=>{

                if (res.data.fullName !== null)
                {
                    this.setState({
                        isLoggedin : true,
                    })
                }


                let link = null;
                let url = window.location.href;
                let newsId = window.location.href.slice(url.lastIndexOf('/')+1,url.length);


               
                if(this.props.tempNews){
                    link = '/postComment/tempNews/'+newsId;
                    //link = '/postComment/tempNews/'+this.props.newsId;
                }
                else{
                    link = '/postComment/news/'+newsId;
                    //link = '/postComment/news/'+this.props.newsId;
                }
                console.log(link)
                
                    
                axios.get(link)
                .then((res) => {
                    console.log("After GET");
                    console.log(res.data);
                    this.setState({
                        comments : res.data,
                    })
                    
                })
                .catch((err) => {
                    console.log(err);
                })


          console.log("hereeeeeeeeeeeeeeeeee") 
          //console.log(this.extractNewsId());

        let url2 = window.location.href;
        let id = window.location.href.slice(url.lastIndexOf('/')+1,url2.length);

        console.log(id)
          
        this.setState({
            comments : this.props.comments,  
            newsId : id,
            currentCommentAuthor:res.data.fullName+" "+res.data.lastName,
        })

          //console.log(this.state.newsId)
            //console.log(this.state.currentCommentAuthor);
            //console.log(res.data.fullName," ",res.data.lastName);
            //console.log(this.props.tempNews);
            //console.log("After mount, NEWSID--");
            //console.log(this.state.newsId);  
            //console.log(this.state.comments);  
            
        }).catch(()=>{
          console.log("Not logged in");
          this.setState({
              isLoggedin : false,
          })
        })

        
      }

//     extractNewsId = () =>{
//         let url = window.location.href;
//         let newsId = window.location.href.slice(url.lastIndexOf('/')+1,url.length);
//         console.log(newsId);
//         return newsId
//   }

    myChangeHandler = (event) => {
        let fn = event.target.name;
        let fv = event.target.value;
  
        //console.log("Testing");
        //console.log(fn,":",fv);
        
        
        this.setState({
          [fn]: fv,
        });
      }

    handleSubmit = async (e) => {
    const newComment = {
        commentBody : this.state.currentComment,
        commentAuthor : this.state.currentCommentAuthor,
    }

    let link = null;

    if(this.props.tempNews)
        link = '/postComment/tempNews/'+this.props.newsId;
    else
        link = '/postComment/news/'+this.props.newsId;    
    await axios.post(link, newComment)
    .then((res) => {
        //console.log("After post");
        //console.log(res.data);
        this.setState({
            comments : res.data.comments,
        })
    })
    .catch((err) => {
        console.log(err);
    })
    }

      

    render() {
        //console.log(this.state);
        //console.log(this.props);
        //console.log(this.props.newsId);
        //console.log(this.props.comments);

        const RenderComment = (c) => {
            //console.log(c.c.commentBody);
            return(
                <div className="row">
                    
                    <div className="col-md-8">
                    <hr color="black"/>
                            <h5>{c.c.commentBody}</h5>
                            <hr color="black"/>
                    </div> 

                    <div className="col-md-4">
                    <hr color="black"/>
                             <h6>--By {c.c.commentAuthor}</h6>
                            <hr color="black"/>
                    </div> 
                    <hr color="black"/>
                </div>
            )
        }

        
        
        let allComments = null;

        allComments = this.state.comments.map((c) => {
            return (
                <div>
                    <RenderComment c={c} />
                </div>
            );
        });



        const commentForm = (
            <div className="row">
                <form id="headers">
                    <h3 className="col-md-8">Submit a comment</h3>
                    <textarea className="col-md-9 textfont" rows="5" name="currentComment" onChange={this.myChangeHandler}></textarea>

                    <Button className="col-md-3 btn-md btn-success postButton"
                            onClick = {this.handleSubmit} > Post </Button>
                </form>
            </div>
        )



        if(this.state.isLoggedin)
        {
            return(
                <div className="container">
                    {commentForm}
                    {allComments}
                </div>
            )
        }
        else {
            return(
                <div className="container">
                    {allComments}
                </div>
            )
        }
    }
}

export default Comments;