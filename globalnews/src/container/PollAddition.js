import React,{Component} from 'react';
import classes from '../css/PollAddition.css';
import axios from '../axiosNew';

import {Redirect} from 'react-router-dom'
import Header from '../components/HeaderComponent';
import NavBar from '../components/UI/NavBarComponent'

class PollAddition extends Component{
  state={
    optionList:[{option:''}],
    redirect:null,
    userData:null
  }

  componentDidMount(){
    axios.get("/dashboard",{
      headers : {
        "auth-token": localStorage.getItem("token")
      }
    })
    .then((profile)=>{
      console.log(profile)
      this.setState({
        userData:profile.data,
        loading:false
      })
      console.log(profile.data);
    }).catch((err)=>{
      console.log(err);
    })
  }
  submitHandler = (event)=>{
        event.preventDefault();
        let date = event.target.deadlineDate.value+"T"+event.target.deadlineTime.value+":00"
        //console.log(date);
        //const deadlineTimeStamp = new Date(date)
        //console.log(deadlineTimeStamp);
        console.log("Submitted Correctly");
        // console.log(event.target.title.value);
        // console.log(event.target.deadlineDate.value);
        // console.log(event.target.deadlineTime.value);
        // console.log(document.getElementById("options").value);
        // console.log(document.getElementById("type").value);
        let options = []
        let data = {
            title : event.target.title.value,
            deadline:date,
            options:this.state.optionList,
            type:"regular"
        }
        console.log(data);
        axios.post('/addpoll',{pollData:data})
            .then(res=>{
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        this.setState({redirect:'/user'})
    }

    handleAddClick = () => {
      this.setState((prevState)=>{
        return{ optionList :[...prevState.optionList, { option: "" }] }
      })
    };

    handleRemoveClick = index => {
      const list = [...this.state.optionList];
      list.splice(index, 1);
      this.setState((prevState)=>{
        return{optionList:list}
      })
    };
    
    handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...this.state.optionList];
      list[index].option = value;
      this.setState((prevState)=>{
        return{optionList:list}
      })
    };
   

    render(){
      if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
      }
      console.log(this.state.userData);
      if(!this.state.userData){
        // return <Redirect to='/signin'/>
        return(
          <div>
            <Header/>
            <NavBar/>
            <h2 style={{textAlign:"center"}}>Please Log In First</h2>
          </div>
        )
        
      } 

        return(
    <div className={classes.container}>
        <Header/>
        <NavBar/>
        <div>
  <title>Entertainment Booking Form</title>
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" />
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous" />
  <div className="testbox">
    <form onSubmit={this.submitHandler}>
      <div className="banner">
        <h1>Add a Poll</h1>
      </div>
      <div className="item">
        <p>Poll Descrption</p>
        <input type="text" name="title" />
      </div>
      <div className="item">
        <p>Deadline Date</p>
        <input type="date" name="deadlineDate" />
        <i className="fas fa-calendar-alt" />
      </div>
      <div className="item">
        <p>Deadline time</p>
        <input type="time" name="deadlineTime" />
      </div>
        <div>
          <h6>Enter options</h6>
        </div>
      <div >
      {this.state.optionList.map((item, i) => {
        return (
          <div >
            <input
              name="firstName"
              className="option-box"
              placeholder="Option Text"
              value={item.option}
              onChange={e => this.handleInputChange(e, i)}
            />
            <div >
              {this.state.optionList.length !== 1 && <button
                className="mr10"
                className="option-btn"
                onClick={() => this.handleRemoveClick(i)}>Remove</button>}
              {this.state.optionList.length - 1 === i && <button classname="option-btn" onClick={this.handleAddClick}>Add</button>}
            </div>
          </div>
        );
      })}
        
      </div>

      <div className="btn-block">
        <button type="submit" >ADD</button>
      </div>
    </form>
  </div>
</div>

        
    </div>
        )
    }
}
export default PollAddition