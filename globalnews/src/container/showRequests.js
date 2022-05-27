import React, { Component } from 'react';
import axios from '../axiosNew';
import classes from '../css/ShowPendingReports.module.css'
import { Media } from 'reactstrap';
import {Link} from 'react-router-dom';
import '../css/lists.css';
import '../css/home.css';
import Backdrop from '../components/UI/Backdrop'
import Spinner from '../components/UI/Spinner'
import { CardImg,Button } from 'reactstrap';
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
			      <div className="col-xs-12 ml-sm-5 mediabody col-sm-5" style={{marginTop:"7%"}}>
			      	<Media body className="align-self-center">
			        <Media className="stitle" heading >
			          {news.title}
			        </Media>
			        
			      </Media>
			      </div>
			  </div>
          </Link>   
    );
}
  

class showRequests extends Component{
    state={
        data:[],
        mainnews:[],
        sidenews:[],
        topnews:[],
        userData:{},
        loading:true,
        currentList:"top"
    }
    
    componentDidMount(){
        axios.get("/dashboard",{
            headers : {
              "auth-token": localStorage.getItem("token")
            }
          })
          .then( (profile)=>{
              console.log(profile.data.userDesk);
              if(profile.data.userRole === 'editor'){
                this.setState((prevState)=>{
                    return{userData:profile.data}})
                console.log(this.state.userData);
                axios.get('/requests').then(res=>{
                    console.log(res.data);
                    this.setState((prevState)=>{
                        return{
                            mainnews:res.data.mainnews,
                            sidenews:res.data.sidenews,
                            topnews:res.data.topnews,
                            loading:false}})

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
    
    btnHandler = (value)=>{
        console.log(value)
        this.setState({currentList:value})

    }
    
    render(){
    
        const mainList = this.state.mainnews.map((news) => {
            return (

                    <div className="col-12 "  key={news._id}>
                        <RenderListsItem news={news}  />
                    </div>
                
            );
        });
        const topList = this.state.topnews.map((news) => {
            
            return (
                <div className="col-12 "  key={news._id}>
                    <RenderListsItem news={news}  />
                </div>  
            );
        });
        const sideList = this.state.sidenews.map((news) => {
            return (
                    <div className="col-12 "  key={news._id}>
                        <RenderListsItem news={news}  />
                    </div>
            );
        });
        let list =null;
        if(this.state.currentList === "main"){
            list = (
                <div>
                <div className='container' style={{marginBottom:'8%'}}>\
                <hr color='black'/>
                <h1 style={{color:'steelblue'}}>News For Main Section</h1>
                
                </div>
                {mainList}
            </div>
            )
        }else if(this.state.currentList === "top"){
            list = (
                <div>
                <div className='container' style={{marginBottom:'8%'}}>
                    <hr color='black'/>
                    <h1 style={{color:'steelblue'}}>News For Top Section</h1>
                    
                </div>
                {topList}
                </div>
            )
            
        }else if(this.state.currentList === "side"){
            list = (
                <div>
                    <div className='container' style={{marginBottom:'8%'}}>
                    <hr color='black'/>
                    <h1 style={{color:'steelblue'}}>News For Side Section</h1>
                    
                    </div>
                    {sideList}
                </div>
            )
        }
        
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
                    <h3 >News Placement Requests</h3>
                    <hr/>
                </div>
            </div>
            <div className="row">
              <Button size="lg" color={this.state.currentList ==="main"? "warning" :"primary"} onClick={(e)=>this.btnHandler('main')}>Main</Button>
              <Button size="lg" color={this.state.currentList ==="top"? "warning" :"primary"} onClick={(e)=>this.btnHandler('top')}>Top</Button>
              <Button size="lg" color={this.state.currentList ==="side"? "warning" :"primary"} onClick={(e)=>this.btnHandler('side')}>Sidebar</Button>
            </div>
            <div className="row">
                
            {list}
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
export default showRequests;