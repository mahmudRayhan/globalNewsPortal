import React, { Component,useState } from 'react';
import { Button, CardBody, Card, Nav, NavItem, CardText, CardTitle, CardSubtitle,  } from 'reactstrap';
import {  NavLink } from 'react-router-dom';         
import Header from "../components/HeaderComponent"
import axios from '../axiosNew' 
import Backdrop from '../components/UI/Backdrop'
import Spinner from '../components/UI/Spinner'
import classes from "../css/poll.module.css"
import PieChart from '../components/pieChart';
import RenderNavbar from '../components/UI/NavBarComponent';

const PollCard = ({data,func,isVoted})=>{
    console.log("Data:",typeof(data.date.slice(0,10)));
    const [flag,setFlag] = useState(isVoted);
    
    return(
        <div className="card-columns d-flex" style={{width:"100%",margin:"20px 20px"}}>
        <Card body className="text-center"  style={{ 
            backgroundColor: '#333', borderColor: '#333',margin:"20px 20px",
            borderRadius:"10px"
            }}>
            <CardBody>
                {/* <CardTitle tag="h1"style={{color:"steelblue",display:"inline"}}>Poll</CardTitle> */}
                <CardSubtitle className="text-right" style={{color:"white"}}>{data.date.slice(0,10)}</CardSubtitle>
                <CardSubtitle tag="h4" className="lg-4" style={{"padding-bottom": "20px",color:"wheat"}}>
                    {data.title}</CardSubtitle>

                {
                    data.options.map((option,i)=>{
                        return(
                            <Button color="secondary" style={{marginTop:"5px",marginRight:"5px"}} onClick={()=>{data.votes[i] = data.votes[i]+1;func(data);setFlag(true);}} hidden={flag}>{option}</Button>
                        )
                    })
                }
               
                {
                    data.options.map((option,i)=>{
                        console.log(option);
                        return(
                            <CardText hidden={!flag} className={classes.pollResult}>{option} : {data.votes[i]}</CardText>
                        )
                    })
                }
                <div hidden={!flag}>
                    <PieChart height={50} width={50} options={data.options} value = {data.votes}/>
                </div>
                
                
            </CardBody>
        </Card>
        <div >
            
        </div>
        
    </div>
    );
}
class Poll extends Component{
    state={
        loading:true,
        pollData:null,
        userData:null
    }
    componentDidMount(){
        
        axios.get("/dashboard",{
            headers : {
              "auth-token": localStorage.getItem("token")
            }
          })
          .then( (profile)=>{
              
            if(profile.data){
                this.setState((prevState)=>{
                    return{userData:profile.data}})
                axios.get('/poll',{
                    params:{
                        userID : profile.data.id
                    }
                })
                    .then(res=>{
                        
                        this.setState((prevState)=>{
                            return{pollData:res.data,loading:false}
                        })
                        
                    }).catch(err=>{
                        console.log(err);
                    })
            }
            
        }).catch(err=>{
            this.setState((prevState)=>{
                return{loading:false}
            })   
        })
    }

    btnHandler=(object)=>{
        console.log(object._id,object.votes);
        axios.post('/poll',{
            id:object._id,
            votes:object.votes,
            userID:this.state.userData.id
        }).then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
    render(){
        let titleCode = null; 
        let listCode=(
            <div className={classes.Spinner} >
                <Backdrop show={true}/>
                <Spinner show={true}/>
            </div>);
        if(!this.state.loading){
            if(this.state.userData){
                titleCode=(
                    <div>
                        <hr style={{height:"2px",backgroundColor:"steelblue",width:"90%",textAlign:"justify"}}/>
                        <h2 style={{textAlign:"center",color:"turquoise",fontWeight:"bold"}}>Active Poll</h2>
                        <hr style={{height:"2px",backgroundColor:"black",width:"75%",textAlign:"justify"}}/>
                    </div>
                )
                listCode = this.state.pollData.map((poll) => {
                    let flag = false
                    if(poll.voterID.find((id)=>id === this.state.userData.id) !== undefined ){
                        flag = true
                    }
                    return (
                        <PollCard data={poll} func={this.btnHandler} isVoted={flag}/>
                    );
                });
        }
            else{
                listCode = (
                    <p>
                        <h2>Please Log In to vote </h2>
                    </p>
                )
            }
        }
        
        return(
            <div>
                <RenderNavbar/>
                {titleCode}
                {listCode}
                {/* <h2 style={{textAlign:"center",color:"turquoise",fontWeight:"bold"}}>Special Poll</h2>
                <hr style={{height:"2px",backgroundColor:"black",width:"75%",textAlign:"justify"}}/>
                <div style={{marginTop:"20px"}}>

                </div> */}
            </div>
        );
    }
}
export default Poll;