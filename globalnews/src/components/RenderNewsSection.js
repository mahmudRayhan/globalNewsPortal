import React,{ Component } from 'react';
import { Collapse, Button, CardBody, Card,
CardImg, CardText, CardTitle, CardSubtitle, CardImgOverlay, Row, Container } from 'reactstrap';


function DisplayNews({news}){
	let url=null
	if(news.url !== undefined)
	url= news.url
	else 
	url = "/news/"+news._id;
	console.log(url)
		return (
          <a href={url}>
	          <div id="sidemedia" style={{marginRight:'10px'}}>
			      <Card border="primary" bg='dark' style={{ width: '17rem' }}>
			        <CardImg top  src={process.env.PUBLIC_URL + '/assets/writeNews/'+news.headerImage} alt="Card image cap" />
			        <CardBody>
			          <CardTitle id="smalltitle">{news.title}</CardTitle>
			          <CardSubtitle  tag="p" className="mb-2 text-muted subtitle ">{news.category}</CardSubtitle>
			        </CardBody>
			      </Card>
			   </div>
	      </a>
	  );

} 
const RenderNewsSection = ({news})=>{
	return(
		<div>	
			<Row>
				{news.map(item=>{
					return(
					<DisplayNews news={item}/>)
				})}
			</Row>	
		</div>
		)
}
export default RenderNewsSection;