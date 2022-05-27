import React, { Component,useState } from 'react';
import { Collapse, Button, CardBody, Card, Jumbotron, Nav, NavItem, Media,
CardImg, CardText, CardTitle, CardSubtitle, CardImgOverlay, Row, Col, ListGroup, CardGroup, Container } from 'reactstrap';

import { Link, NavLink } from 'react-router-dom';         
import '../css/lists.css';
import '../css/home.css';
import '../css/footer.css';
import axiosNew from '../axiosNew'
import axios from 'axios' 
import chalk from 'chalk';
import Backdrop from '../components/UI/Backdrop'
import Spinner from '../components/UI/Spinner'
import RenderNavbar from './UI/NavBarComponent';
import RenderNewsList from './RenderNewsList';

function RenderJumbotron({toggle,isOpen,news}) {
	console.log(chalk.red("Inside RenderJumbptron"));
	console.log(news.title);
	const url = 'news/'+news._id;
	const path = `url(${process.env.PUBLIC_URL + '/assets/writenews/'+news.headerImage})`
	console.log(path);
	const divStyle = {
		color: 'blue',
		backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/writenews/'+news.headerImage})`,
	};

	return(
		
		<div style={{backgroundColor:"black"}}>  
	          <Link to={url}>
			  <div className="row text-lg-left">
				  <div className="col-lg-7 col-md-7 ">
				  <img style={{width:"800px",height:"500px"}}src={process.env.PUBLIC_URL + '/assets/writeNews/'+news.headerImage} ></img>
				  </div>
				  <div className="col-lg-4 col-md-4 text-lg-left" style={{paddingTop:"125px"}} >
				  	<h1  className="wordwrap" style={{color:"steelblue"}}>{news.title}</h1>
				  </div>
				  </div>
				</Link>   
		</div>
		)
}


function RenderMedialeft ({news}) {
      return (
          <Link className="newslinkhome" to={'/news/'+news._id}>
              <div className="row justify-content-start topmedia">
			      <div id="pbottom" className="col-xs-12 col-sm-4 topmedia">
			      	<Media left style={{width:"80%",height:"100%"}} href="#" >
						<CardImg top  src={process.env.PUBLIC_URL + '/assets/writeNews/'+news.headerImage}  alt={news.title}/>
				    </Media>
			      </div>
			      <div className="col-xs-12 ml-sm-5 mediabody col-sm-5">
			      	<Media body className="align-self-center">
			        <Media className="stitle" heading>
			          {news.title}
			        </Media>
			        {/* <p className="newdescription" >{news.body}</p> */}
			      </Media>
			      </div>
			  </div>
          </Link>   
      );
  }



function RenderMediaright ({news}) {
	let width = window.innerWidth;
	  return (
          <Link className="newslinkhome" to={'/news/'+news._id}>
	          <div className="row  topmedia">
			    	
			    		
						   <div className="col-xs-12 ml-sm-5 mediabody col-sm-5">
								<Media body className="align-self-center">
								<Media className="stitle" heading>
								{news.title}
								</Media>
								{/* <p className="newdescription" >{news.body}</p> */}
							</Media>
							</div>
						  <div id="pbottom" className="col-xs-12 col-sm-4 topmedia">
							<Media right style={{width:"80%",height:"100%"}} href="#" >
								<CardImg top  src={process.env.PUBLIC_URL + '/assets/writeNews/'+news.headerImage}  alt={news.title}/>
							</Media>
						   </div>
					    
		
			    </div>
	      </Link>
	  );
}


function SingleCard({news,cid}) {
	let cardid = cid

	if(cardid)
		return (
          <Link className="newslinkhome" to={'/news/'+news._id}>
	          <div className="row justify-content-end" id="sidemedia">
			      <Card className="col-md-12">
			        <CardImg top  src={process.env.PUBLIC_URL + '/assets/writeNews/'+news.headerImage} alt={news.title} />
			        <CardBody>
			          <CardTitle id="smalltitle">{news.title}</CardTitle>
			          <CardSubtitle  tag="p" className="mb-2 text-muted subtitle ">{news.category}</CardSubtitle>
			        </CardBody>
			      </Card>
			   </div>
	      </Link>
	  );
}

