import React from 'react';

import { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import "../css/header.css";


class  Header extends Component {
    state = {
        isNavOpen : false,
        isLoggedin : false,
        userName : null,
    }

    componentDidMount(){ 
        console.log("request send");
        axios.get("http://localhost:3000/dashboard",{
          headers : {
            "auth-token": localStorage.getItem("token")
          }
        })
        .then( (res)=>{
          this.setState({
            userName:res.data.fullName,
    
            // fullName: res.data.fullName,
            // email: res.data.email
    
          })
            console.log(this.state.userName);
            console.log(res.data);
            if (res.data.fullName !== null)
            {
                this.setState({
                    isLoggedin : true,
                })
            }
        }).catch(()=>{
          console.log("Not logged in");
          this.setState({
              isLoggedin : false,
          })
        })
      }


    toggleNav = e => {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }


    render() {
        if (!this.state.isLoggedin) {
            return(
                <div className="container">         
                    <Navbar dark expand="md">
                        <div className="container">
                            <NavbarToggler onClick={this.toggleNav} />
                            
                            <Collapse isOpen={this.state.isNavOpen} navbar>
                               
                                <Nav className="ml-auto" navbar>
                                    <NavItem className="logo">
                                        <Link to="/home">
                                        <img className="headerLogo" src="globalNewsLogo.png" alt="" />
                                        </Link>
                                    </NavItem>
    

                                    <NavItem>
                                        <Link to="/signin">
                                        <Button><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                                        </Link>
                                    </NavItem>
    
                                    <NavItem>
                                        <Link to="/signup">
                                        <Button><span className="fa fa-sign-in fa-lg"></span> Register</Button>
                                        </Link>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </div>
                    </Navbar>
                      
                </div>
            )
        }

        else {
            return(
                <div className="container">         
                    <Navbar dark expand="md">
                        <div className="container">
                            <NavbarToggler onClick={this.toggleNav} />
                            
                            <Collapse isOpen={this.state.isNavOpen} navbar>

                                <Nav classname="ml-auto" navbar>
                                <NavItem className="logo">
                                        <Link to="/home">
                                        <img className="headerLogo" src="globalNewsLogo.png" alt="" />
                                        </Link>
                                </NavItem>
                                </Nav>
                                <Nav className="ml-auto" navbar>
                                    <NavItem className="mr-auto">
                                        <Link to="/user">
                                            <Button>
                                                <span className="fa fa-home fa-lg"></span> 
                                                {this.state.userName}
                                            </Button>
                                        </Link>
                                    </NavItem>
                                    <NavItem className="ml-auto">
                                        <Link to="/signin" onClick={()=>{
                                                this.setState({
                                                    isLoggedin : false,
                                                })
                                                localStorage.clear();
                                            } } >
                                            <Button>
                                                <span className="fa fa-sign-in fa-lg"></span> 
                                                Logout
                                            </Button>
                                        </Link>
                                    </NavItem>
    
                                </Nav>
                            </Collapse>
                        </div>
                    </Navbar>
                      
                </div>
            )
        }
    }
}

export default Header;