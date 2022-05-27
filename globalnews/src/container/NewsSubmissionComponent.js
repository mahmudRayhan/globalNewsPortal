import React,{Component} from 'react';
import classes from '../css/NewsSubmission.module.css';
import axios from '../axiosInstance';
import Spinner from '../components/UI/Spinner';
import moment from 'moment';
import Backdrop from '../components/UI/Backdrop';
import { v4 as uuidv4 } from 'uuid';
import qs from 'qs'
import PreviewNews from '../components/PreviewComponent'
import {Redirect} from 'react-router-dom'



class NewsSubmission extends Component{
    state = {
      data:{
        newsId:'',
        header:"",
        subheader:"",
        imglink:[],
        newstext:"",
        authorId:"",
        author:"",
        authorImage:'',
        category:"",
        status:"",
        date:'',
        referedTo:'',
      },
      userData:{},
      loading:true,
      index:null,
      showPopup:false,
      isEditing:false,
      redirect:null
};
stateData = null;
    componentDidMount(){
      const uId = parseInt(qs.parse(window.location.search, {
        ignoreQueryPrefix: true
      }).id)
      const urlParams = new URLSearchParams(window.location.search);
      const newsId = urlParams.get('newsId');
      axios.get('/userData.json')
            .then(res=>{
              for(let x in res.data){
                  if(res.data[x].userId === uId )
                  {
                    this.setState((prevState,props)=>{
                      return{userData:res.data[x]};
                  })
                  console.log(this.state.userData);
                    
                  }
              }
            }).catch(err=>{
              console.log(err);
            })
      if(newsId){
        
        axios.get('/tempNews.json')
              .then(res=>{
                
                for(let x in res.data){
                  if(res.data[x].newsId === newsId){
                    this.setState((prevState,props)=>{
                      return{isEditing:true};
                    })
                    this.setState((prevState,props)=>{
                      return{data:res.data[x]};
                    })
                }
              }
              console.log(this.state.data);
              this.setState((prevState,props)=>{
                return{loading:false};
              })
              }).catch(err=>{console.log(err);})
      } else {
        this.setState((prevState,props)=>{
          return{loading:false};
        })
      }
    }
    inputChangeHandler = (event) =>{
      let stateData={...this.state.data}
      switch (event.target.name) {
        case 'header':
          stateData.header = event.target.value; 
          break;
        case 'subheader':
          stateData.subheader= event.target.value;
          break;
        case 'link':
          stateData.imglink[1]= event.target.value;
          break;
        case 'thumblink':
          stateData.imglink[0]= event.target.value;
          break;
        case 'newstext':
          stateData.newstext= event.target.value;
          break;
        case 'desk':
          stateData.category= event.target.value;
          break;
        default:
          break;
      }
      this.setState({data:stateData});
          console.log(this.state.data);
    }
    submitHandler = (event) =>{
      event.preventDefault();
      if(!this.state.isEditing){
        this.setState({loading:true});
        let tempData ={...this.state.data}
        tempData.status="submitted For Review";
        tempData.date=moment().format('MMMM Do YYYY, h:mm:ss a');
        tempData.newsId=uuidv4();
        tempData.authorId=this.state.userData.userId;
        tempData.author=this.state.userData.userName;
        tempData.authorImage=this.state.userData.userImage;
        axios.post('/tempNews.json',tempData)
                  .then(res=>{
                    console.log(this.state.userData.userId);
                    let link='/pending/'+this.state.userData.userId;
                    //console.log(link);
                    this.setState({redirect:link})
                    //window.location.reload();
                  }).catch(err=>{
                    console.log(err);
                  })
      } else{
        this.setState({loading:true});
        axios.get('/tempNews.json')
        .then(res=>{
          for(let x in res.data){
            if(res.data[x].newsId === this.state.data.newsId){
              let link = 'tempNews/'+x+".json";
              axios.put(link,this.state.data)
                    .then(res=>{
                      console.log(res);
                      let link='/pending/'+this.state.userData.userId;
                      console.log(link);
                      this.setState({redirect:link})
                      //window.location.reload();
                    }).catch(err=>{
                      console.log(err);
                    })
            }
          }
        }).catch(err=>{
          console.log(err);
        })
      }
      
    }

    previewHandler = (event)=>{
      event.preventDefault();
      console.log(this.state.showPopup);
      this.setState(prevState => ({
        showPopup: !prevState.showPopup
      }));
      console.log(this.state.showPopup);
    }

    render(){
      const style={
        color:'#c92a2a'
      }
      if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
      }
      let code=(
        <div  >
            <Backdrop show={true}/>
            <Spinner show={true}/>
        </div>);
      if(!this.state.loading){
        code=(
          <div>
          <title>Global News</title>
          <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous" />
          <link rel="stylesheet" href="../css/style.css" />
          <div className={classes.testbox}>
            <div hidden={!this.state.showPopup}>
              <PreviewNews news={this.state.data} 
              user={this.state.userData}
              close = {this.previewHandler}/>
            </div>
            <form onSubmit={this.submitHandler} hidden={this.state.showPopup}>
              <h1>News Submission Form</h1>
              <div className={classes.item}>
                <p>Desk </p>
                <select name="desk" defaultValue={this.state.data.category} required onChange={this.inputChangeHandler} >
                  <option value="" disabled selected hidden>Please Select</option>
                  <option value="national">National Desk</option>
                  <option value="international">International Desk</option>
                  <option value="sports">Sports Desk</option>
                  <option value="finance">Finance Desk</option>
                  <option value="entertainment">Entertainment Desk</option>
                  <option value="oped">Op-Ed Desk</option>
                  <option value="education">Education Desk</option>
                </select>
              </div>
              <div className={classes.item}>
                <p>News Header</p>
                <input type="text" name="header" defaultValue={this.state.data.header} onChange={this.inputChangeHandler} required />
              </div>
              <div className={classes.item}>
                <p>News Sub-Header</p>
                <input type="text" name="subheader" defaultValue={this.state.data.subheader} onChange={this.inputChangeHandler} required />
              </div>
              <div className={classes.item}>
                <p>Header Image Link<span style={style} > (Dimension must be 2000x1000 pixel)</span></p>
                <input type="text" name="link" defaultValue={this.state.data.imglink[1]} onChange={this.inputChangeHandler} required />
              </div>
              <div className={classes.item}>
                <p>Thumbnail Image Link<span style={style} > (Dimension must be 337x265 pixel)</span></p>
                <input type="text" name="thumblink" defaultValue={this.state.data.imglink[0]} onChange={this.inputChangeHandler} required />
              </div>
              <div className={classes.item}>
                <p>Main News Text:</p>
                <textarea rows={10} name="newstext" required defaultValue={this.state.data.newstext}
                onChange={this.inputChangeHandler} style={{'white-space':'pre'}} />
              </div>
              <div className={classes.btnblock}>
              <button type="submit">Submit</button>
              <button className ={classes.previewBtn} name="preview" onClick={this.previewHandler}>Preview</button>
              </div>
            </form> 
            
          </div>
        </div>
        )
      }
        return(
        <div>
          {code}
        </div>
              );
    }
}
export default NewsSubmission;