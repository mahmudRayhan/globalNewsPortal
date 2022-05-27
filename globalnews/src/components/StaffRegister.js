import React, { Component } from 'react';
import { Button } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Link } from 'react-router-dom';


class StaffRegister extends Component{
  constructor(){
      super();
      this.state={
        fullName: '',
        lastName: '',
        email: '',
        gender:'',
        birthday:'',
        password: '',
        userRole:'',
        userDesk:'',
        confirmPassword:'',
        error:''
      }

      this.changeFullName= this.changeFullName.bind(this)
      this.changeLastName= this.changeLastName.bind(this)
      this.changeEmail= this.changeEmail.bind(this)
      this.changePassword= this.changePassword.bind(this)
      this.changeConfirmPassword= this.changeConfirmPassword.bind(this)

      this.changeGender= this.changeGender.bind(this)
      this.changeBirthDay= this.changeBirthDay.bind(this)
      this.onSubmit=this.onSubmit.bind(this)

      this.changeUserRole= this.changeUserRole.bind(this)
      this.changeUserDesk= this.changeUserDesk.bind(this)
  }




  changeFullName(event){
    this.setState({
      fullName:event.target.value
    })
  }

  changeUserRole(event){
    this.setState({
      userRole:event.target.value
    })
  }

  changeUserDesk(event){
    this.setState({
      userDesk:event.target.value
    })
  }

  changeLastName(event){
    this.setState({
      lastName:event.target.value
    })
  }

  changeEmail(event){
    this.setState({
      email:event.target.value
    })
  }

  changeBirthDay(event){
    this.setState({
      birthday:event.target.value
    })
  }

  changeGender(event){
    this.setState({
      gender:event.target.value
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

    if(!this.state.fullName|| !this.state.email || !this.state.password || !this.state.confirmPassword || !this.state.email|| !this.state.gender || !this.state.birthday || !this.state.userRole || !this.state.userDesk ){
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
        lastName:this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        gender:this.state.gender,
        birthday:this.state.birthday,
        userRole:this.state.userRole,
        userDesk:this.state.userDesk
      }
  
      console.log(registered)
  
      axios.post("http://localhost:3000/staffRegister",registered)
      .then( (Response)=>{
        console.log(Response.data)
      console.log(registered) }
      ).catch(error=>{
        console.log(error)
      })
        
        this.setState({
          fullName: '',
          lastName: '',
          email: '',
          password: '',
          gender:'',
          birthday:'',
          userRole:'',
          userDesk:'',
          error:'You have been registered!'
        })

    }

    

    
  }


    render(){
      return(
        <div>
            <div>
              <div className='container'>
                <div className='row d-flex justify-content-center form-div'>
                  <form className='col-9' onSubmit={this.onSubmit}>

                    <h3 className="text-center">Staff Register</h3>

                    <h5 className="text-center">{this.state.error}</h5>



                    

                      <div className="row">

                          <div className="col-6">
                            <input required type="text" placeholder="First Name"
                            onChange={this.changeFullName}
                            value={this.state.fullName}
                            className="form-control form-group"
                            />
                        </div>

                        <div className="col-6">
                            <input required type="text" placeholder="last Name"
                            onChange={this.changeLastName}
                            value={this.state.lastName}
                            className="form-control form-group"
                            />
                        </div>

                      </div>


                      <input required type="email" placeholder="Email"
                    onChange={this.changeEmail}
                    value={this.state.email}
                    className="form-control form-group"
                    />


                      <div className="row">

                          <div className="col-2">
                            <h6 >Role:</h6>
                          </div>

                        <div className="col-10">
                          <select   id="userRole" name="userRole"
                          className="form-control form-group"
                          onChange={this.changeUserRole}>
                          <option value="sub-editor" >Sub-Editor</option>
                          <option value="reporter">Reporter</option>
                          <option value="admin">Admin</option>
                          <option value="opinion writer">Opinion Writer</option>
                          <option value=""selected>Select</option>
                          
                        </select>
                        </div>

                      </div>


                      


                      <div className="row">

                          <div className="col-2">
                            <h6 >Desk:</h6>
                          </div>

                        <div className="col-10">
                          <select   id="userDesk" name="userDesk"
                          className="form-control form-group"
                          onChange={this.changeUserDesk}>
                          <option value="national" >National</option>
                          <option value="opinion">Opinion</option>
                          <option value="word">World</option>
                          <option value="sports">Sports</option>
                          <option value="technology">Technology</option>
                          <option value="" selected>Select</option>
                          
                        </select>
                        </div>

                      </div>

                      <div className="row">

                          <div className="col-2">
                            <h6 >Gender:</h6>
                          </div>

                        <div className="col-10">
                          <select   id="gender" name="gender"
                          className="form-control form-group"
                          onChange={this.changeGender}>
                          <option value="male" >Male</option>
                          <option value="female">female</option>
                          <option value="other" selected>Custom</option>
                        </select>
                        </div>

                      </div>



                      


                      <div className="row">

                          <div className="col-2">
                            <h6 >Birthday:</h6>
                          </div>

                        <div className="col-10">
                              <input required type="date" id="birthday"
                                className="form-control form-group"
                                onChange={this.changeBirthDay}
                                name="birthday"/>
                        </div>

                      </div>

                    

                    <input required  type="password" placeholder="Password"
                    onChange={this.changePassword}
                    value={this.state.password}
                    className="form-control form-group"
                    />

                    <input required type="password" placeholder="Confirm Password"
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


export default StaffRegister;