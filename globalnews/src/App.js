import './App.css';
import { Component } from 'react';
import Home from './components/HomeComponent';
import Main from './components/MainComponent';
import UserProvider from './providers/UserProvider';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {

  render() {
    return (
    	//   <UserProvider>
    	  	<BrowserRouter>
	        <div className="App">
	          <Main />
	        </div>
	      </BrowserRouter>
    	//   </UserProvider>
    );
  }

}

export default App;
