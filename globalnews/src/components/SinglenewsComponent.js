
import React,{ Component, PropTypes } from 'react';
import { Card, CardImg, CardText, CardBody,Button, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import '../css/commentForm.css';
import '../css/newsdetail.css';
import '../css/writenews.css';
import Backdrop from '../components/UI/Backdrop';
import Comments from './commentsComponent';
import Spinner from '../components/UI/Spinner';
import axios from '../axiosNew';
import {Redirect, Link} from 'react-router-dom';
import qs from 'qs';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { confirmAlert } from 'react-confirm-alert'; 
import RenderNavbar from './UI/NavBarComponent';
import RenderNewsSection from './RenderNewsSection'


function RenderNews({news}) {
 
      if (news != null){
        return(
          <div>
            <Card>
                <CardImg style={{height:"700px", width: "1100px", alignSelf:'center'}} className="heading"  top  src={process.env.PUBLIC_URL + '/assets/writeNews/'+news.headerImage} alt={news.title} />
                <CardBody>
                  {/*<CardTitle>{news.name}</CardTitle>*/}
                  <CardText>
                      <div>
                          <span>
                             <img align="left" className="authorImage" src={process.env.PUBLIC_URL + '/assets/uploads/'+news.authorImage} alt="Avatar"/>
                          </span>
                        
                        <div className="authorInfo">
                            {news.authorName}<br/>
                            {news.date}
                        </div>
                        
                      </div>

                      <br/>
                      <div className="wordwrap" 
                            dangerouslySetInnerHTML={{ __html: news.body }}>
                      </div>
                    </CardText>
                </CardBody>
            </Card>
          </div>
        );
      }else{
        return(
          <div></div>
        );
      }
          
  }

  const extractNewsId = () =>{
        let url = window.location.href;
        let newsId = window.location.href.slice(url.lastIndexOf('/')+1,url.length);
        console.log(newsId);
        return newsId
  }
;
  class  NewsDetail extends Component {
      state={
        data: {
          comments : []
        },
        isLoggedin : false,
        newsId : "",
        loading:true,
        redirect:null,
        userData:null,
        comments:null,
        showComments:true,
        tempNews : false,
        news_title:"",
        news_subheader:"",
        news_category:"",
        news_tag:"",
        news_body:"",
        news_id:"",
        recomNews:[]
      }
     

      async componentDidMount(){
          let newsId = extractNewsId();
          if(this.props.tempNews){
            let link = '/temp/'+newsId;
            await axios.get(link)
                  .then(res=>{
                    axios.get("/dashboard",{
                      headers : {
                        "auth-token": localStorage.getItem("token")
                      }
                    })
                    .then( (profile)=>{
                      this.setState({
                        userData:profile.data,
                        data:res.data,
                        loading:false,
                        comments : res.data.comments,
                        newsId : newsId,
                        tempNews : true,
                        news_title : res.data.title,
                        news_subheader : res.data.subheader,
                        news_category : res.data.category,
                        news_tag : res.data.tag,
                        news_body : res.data.body,
                        news_id : res.data._id,
                      })
                      console.log("Data:",this.state.userData,this.state.data)
                      console.log("STATE:",this.state)
                    }).catch((err)=>{
                      console.log(err);
                    })
  
                  }).catch(err=>{
                      console.log(err);
                  })
          }
          
          else{
            axios.get("http://localhost:3000/dashboard",{
              headers : {
                "auth-token": localStorage.getItem("token")
              }
            })
            .then( (res)=>{
              this.setState({
                userName:res.data.fullName,
                userData : res.data,
        
              })
                console.log(this.state.userName);
                console.log(res.data);
                if (res.data.fullName !== null)
                {
                    this.setState({
                        isLoggedin : true,
                    })
                }
            }).catch(()=>{
              console.log("Not logged in");
              this.setState({
                  isLoggedin : false,
              })
            })



            let link = '/news/'+newsId;
            await axios.get(link)
                  .then(res=>{
                    //console.log(res.data)
                      console.log("Received Data--");
                      this.setState((prevState)=>{
                      return{
                        data:res.data,
                        loading:false,
                        comments : res.data.comments,
                        newsId : newsId,
                        tempNews : true,
                        recomNews: res.data.recommendedNews,
                        news_title : res.data.title,
                        news_subheader : res.data.subheader,
                        news_category : res.data.category,
                        news_tag : res.data.tag,
                        news_body : res.data.body,
                        news_id : res.data._id,                   
                      }})
                      console.log("Data:",this.state.userData)
                      console.log("STATE:",this.state)
                  })
          }
      }


      approvalBtnHandler=(event,value)=>{
        console.log('apprpove');
        console.log(value);
        //console.log(this.state.data);
        let news = {...this.state.data}
        if(value !== "category"){
          news['section']=value;
        }
        
        console.log(this.state.userData);
        axios.post('/approve',{
          news:news,
          approvedBy:this.state.userData.id
        }).then(res=>{
          console.log(res.data);
          this.setState({redirect:"/pending"})
        })
      }


      rejectBtnHandler = (event) =>{
        axios.post('/reject',{
          id:this.state.data._id
        }).then(res=>{
          console.log(res.data);
          this.setState({redirect:"/pending"})
        }).catch(err=>{
          console.log(err);
        })
      }


      referBtnHandler = (event) =>{
        axios.post('/refer',{
          id:this.state.data._id
        }).then(res=>{
          console.log(res.data);
          this.setState({redirect:"/pending"})
        }).catch(err=>{
          console.log(err);
        })
      }


      suggestionBtnHandler = (event)=>{
        console.log("Suggest");        
      }


      editBtnHandler = (event)=>{
        console.log("Edit");
        <Redirect
            to={{
            pathname: "/writenews",
          }}
        />
      }

      confirmDialog = (e) => {
        if(this.state.userData.userRole === "sub-editor"){
          confirmAlert({
          
            message: 'In which section you want to place the news?',
            buttons: [
              {
                label: 'Top',
                onClick: (e) => this.approvalBtnHandler(e,'top')
              },
              {
                label: 'Main',
                onClick: (e) => this.approvalBtnHandler(e,'main')
              },
              {
                label: 'Sidebar',
                onClick: (e) => this.approvalBtnHandler(e,'side')
              },
              {
                label: 'Category',
                onClick: (e) => this.approvalBtnHandler(e,'category')
              },
              {
                label: 'Back',
                onClick: () => null
              }
            ]
          })
        }
        else if(this.state.userData.userRole === "editor"){
          confirmAlert({
          
            message: 'In which section you want to place the news?',
            buttons: [
              {
                label: 'Top',
                onClick: (e) => this.placementHandler('top'),
                //disabled:{this.state.data.section.includes("top")}
              },
              {
                label: 'Main',
                onClick: (e) => this.placementHandler('main')
              },
              {
                label: 'Sidebar',
                onClick: (e) => this.placementHandler('side')
              },
              {
                label: 'Category',
                onClick: (e) => this.placementHandler('category')
              },
              {
                label: 'Back',
                onClick: () => null
              }
            ]
          })
        } 
        
      }

      placementHandler = (value)=>{
        console.log(value);
        let news = {...this.state.data}
        if(value === 'confirm'){
          news.section = news.section
        }
        else if(value === "reject"){
          news.section = ""
        }
        else{
          news.section = value
        }
        console.log(news);
        axios.post("/reqapprove",{
          news:news
        }).then(res=>{
          console.log(res);
          this.setState({redirect:"/requests"})
        }).catch(err=>{
          console.log(err);
        })
        
      }



      render(){
        console.log("In SingleNews");
        console.log(this.props.tempNews);
        console.log(this.state.newsId);
        if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
        }
        let code=(
          <div  >
              <Backdrop show={true}/>
              <Spinner show={true}/>
          </div>);
        if(!this.state.loading && this.props.tempNews){
        console.log("In SingleNews Temp cond.");
        console.log(this.props.tempNews);
        console.log(this.state.newsId);
        console.log("State", this.state);

          code = (
            <div className="container">
              
            <div className="row">
                <div className="col-12">
                    <h3>{this.state.data.title}</h3>
                    <hr/>
                </div>
            </div>
  
            <div className="row text-align-center">
                <div  className="col-12">
                    {/* {this.renderNews(selected)} */}
                    <RenderNews news={this.state.data}/>
                </div >
                
               
               <div className="col-12 justify-content-center" hidden={(this.props.tempNews && (this.state.userData.userRole === "sub-editor" && this.state.userData.userDesk === this.state.data.category)) ? false : true }>
                  <Button color="success"id="approve" onClick={this.confirmDialog}>Approve </Button>{' '}
                  <Button color="danger" onClick={this.rejectBtnHandler.bind(this)}>Reject </Button>{' '}

               </div>
               <div className="col-12 justify-content-center" hidden={(this.props.tempNews && (this.state.userData.userRole === "editor" &&  this.state.data.category === "opinion")) ? false : true }>
                  <Button color="success"id="approve" onClick={()=>this.approvalBtnHandler('opinion')}>Approve </Button>{' '}
                  <Button color="danger" onClick={this.rejectBtnHandler.bind(this)}>Reject </Button>{' '}

               </div>
              <div className="row" hidden={this.state.userData.userRole === "editor" && this.state.data.category !== "opinion" ? false : true}>
                <div className="col-12">
                  <hr color='black'/>
                  <Button classname="col-lg-4 col-md-4" size="lg" color="primary" onClick={(e)=>this.placementHandler("confirm")}>Confirm Placement</Button>{'   '}
                  <Button classname="col-lg-4 col-md-4" size="lg" color="danger"  onClick={(e)=>this.placementHandler("reject")}>Reject Placement </Button>{'   '}
                  <Button classname="col-lg-4 col-md-4" size="lg" color="secondary" onClick={this.confirmDialog}>Alternative Placement</Button>
                </div>
              
              </div>
                
          
                <div className="offset-6 col-12" hidden={this.state.userData.id === this.state.data.reporterID ? false : true }>
                  
                    <Link to={{ pathname: '/writenews', state: {
                       n_title : this.state.news_title,
                       n_subheader : this.state.news_subheader,
                       n_category : this.state.news_category,
                       n_tag : this.state.news_tag,
                       n_body : this.state.news_body,
                       n_id : this.state.news_id,
                       edit : true,
                       intempNews : true,
                      } }} 
                    className="btn-lg btn-primary">Edit</Link>
                  
                </div>
  
            </div>
          </div>
          );
        }

        else if(!this.state.loading && this.state.userData !== null){
          console.log("Userdata", this.state);
          code = (
            <div className="container">
              
            <div className="row">
                <div className="col-12">
                    <h3>{this.state.data.title}</h3>
                    <hr/>
                </div>

            </div>
  
            <div className="row">
                <div  className="col-12">
                    {/* {this.renderNews(selected)} */}
                    <RenderNews news={this.state.data}/>
                </div >

                <div className="offset-6 col-12" hidden={this.state.userData.id === this.state.data.reporterID ? false : true }>
                  
                    <Link to={{ pathname: '/writenews', state: {
                       n_title : this.state.news_title,
                       n_subheader : this.state.news_subheader,
                       n_category : this.state.news_category,
                       n_tag : this.state.news_tag,
                       n_body : this.state.news_body,
                       n_id : this.state.news_id,
                       edit : true,
                       intempNews : false,
                      } }} 
                    className="btn-lg btn-primary">Edit</Link>
                  
                </div>
            </div>



            <div style={{marginBottom:'8%'}}>
              <h1 style={{color:'steelblue'}}>News You may Like</h1>
              <hr color='black'/>
            </div>
            <div className='row' style={{marginTop:'2%'}}>
              <div className="col-12">
                <RenderNewsSection news={this.state.recomNews} />
              </div>

             
            </div>

          </div>
          );
        }


        else if(!this.state.loading){
          console.log("Userdata", this.state);
          code = (
            <div className="container">
              
            <div className="row">
                <div className="col-12">
                    <h3>{this.state.data.title}</h3>
                    <hr/>
                </div>

            </div>
  
            <div className="row">
                <div  className="col-12">
                    {/* {this.renderNews(selected)} */}
                    <RenderNews news={this.state.data}/>
                </div >

            </div>



            <div style={{marginBottom:'8%'}}>
              <h1 style={{color:'steelblue'}}>News You may Like</h1>
              <hr color='black'/>
            </div>
            <div className='row' style={{marginTop:'2%'}}>
              <div className="col-12">
                <RenderNewsSection news={this.state.recomNews} />
              </div>

             
            </div>

          </div>
          );
        }
        return (
          <div>
            <RenderNavbar/>
            
              {code}
              <Comments comments={this.state.data.comments} newsId={this.state.newsId} tempNews={this.props.tempNews}/>
          </div>
        );
      }
      
  }

 


export default NewsDetail;