import React, { Component,useState } from 'react';
import {Nav, NavItem,Row } from 'reactstrap';
import {Link} from 'react-router-dom';
import {NavLink } from 'react-router-dom';  
const RenderNavbar=(props)=> {
	return(
		<div>
			<div className="row">
			<Nav className="col-xs-12 offset-sm-2 col-sm-8" justified>
				<NavItem>
		          <NavLink className="nav-link" to="/home">Home</NavLink>
		        </NavItem>
		        <NavItem>
		          <NavLink className="nav-link" to="/lists/national">National</NavLink>
		        </NavItem>
		        <NavItem>
		          <NavLink className="nav-link" to="/lists/opinion">Opinions</NavLink>
		        </NavItem>
		        <NavItem>
		          <NavLink className="nav-link" to="/lists/international">World</NavLink>
		        </NavItem>
		        <NavItem>
		          <NavLink className="nav-link" to="/lists/technology">Technology</NavLink>
		        </NavItem>
		        <NavItem>
		          <NavLink className="nav-link" to="/lists/sports">Sports</NavLink>
		        </NavItem>
				<NavItem>
		          <NavLink className="nav-link" to="/poll">Poll</NavLink>
		        </NavItem>
				</Nav>
			</div>
		      <hr />
	      </div>
		)
}
export default RenderNavbar;