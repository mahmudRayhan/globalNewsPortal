import React, { Component } from 'react';
import axios from '../axiosNew';
import classes from '../css/ShowPendingReports.module.css'
import { Media } from 'reactstrap';
import {Link} from 'react-router-dom';
import '../css/lists.css';
import '../css/home.css';
import Backdrop from '../components/UI/Backdrop'
import Spinner from '../components/UI/Spinner'
import { CardImg } from 'reactstrap';
import RenderNavbar from '../components/UI/NavBarComponent';





const RenderListsItem = ({news, onClick}) =>{
    
    
    return (
        
      <Link className="newslinkhome" to={`/temp/${news._id}`}>
              <div className="row justify-content-start topmedia">
			      <div id="pbottom" className="col-xs-12 col-sm-4 topmedia">
                  <div>
                        <CardImg top  src={process.env.PUBLIC_URL + '/assets/writeNews/'+news.headerImage} alt={news.title} />
                    </div>
			      </div>
			      <div className="col-xs-12 ml-sm-5 mediabody col-sm-5">
			      	<Media body className="align-self-center">
			        <Media className="stitle" heading>
			          {news.title}
			        </Media>
			        {/* <p className="newdescription" >{news.body}</p> */}
			      </Media>
			      </div>
			  </div>
          </Link>   
    );
}
  

class ShowPendingReports extends Component{
    state={
        data:[],
        userData:{},
        loading:true
    }
    
    componentDidMount(){
        axios.get("/dashboard",{
            headers : {
              "auth-token": localStorage.getItem("token")
            }
          })
          .then( (profile)=>{
              console.log(profile.data);
              if(profile.data){
                this.setState((prevState)=>{
                    return{userData:profile.data}})
                console.log(this.state.userData);
                axios.get('/tempNews',{
                    params:{
                        userID:this.state.userData.id,
                        userRole:this.state.userData.userRole,
                        userDesk:this.state.userData.userDesk
                    }
                }).then(res=>{
                    console.log(res.data);
                    this.setState((prevState)=>{
                        return{data:res.data,loading:false}})
                    console.log(this.state.data);
                }).catch(err=>{
                    console.log(err);
                })
              }
              else{
                  console.log("User not found");
              }

          }).catch((err)=>{
            console.log(err);
          })           
    }
    
    
    render(){
    
        const lists = this.state.data.map((news) => {
            return (
                <div className="col-12 "  key={news._id}>
                    <RenderListsItem news={news}  />
                </div>
            );
        });
        let listCode=(
        <div className={classes.Spinner} >
            <Backdrop show={true}/>
            <Spinner show={true}/>
        </div>);

        if(!this.state.loading){

        listCode=(
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3 >Pending Reports for Review</h3>
                    <hr/>
                </div>
            </div>
            <div className="row">
                {lists}
            </div>
        </div>);
    }
        return (
            <div>
                <RenderNavbar/>
                {listCode}
            </div>
            
        );
    }
}
export default ShowPendingReports;