
import React,{ Component, PropTypes } from 'react';
import { Card, CardImg, CardText, CardBody,Button } from 'reactstrap';
import '../css/commentForm.css';
import '../css/newsdetail.css';
import moment from 'moment'





function RenderNews({news,userData}) {
    if (news != null){
      return(
        <div>
          <Card>
              <CardImg   top  src={news.imglink[1]} alt={news.header} />
              <CardBody>
                {/*<CardTitle>{news.name}</CardTitle>*/}
                <CardText>
                    <div>
                        <span>
                           <img align="left" class="authorImage" src={userData.userImage} alt="Avatar"/>
                        </span>
                      
                      <div className="authorInfo">
                          {userData.userName}<br/>
                          {moment().format('MMMM Do YYYY, h:mm:ss a')}
                      </div>
                      
                    </div>

                    <br/>
                    <div style={{'white-space':'pre','font-weight':'500',fontFamily:'arial'}}>
                      {news.newstext}
                    </div>
                  </CardText>
              </CardBody>
          </Card>
        </div>
      );
    }else{
      return(
        <div></div>
      );
    }
        
}


const NewsDetail=(props)=> {

    
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3>{props.news.header}</h3>
                    <hr/>
                </div>
            </div>

            <div className="row">
                <div  className="col-12">
                    <RenderNews news={props.news} userData={props.user} />
                </div >
            </div>
            <div>
            <Button color="danger" onClick={props.close}>Close </Button>{' '}
            </div>
        </div>
    );
    
    
}

 


export default NewsDetail;