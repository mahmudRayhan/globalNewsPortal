import React,{ Component, PropTypes } from 'react';

import '../css/commentForm.css';
import '../css/newsdetail.css';

import axios from '../axiosInstance';
import Backdrop from '../components/UI/Backdrop'
import Spinner from '../components/UI/Spinner'
import classes from '../css/SingleNews.module.css'


class SingleNews extends Component{
    state={
        data:{},
        loading:true
    }
    
     componentDidMount(){
        let url = window.location.href;
        let newsId = window.location.href.slice(url.lastIndexOf('/')+1,url.length)
        axios.get('/tempNews.json')
                .then(res=>{
                    let txt=[];
                    for(let x in res.data){
                        txt.push(x);
                    }

                    txt.map((x)=>{
                        if(res.data[x].newsId == newsId){
                            this.setState({data:res.data[x],loading:false});
                            console.log(res.data[x].imglink);
                        }
                    })
                   
                }).catch(err=>{
                    console.log(err);
                })
     }
     render(){
        let code=(
            <div  >
                <Backdrop show={true}/>
                <Spinner show={true}/>
            </div>);
        if(!this.state.loading){
            code=(
                <div>
                    <h1>{this.state.data.header}</h1>
                    <img src={this.state.data.imglink[1]} style={{width:'80%'}}/>
                    <hr/>
                    <div className={classes.authorDetails}>
                        <h5>Written by {this.state.data.author}</h5>
                        <img src='../assets/images/mahmudRayhan.jpg' style={{
                            'border-radius':'10px',
                            margin:'5px'
                        }}/>
                        <h6>{this.state.data.date}</h6>
                    </div>
                    <div>
                        <p className={classes.newsContainer}>
                        {this.state.data.newstext}
                        </p>  
                    </div>
                    <div className={classes.btnClass}>
                      <button className={classes.acceptBtn}>Accept</button>
                      <button className={classes.rejectBtn}>Reject</button>
                      <button className={classes.editBtn}>Suggestions for corection</button>      
                    </div>
                </div>
                

            );
        }
         return(
             <div>
                 {code}
             </div>
         );
     }
 }
 export default SingleNews;