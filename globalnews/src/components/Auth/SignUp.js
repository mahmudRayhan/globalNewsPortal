import React, { Component } from 'react';
import { Button } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Link } from 'react-router-dom';


class SignUp extends Component{
  constructor(){
      super();
      this.state={
        fullName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword:'',
        error:''
      }

      this.changeFullName= this.changeFullName.bind(this)
      this.changeUserName= this.changeUserName.bind(this)
      this.changeEmail= this.changeEmail.bind(this)
      this.changePassword= this.changePassword.bind(this)
      this.changeConfirmPassword= this.changeConfirmPassword.bind(this)
      this.onSubmit=this.onSubmit.bind(this)
  }




  changeFullName(event){
    this.setState({
      fullName:event.target.value
    })
  }

  changeUserName(event){
    this.setState({
      userName:event.target.value
    })
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

  changeConfirmPassword(event){
    this.setState({
      confirmPassword:event.target.value
    })
  }

  onSubmit(event){
    console.log("submitted")
    event.preventDefault()

    if(!this.state.fullName|| !this.state.email || !this.state.password || !this.state.confirmPassword || !this.state.email){
      this.setState({
        error:"Please fill in all fields!"
      })
    }else if(this.state.password.length<6){
      this.setState({
        error:"Password is too short!"
      })
    }else if(this.state.password !==this.state.confirmPassword){
      this.setState({
        error:"Password don't Match!"
      })
    }else{
      const registered ={
        fullName: this.state.fullName,
        userName:this.state.userName,
        email: this.state.email,
        password: this.state.password,
      }
  
      console.log(registered)
  
      axios.post("http://localhost:3000/signup",registered)
      .then( (Response)=>{
        console.log(Response.data)
      console.log(registered) }
      ).catch(error=>{
        console.log(error)
      })
        
        this.setState({
          fullName: '',
          userName: '',
          email: '',
          password: '',
          error:'You have been registered!'
        })

    }

    

    
  }


    render(){
      return(
        <div>
            <div>
              <div className='container'>
                <div className='form-div'>
                  <form onSubmit={this.onSubmit}>

                    <h3 className="text-center">Register</h3>

                    <h5 className="text-center">{this.state.error}</h5>

                    <input type="text" placeholder="Full Name"
                    onChange={this.changeFullName}
                    value={this.state.fullName}
                    className="form-control form-group"
                    />
                    <input type="text" placeholder="User Name"
                    onChange={this.changeUserName}
                    value={this.state.userName}
                    className="form-control form-group"
                    />

                    <input type="email" placeholder="Email"
                    onChange={this.changeEmail}
                    value={this.state.email}
                    className="form-control form-group"
                    />

                    <input type="password" placeholder="Password"
                    onChange={this.changePassword}
                    value={this.state.password}
                    className="form-control form-group"
                    />

                    <input type="password" placeholder="Confirm Password"
                    onChange={this.changeConfirmPassword}
                    value={this.state.confirmPassword}
                    className="form-control form-group"
                    />

                    <input type="submit" 
                    value="Submit"
                    className="btn btn-danger btn-block"
                    />

                  <Link to="/signin">
                    {/* <Button variant="secondary" renderAs="button"> */}
                      <span>Login</span>
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


export default SignUp;