function SmallMedia({news}) {
	return (
		<div>
		
          <Link className="newslinkhome" to={'/news/43a6ab17-c376-4741-bea6-a64a831a65fb?id=51'}>
				<Media className="row">
			      <Media className="col-md-6" href="#" >
			        <Media object src={news.thumbnail} alt="Generic placeholder image" />
			      </Media>
			      <Media body className="col-md-6 mediabody">
			        <Media heading id="smalltitle">
			          dummy
			        </Media>
			        {news.category}
			      </Media>
			    </Media>
		    </Link>
		    <div className="row">
				<div className="col-md-12">
					<hr />
				</div>
			</div>
		</div>
		)
}


function RenderSideCards({news}) {
	return (
		<div>
			{news.map(i => {
				return(
					<div key={i._id}>
						<SingleCard news={i} cid={true}/>
					</div>	
					)
			})}
		</div>
    );
}


function RenderOpinions({news}) {
	var arr=[1,2]
	return(
		<div>
			<div className="row">
				<div className="col-md-12">
					<hr color="black"/>
				</div>
			</div>

			<div className="row">
				<div className="col-md-12 mediabody">
					<h1>Opinions</h1>
				</div>
			</div>

			<div className="row">
				<div className="col-md-12">
					<hr />
				</div>
			</div>

			<div>
			
				{arr.map(i => {
					return(
						<div key={i}>
							<SmallMedia news={news}/>
						</div>	
						)
				})}
			</div>
			
		</div>
		)
}


function RenderVideo({news}) {
	return(
		<div>
			<div className="row">
     				<div className="col-md-12">
     					<hr color="black"/>
     				</div>
 				</div>

 				<div className="row">
     				<div className="col-md-12 mediabody">
     					<h1>Videos</h1>
     				</div>
 				</div>

 				<div className="row">
     				<div className="col-md-12">
     					<hr />
     				</div>
 				</div>

 				<div className="row">
	 				<SingleCard news={news} cid={false} />
			    </div>
		</div>	
		)
}




