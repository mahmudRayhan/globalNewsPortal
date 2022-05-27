import React, { Component } from 'react';
import { Button, Media } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import RenderNavbar from './UI/NavBarComponent';


class UserPage extends Component{

        constructor(props) {
            super(props);
            
            this.state = {
              //profilePic is used for picture update
                profilePic:'',  

                fullName: '',
                lastName: '',
                email: '',
                password: '',
                gender:'',
                birthday:'',
                userRole:'',
                phoneNum:'',              

                message:'',
                desk:'',
               


                id: '',
                url:'',     
            };

            
            this.changeProfilePic= this.changeProfilePic.bind(this);


            this.changeFullName= this.changeFullName.bind(this)
            this.changeLastName= this.changeLastName.bind(this)
            this.changeEmail= this.changeEmail.bind(this)
            this.changeGender= this.changeGender.bind(this)
            this.changeBirthday= this.changeBirthday.bind(this)
            this.changePhoneNum= this.changePhoneNum.bind(this)
            this.changePassword= this.changePassword.bind(this)
            this.onSubmit=this.onSubmit.bind(this)

            this.onSubmit2=this.onSubmit2.bind(this)
          }




          changeFullName(event){
            this.setState({
              fullName:event.target.value
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

          changeBirthday(event){
            this.setState({
              birthday:event.target.value
            })
          }

          changeGender(event){
            this.setState({
              gender:event.target.value
            })
          }

          changePhoneNum(event){
            this.setState({
              phoneNum:event.target.value
            })
          }
        
          changePassword(event){
            this.setState({
              password:event.target.value
            })
          }
        

          
          componentDidMount(){ 
            console.log("request send");
            axios.get("http://localhost:3000/dashboard",{
              headers : {
                "auth-token": localStorage.getItem("token")
              }
            })
            .then( (res)=>{
              console.log(res.data)
              this.setState({
                id:res.data.id,
                fullName: res.data.fullName,
                lastName: res.data.lastName,
                email: res.data.email,
                userRole: res.data.userRole,
                gender:res.data.gender,
                birthday: res.data.birthday,
                phoneNum: res.data.phoneNum,
                url:res.data.profilePic,
                desk:res.data.desk
              })
                
            }).catch(()=>{
              window.location = "/signin"
            })
          }


          changeProfilePic(event){
            this.setState({
              profilePic:event.target.files[0]
            })
          }


          onSubmit(event){
            event.preventDefault();

            const formData= new FormData();

            formData.append("profilePic",this.state.profilePic)
 
            axios.post(`http://localhost:3000/upload/${this.state.id}`,formData)
            
            .then( (res)=>{
            console.log(res)
             } 
            ).catch(error=>{
              console.log(error)
            })


          }


          onSubmit2(event){
            console.log("submitted")
            event.preventDefault()
        
            if(!this.state.fullName|| !this.state.email || !this.state.password  || !this.state.email|| !this.state.gender || !this.state.birthday ){
              this.setState({
                error:"Please fill in all fields!"
              })
            }else{
              const registered ={
                fullName: this.state.fullName,
                lastName:this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                gender: this.state.gender,
                phoneNum: this.state.phoneNum,
                birthday: this.state.birthday
              }
          
              console.log(registered)
          
              axios.post(`http://localhost:3000/update/${this.state.id}`,registered)
              .then( (Response)=>{

                console.log(Response)

                console.log(Response.data.isloggedin)
                this.setState({
                  message: Response.data.message,
                })
                
              console.log(registered)
             }).catch(error=>{
                console.log(error)
              })
                
                
            }
           
          }


        render(){

          let{profilePic,  fullName,lastName,email,password,gender,birthday,userRole,phoneNum, message,id,url}=this.state;

          const renderAdmin = () => {
            if (userRole==="admin" || userRole==='editor') {
              return <Link to="/staffRegister">
                            <button >Create Staff Account</button>
                  </Link>;
            }
          }

          const renderStaff = () => {
            if (userRole==="reporter" || userRole==="sub-editor") {
              return <div>

                    <form>
                        <div className="row">

                            <div className="col-2">
                              <h6 >Desk:</h6>
                            </div>

                            <div className="col-10">
                                <input required type="desk" placeholder="desk"
                                readOnly
                                value={this.state.desk}
                                className="form-control form-group"
                                />
                            </div>
                        </div>
                    </form>

                </div>
            }
          }

          const addPollRedirect = ()=>{
            return(
              <div>
            <Link to="/addpoll">
            <button hidden={userRole === "editor" ? false : true}> Create New Poll</button>
            </Link>
            </div>
            )
          }

          const renderStaffButton = () => {
            let text=null
            let url = null
            if(userRole==="reporter" || userRole==="sub-editor"){
              text = "Pending Reports"
              url = '/pending'
            }
            else if(userRole == 'editor'){
              text =  "Pending Opinions"
              url = '/pending'
            }
            if (userRole==="reporter" || userRole==="sub-editor" || userRole === 'editor') {
              return <div>

                  <Link to={url}>
                            <button style={{float:"right"}}>{text}</button>{"  "}
                  </Link>;
      

                </div>
            }
          }


          const renderReporterButton = () => {
            if ( userRole==="reporter") {
              return <div>
                  <Link to="/writenews">
                            <button style={{float:"left"}}>Write New News</button>{" "}
                  </Link>;
                </div>
            }
            else if ( userRole==="sub-editor" || userRole==="editor") {
              return <div>
                  <Link to="/writenews">
                            <button style={{float:"left"}}>Write Opinion Post</button>{" "}
                  </Link>;
                </div>
            }
          }


          const renderOwnButton = () => {
            let text=null
            let url = null
            if(userRole==="reporter" || userRole==="sub-editor"){
              text = "Own Reports"
              url = '/own'
            }
            else if(userRole == 'editor'){
              text =  "Own Opinions"
              url = '/own'
            }
            if (userRole==="reporter" || userRole==="sub-editor" || userRole === 'editor') {
              return <div>

                  <Link to={url}>
                            <button style={{float:"right"}}>{text}</button>{"  "}
                  </Link>;
      

                </div>
            }
          }

          const renderOpinionButton = () => {
            if ( userRole==="opinion writer") {
              return <div>

    
                  <Link to="/writenews">
                            <button style={{float:"left"}}>Write Opinion Post</button>{" "}
                  </Link>;

                    

                </div>
            }
            if ( userRole==="editor") {
              return <div>

    
                  <Link to="/requests">
                            <button style={{float:"left"}}>News Placemnet Requests</button>{" "}
                  </Link>;

                    

                </div>
            }
          }

          


         let picUrl=JSON.stringify("../assets/uploads/"+url);

            //var picUrl="../assets/uploads/"+{this.state.url};
            return(
              <div>
                <RenderNavbar/>
                  <div>


                  

                  {/* {picUrl},
                  {url},
                  {userRole} */}


                  {/* <div>

                    
                        <Link to="/signin" onClick={()=>{

                        localStorage.clear()
                                      
                        }
                          }>
                        
                        <button style={{float:"right"}}>Log Out</button>
                      
                        </Link>

                    </div> */}

                  

            <div className=' container'>
              <div className='m-5 row d-flex justify-content-center'>
                <div className='col-9 form-div'>

                  <form  onSubmit={this.onSubmit} encType="multipart/form-data">
                      <div>
                      <img src={process.env.PUBLIC_URL + '/assets/uploads/'+url} alt="bro" style={{width:"40%"}}/>
                    </div>

                    <div className="form-group" >
                      
                      <h4>{this.state.fullName} {" "}  {this.state.lastName} { "( "}  {this.state.userRole}  { ")"}</h4>
                        <input  type="file" placeholder="Upload Image"
                        fileName="profilePic"
                        onChange={this.changeProfilePic}
                        
                        className="form-control-file"
                        />

                    </div>

                    {/* <input type="submit" 
                    value="upload"
                    className="btn btn-danger"
                    /> */}

                  <Button variant="primary" type="submit">
                    upload
                  </Button>

                  </form>


                  
                  <form onSubmit={this.onSubmit2}>

                    <h4 className="text-center">User Information</h4>

                    <h5 className="text-center">{this.state.message}</h5>
                    

                    <div className="row">

                           <div className="col-2">
                                <h6 >Name:</h6>
                          </div>
                          <div className="col-5">
                            <input required type="text" placeholder="First Name"
                            onChange={this.changeFullName}
                            value={this.state.fullName}
                            className="form-control form-group"
                            />
                        </div>


                        
                        <div className="col-5">
                            <input required type="text" placeholder="last Name"
                            onChange={this.changeLastName}
                            value={this.state.lastName}
                            className="form-control form-group"
                            />
                        </div>

                      </div>

                      <div className="row">

                          <div className="col-2">
                            <h6 >Gender:</h6>
                          </div>

                        <div className="col-10">
                          <select   id="gender" name="gender"
                          value={this.state.gender}
                          className="form-control form-group"
                          onChange={this.changeGender}>
                          <option value="male" >Male</option>
                          <option value="female">female</option>
                          <option value="other" >Custom</option>
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
                                onChange={this.changeBirthday}
                                value={this.state.birthday}
                                name="birthday"/>
                        </div>

                      </div>

                      <div className="row">

                          <div className="col-2">
                            <h6 >Email:</h6>
                          </div>

                          <div className="col-10">
                              <input required type="email" placeholder="Email"
                              onChange={this.changeEmail}
                              value={this.state.email}
                              className="form-control form-group"
                              />
                          </div>

                          

                      </div>

                      <div className="row">

                          <div className="col-4">
                            <h6 >Phone Number:</h6>
                          </div>


                          <div className="col-8">
                            <input required type="number" placeholder="Phone Number"
                            onChange={this.changePhoneNum}
                            value={this.state.phoneNum}
                            className="form-control form-group"
                            />
                          </div>

                          

                      </div>



                      <div className="row">

                          <div className="col-2">
                            <h6 >Password:</h6>
                          </div>


                          <div className="col-10">
                          <input required  type="password" placeholder="Enter Password to Update!"
                          onChange={this.changePassword}
                          value={this.state.password}
                          className="form-control form-group"
                          />
                          </div>

                          

                      </div>

                      {renderStaff()}

                    

                    

                    


                    <Button variant="primary" type="submit" className="btn btn-danger ">
                      Update
                    </Button>

                     
                  </form>

                  
                  


                </div>
              </div>
            </div>

            
            <div className="row justify-content-center">
              {addPollRedirect()}
              {renderStaffButton()}
              {renderOpinionButton()}
              {renderReporterButton()}
              {renderOwnButton()}
              {renderAdmin()}
            </div>

                    
                    
                  </div>
              </div>
            )
          }
  }





export default UserPage;