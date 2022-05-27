import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import '../css/signin.css';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { withRouter } from 'react-router';


function LoadUserPage() {
  console.log("loadUser called");
  return(
    <Redirect to="/user" />
  )
}
class SignIn extends Component{
  constructor(){
      super();
      this.state={
        email: '',
        password: '',
        message: '',
        isSignedin: false
      }

      this.changeEmail= this.changeEmail.bind(this)
      this.changePassword= this.changePassword.bind(this)
      this.onSubmit=this.onSubmit.bind(this)
  }


  changeEmail(event){
    this.setState({
      email:event.target.value
    })
  }

  changePassword(event){
    this.setState({
      password:event.target.value
    })
  }


  
  


  // async showMessage(){
  //   await axios.get("http://localhost:3000/app/signin")
  //   .then( (res)=>{
  //     console.log(res.data)
  //     this.setState({
  //       message: res.data
  //      })
  //   })
          
  // }

  

  onSubmit(event){
    
    event.preventDefault();
    console.log("submitted");

    const loggedIn ={
      email: this.state.email,
      password: this.state.password
    }
    console.log(loggedIn);

    
    axios.post("http://localhost:3000/signin",loggedIn)
    .then( (res)=>{  
    console.log("In then");
    console.log(loggedIn);
    console.log(res);

      // this.setState({
      //   message: res.data.isloggedin
      // })

      console.log(res.data.isloggedin)
      this.setState({
        message: res.data.message,
        
      })
      if(res.data.isLoggedin===true){
        this.setState({
         
          isSignedin: true
        })
        localStorage.setItem("token",res.data.tokenNo);
        console.log("loadUser called");
        this.props.history.push("/user");
        window.location = "/user";
        //res.data.tokenNo
        //loadUserPage();
      }
     }
    ).catch(error=>{
      console.log("In catch error");
      console.log(error);
    })

    
      
      this.setState({
        email: '',
        password: ''

      })

      //this.showMessage()

    
  }


    render(){
      console.log(this.state.isSignedin)
      if(this.state.isSignedin)
      {
        return <LoadUserPage />
      }
      return(
        <div>
            <div className=' container'>
              <div className='m-5 row d-flex justify-content-center'>
                <div className='col-6 form-div'>
                  <form  onSubmit={this.onSubmit}>  
                    <h3 className="text-center">Log in</h3>
                    <h5 className="text-center">{this.state.message}</h5>
                    <div className="form-group" >                      
                      <input  type="email" placeholder="Email"
                      onChange={this.changeEmail}
                      value={this.state.email}
                      className="form-control form-group"
                      />
                    </div>
         
                    <div className="form-group" >                    
                    <input className="form-group" type="password" placeholder="Password"
                    onChange={this.changePassword}
                    value={this.state.password}
                    className="form-control form-group"
                    />
                    </div>

                    
                    <input type="submit" 
                    value="Login"
                    className="btn btn-danger btn-block"
                    />

                    <Link to="/signup">
                    {/* <Button variant="secondary" renderAs="button"> */}
                      <span>Register</span>
                    {/* </Button> */}
                   </Link>
                  </form>
                </div>
              </div>
            </div>


        </div>
      )
    }
}


export default withRouter(SignIn);