function DisplayNews({news}){
	let url=null
	if(news.url !== undefined)
	url= news.url
	else 
	url = "/news/"+news._id;
	console.log(url)
		return (
          <a href={url} target="_blank">
	          <div id="sidemedia" style={{marginRight:'10px'}}>
			      <Card border="primary" bg='dark' style={{ width: '17rem' }}>
			        <CardImg top style={{height:"150px",width:"270px"}} src={process.env.PUBLIC_URL + '/assets/writeNews/'+news.headerImage} alt="Card image cap" />
			        <CardBody>
			          <CardTitle id="smalltitle">{news.title}</CardTitle>
			          {/* <CardSubtitle  tag="p" className="mb-2  subtitle ">{news.subheader}</CardSubtitle> */}
			        </CardBody>
			      </Card>
			   </div>
	      </a>
	  );

}
function RenderSection({news}){
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

function NewsAtom({news}){
	let url=null
	if(news.url !== undefined)
	url= news.url
	else 
	url = "/news/"+news._id;
	console.log(url)
		return (
          <a href={url} target="_blank">
	          <div id="sidemedia" style={{marginRight:'10px'}}>
			      <Card border="primary" bg='dark' style={{ width: '17rem' }}>
			        <CardImg top style={{height:"150px",width:"270px"}} src={news.thumbnail} alt="Card image cap" />
			        <CardBody>
			          <CardTitle id="smalltitle">{news.title}</CardTitle>
			          <CardSubtitle  tag="p" className="mb-2 text-muted subtitle ">{news.category}</CardSubtitle>
			        </CardBody>
			      </Card>
			   </div>
	      </a>
	  );

}

function RenderAggSection({news}) {
	//console.log(news);
	return(
		<div>	
			<Row>
				{news.map(item=>{
					return(
					<NewsAtom news={item}/>)
				})}
			</Row>	
		</div>
		)
}

function RenderListsItem ({news, onClick}) {
    console.log(news._id);
      return (

          <Link  to={'/news/'+news._id}>
              <div>
                <Media className="row eachItem">
                    <div className="col-5">
                        <Media  left middle>
                            <Media className="homeTop" object src={process.env.PUBLIC_URL + '/assets/writeNews/'+news.headerImage} alt={news.title} />
                        </Media>
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

class Home extends Component {
  
	state={
		isOpen:false,
		news:null,
		loading:true,
		bbcnews:[],
		sportsnews:[],
		worldnews:[],
		technews:[],
		searchText:'',
		serachResult:null,
		serached:false,
		topnews:null,
		sidenews:[]
	}
  toggle = () => {
	this.setState((prevState,props)=>{
		return{isOpen:!prevState.isOpen};
	})
  };

  changeSerachText=(event)=>{
    this.setState({ searchText : event.target.value }, () => {
      console.log(this.state.searchText);
      
	})
  };

	onSearch=(event)=>{
		
	
	event.preventDefault();
    console.log("submitted");

    const search ={
      text:this.state.searchText
    }
    console.log(search);
	 
    axios.post("http://localhost:3000/search",search)
    .then( (res)=>{  
    //console.log("In then");

    console.log(res);
	console.log(res.data.length)

	console.log("here")
		this.setState({
			searched: true
		  })

		  console.log(this.state.searched)

	if(res.data.length!=0){
		

		  this.setState({ serachResult : res.data }, () => {
			console.log(this.state.serachResult);
			
		  })
	}
     }
    ).catch(error=>{
      console.log("In catch error");
      console.log(error);
    })
	}
  componentDidMount(){
		axiosNew.get('/home')
			.then(res=>{
				console.log(res);
				this.setState((prevState,props)=>{
					return{
						news:res.data.mainnews,
						loading:false,
						bbcnews:res.data.bbcnews,
						sportsnews:res.data.sportsnews,
						worldnews:res.data.worldnews,
						cnnnews:res.data.cnnnews,
						technews:res.data.technews,
						topnews:res.data.topnews,
						sidenews: res.data.sidenews,
						nationalnews: res.data.nationalnews,
						opinions: res.data.opinions};
				})
				//console.log(this.state.loading,this.state.news[0]);
			}).catch(err=>{
				console.log(err);
			})
			axiosNew.get("/dashboard",{
				headers : {
				  "auth-token": localStorage.getItem("token")
				}
			  })
			  .then( (profile)=>{

				console.log(profile.data);
			  }).catch((err)=>{
				console.log(err);
			  })
  }
  
  render(){

	let lists=null;



	if(this.state.serachResult!=null){
		console.log("inside!")

		lists = <RenderNewsList news={this.state.serachResult} title="Search Results" errorText="No Result Found"/>
		
	}

	if(this.state.searched==true && this.state.serachResult!=null ){
			return(
				<div>
					{/* <RenderNavbar/> */}
					{lists}
				</div>
			)
				
			
	}else if(this.state.searched==true && this.state.serachResult==null ){
		return(
			<div>
				{/* <RenderNavbar/> */}
				<h2>NO result found!</h2>
			</div>
		)
			
		
	}


	  let listCode=(
        <div className="Spinner" >
            <Backdrop show={true}/>
            <Spinner show={true}/>
        </div>);
	if(!this.state.loading)
	{
		listCode=(
			<div>
			  
			  <RenderJumbotron toggle={this.toggle} isOpen={this.state.isOpen} news={this.state.topnews}/>
			  <div >
					<RenderNavbar />
			  </div>

			  <div className="container" >
				<div className="row" >

				<div className="col-12 searchFom align-items-right" style={{marginBottom:"20px"}}>
						<form className="float-right"  onSubmit={this.onSearch}>  
					
						<div className="form-group searchBox" >                      
							<input  type="text" placeholder="Search here"
							onChange={this.changeSerachText}
							
							className="form-control form-group"
							/>
						</div>
				
		
						
						<input type="submit" 
						value="Search"
						className="btn btn-danger searchButton"
						/>

					
						</form>
					</div>
					{/*top stories section*/}
					<div className="col-12 col-sm-9">
						<div className="row justify-content-start">
							<div className=" col-12">
								<h1>Top Stories</h1>	
							</div>	
						</div>
				
					<RenderMedialeft news={this.state.news[0]} />
					<RenderMediaright news={this.state.news[1]} />
					<RenderMedialeft news={this.state.news[2]} />
					<RenderMediaright news={this.state.news[3]} />
					</div>
  
				{/*right side stories section*/}
					<div className="col-12 col-sm-3">
					<RenderSideCards news={this.state.sidenews}/>
					</div>
			  	</div>
			  </div>
			  	   {/*opinion,videos and images section*/}

			{/* <div className="container">
		   		<RenderSection news1={this.state.news[0]} news2={this.state.news[1]} news3={this.state.news[3]}/>
	   		</div> */}

			<div className='container' style={{marginBottom:'8%'}}>
				<h1 style={{color:'steelblue'}}>National</h1>
				<hr color='black'/>
			</div>
			<div className='container' style={{marginTop:'2%'}}>
				<RenderSection news={this.state.nationalnews} />
			</div>
			
			<div className='container' style={{marginBottom:'8%'}}>
				<h1 style={{color:'steelblue'}}>World </h1>
				<hr color='black'/>
			</div>
			<div className='container' style={{marginTop:'2%'}}>
				<RenderSection news={this.state.worldnews} />
			</div>

			<div className='container' style={{marginBottom:'8%'}}>
				<h1 style={{color:'steelblue'}}>Technology </h1>
				<hr color='black'/>
			</div>
			<div className='container' style={{marginTop:'2%'}}>
				<RenderSection news={this.state.technews} />
			</div> 

			<div className='container' style={{marginBottom:'8%'}}>
				<h1 style={{color:'steelblue'}}>Sports</h1>
				<hr color='black'/>
			</div>
			<div className='container' style={{marginTop:'2%'}}>
				<RenderSection news={this.state.sportsnews} />
			</div>

			<div className='container' style={{marginBottom:'8%'}}>
				<h1 style={{color:'steelblue'}}>opinions</h1>
				<hr color='black'/>
			</div>
			<div className='container' style={{marginTop:'2%'}}>
				<RenderSection news={this.state.opinions} />
			</div>

			<div className='container' style={{marginBottom:'8%'}}>
				<h1 style={{color:'steelblue'}}>Top News From BBC</h1>
				<hr color='black'/>
			</div>
			<div className='container' style={{marginTop:'2%'}}>
				<RenderAggSection news={this.state.bbcnews} />
			</div>

			<div className='container' style={{marginBottom:'8%'}}>
				<h1 style={{color:'steelblue'}}>Top News From CNN</h1>
				<hr color='black'/>
			</div>
			<div className='container' style={{marginTop:'2%'}}>
				<RenderAggSection news={this.state.cnnnews} />
			</div>
  
			
		  </div>
		);
	}
	  return(
		  <div>
			  {listCode}
		  </div>
	  );
	// return (
	// 	//main div start
	//   <div>
	// 	{/*homepage image jumbotron*/}
	// 	<RenderJumbotron toggle={this.toggle} isOpen={this.state.isOpen} news={this.props.news}/>
  
	// 	{/*navbar */}

  
  

  
  

  
  
	//    {/*politics main story and side stories section*/}

  
	//   </div>
  
	// );
  }
  
}

export default Home;