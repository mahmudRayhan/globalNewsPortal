import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import '../css/lists.css';
import Header from './HeaderComponent';
import axiosNew from '../axiosNew'
import { render } from '@testing-library/react';
import Backdrop from '../components/UI/Backdrop'
import Spinner from '../components/UI/Spinner'
import RenderNavbar from './UI/NavBarComponent';

  function RenderListsItem ({news, onClick}) {
    console.log(news._id);
      return (

          <Link  to={'/news/'+news._id}>
              <div>
                <Media className="row eachItem">
                    <div className="col-5">
                        <CardImg top  src={process.env.PUBLIC_URL + '/assets/writeNews/'+news.headerImage} alt={news.title} />
                    </div>
                    
                    <div className="col-7">
                      <Media body className="ml-10">
                      <Media heading>{news.title}</Media>
                      {/* <p className="newdescription">{news.body}</p> */}
                      </Media>
                    </div>
                </Media>
              </div>
            
          <div class="afterItem">
              
            </div>
          </Link>
        
        
      );
  }

  class Lists extends Component {

    render(){
      let lists = null;
      let listCode = null;
      console.log("Inside NewsList Component->");
      console.log(this.props.news)
      if(this.props.news){
        lists = this.props.news.map((item) => {
          return (
              <div className="col-12 "  key={item._id}>
                  <RenderListsItem news={item} />
              </div>
          );
      });
    }
    else{
          lists=(
              <div>
                  <h2>{this.props.errorText}</h2>
              </div>
          )
      }
      
        listCode=(
          <div>
            <div className="container">
              <Breadcrumb>
                  <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{this.props.title}</BreadcrumbItem>
              </Breadcrumb>
                <div className="row">
                    
                    <div className="col-12">

                        <h3>{this.props.title}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    {lists}
                </div>
            </div>
          </div>
        )
      
      return(
        <div>
          <RenderNavbar/>
          {listCode}
        </div>
      );

      }
    }

export default Lists;