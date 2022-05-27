import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import '../css/lists.css';
import Header from './HeaderComponent';
import axiosNew from '../axiosNew'
import { render } from '@testing-library/react';
import Backdrop from '../components/UI/Backdrop'
import Spinner from '../components/UI/Spinner'
import RenderNavbar from './UI/NavBarComponent';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'


  function RenderListsItem ({news, onClick}) {
    console.log(news._id);
      return (

          <Link  to={'/news/'+news._id}>
              <div>
                <Media className="row">
                    <div className="col-5">
                        <CardImg top  style={{width:"80%",height:"100%"}} src={process.env.PUBLIC_URL + '/assets/writeNews/'+news.headerImage} alt={news.title} />
                    </div>
                    
                    <div className="col-7">
                      <Media body className="ml-10">
                      <Media heading>{news.title}</Media>
                      {/* <p className="newdescription">{news.body}</p> */}
                      </Media>
                    </div>
                </Media>
              </div>
            
          <div class="afterItem">
              
            </div>
          </Link>
        
        
      );
  }

  class Lists extends Component {

    state={
      news:null,
      loading:true,
      isLoggedin : false,
      userRole : '',
      userDesk : '',
    }

    componentDidMount(){
      axiosNew.get("http://localhost:3000/dashboard",{
          headers : {
            "auth-token": localStorage.getItem("token")
          }
        })
        .then( (res)=>{
            console.log("NewsList Userdata", res.data);
            if (res.data.fullName !== null)
            {
                this.setState({
                    isLoggedin : true,
                    userRole:res.data.userRole,
                    userDesk:res.data.userDesk,
                })
            }
        }).catch(()=>{
          console.log("Not logged in");
          this.setState({
              isLoggedin : false,
          })
        })


      axiosNew.get('/category',{
        params:{
          category:this.props.cat 
        }
      }).then(res=>{
        console.log(res.data);
        this.setState((prevState,props)=>{
          return{news:res.data,loading:false};
        })
        console.log(this.state.news,this.state.loading);
      }).catch(err=>{
        console.log(err);
      })
    }

    componentWillReceiveProps(nextProps){
      //console.log(nextProps.cat);
      axiosNew.get('/category',{
        params:{
          category:nextProps.cat 
        }
      }).then(res=>{
        console.log(res.data);
        this.setState((prevState,props)=>{
          return{news:res.data,loading:false};
        })
        console.log(this.state.news,this.state.loading);
      }).catch(err=>{
        console.log(err);
      })
    }

    confirmDialog = (id) => {
      let newsid = id;
      console.log("Newsid", id);

      confirmAlert({
        
        message: 'Are you sure you want to delete?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.onDelete(id)
          },
          {
            label: 'No',
            onClick: () => null
          }
        ]
      })
    }

    onDelete = (id) => {

      axiosNew.delete(`http://localhost:3000/news/${id}`)
      .then( res => {
        window.location.reload()
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    }


    render(){
      let lists = null;
      let listCode=(
        <div className="Spinner" >
            <Backdrop show={true}/>
            <Spinner show={true}/>
        </div>);

      if(!this.state.loading){
        lists = this.state.news.map((news) => {
          return (
              <div className="container">
                  <div className="row">
                    <div className="col-9"  key={news._id}>
                      <RenderListsItem news={news} />
                    </div>
                    <div className="col-2 justify-content-center" hidden={this.state.isLoggedin && (this.state.userRole === "sub-editor" && this.state.userDesk === this.props.cat) ? false : true }>
                      <Button color="danger" onClick={() => this.confirmDialog(news._id)} >Delete </Button>
                    </div>
                  </div>
              </div>
          );
      });
      
        listCode=(
            <div className="container">
              <Breadcrumb>
                  <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{this.props.cat}</BreadcrumbItem>
              </Breadcrumb>
                <div className="row">
                    <div className="col-12">
                        <h3>{this.props.cat}</h3>
                        <hr/>
                    </div>
                </div>
                <div>
                    {lists}
                </div>
            </div>
        )
      }
      return(
        <div>
          <RenderNavbar/>
          {listCode}
        </div>
      );
    }
  }



export default Lists;