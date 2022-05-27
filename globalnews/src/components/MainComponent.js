import React, { Component } from 'react';
import { NEWSES } from '../shared/newses';
import { COMMENTS } from '../shared/comments';
import Lists from './NewslistComponent';
import NewsDetail from './SinglenewsComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import ShowPendingReports from '../container/ShowPendingReports';
import ShowOwnReports from '../container/ShowOwnReports';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UserPage from './UserPage';
import PasswordReset from './passwordreset';
import ShowRequests from '../container/showRequests';
import Poll from "../container/poll"
import PollAddition from '../container/PollAddition'
import EditorComponent from './CreateNews/writenewsComponent';
import RenderNavbar from './UI/NavBarComponent';
import Header from './HeaderComponent';
import StaffRegister from './StaffRegister';



class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
        newses: NEWSES,
        comments: COMMENTS,
        
    };
  }



  render() {

    const HomePage = () => {
        return(
            <Home
            news={this.state.newses.filter((news) => news.featured)[0]}
            />
        );
    }

    const ListCat = ({match}) => {
      return(
           <Lists 
             cat={match.params.cid}
             
          />
      );
    };

    const pendingReportsHandler= () =>{
      return(
        <ShowPendingReports/>
      );
    }

    const ownReportsHandler= () =>{
      return(
        <ShowOwnReports/>
      );
    }

    const placementHandler = ()=>{
      return(
        <ShowRequests/>
      )
    }
    const singlePageHandler=() =>{
      return (
        <NewsDetail  tempNews={false}/>
      ); 
    }
    const tempSinglePageHandler = () =>{
      return (
        <NewsDetail  tempNews={true}/>
      );
    }
    

    return (
      <div>
        <Header/>
        <Switch>
              <Route path='/home' component={() => <Home />} />
              <Route exact path='/lists/:cid' component={ListCat} />
              <Route exact path='/pending' component={pendingReportsHandler}/>
              <Route exact path='/own' component={ownReportsHandler}/>
              <Route exact path='/requests' component={placementHandler}/>
              <Route exact path='/news/:newsId' component={singlePageHandler}/>
              <Route exact path='/temp/:newsId' component={tempSinglePageHandler}/>
              <Route path="/signin" component={() => <SignIn/>}/>
              <Route path="/signup" component={() => <SignUp/>}/>
              <Route path="/staffRegister" component={() => <StaffRegister/>}/>
              <Route path="/passwordreset" component={() => <PasswordReset/>}/>
              <Route exact path='/user' component={UserPage} />
              <Route exact path='/poll' component={()=><Poll/>}/>

              <Route exact path='/addpoll' component={()=><PollAddition/>}/>

              <Route exact path='/writenews' component={EditorComponent} />

              {/* <Route exact path='/user' component={UserPage} /> */}
              
              <Redirect to="/home" />
          </Switch>
        <Footer/>  
      </div>
    );
  }
}

export default Main;