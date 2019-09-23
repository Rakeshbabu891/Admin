import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
 
 
import axios from 'axios';
// import { renderRoutes } from 'react-router-config';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const UserLogin = React.lazy(() => import('./views/Login/Login'));
const UserRegister = React.lazy(() => import('./views/Login/Register'));
 

class App extends Component {

  constructor(props) {
    super(props);
    }


  componentDidMount=() =>{
     axios.get(`http://localhost:5000/facebook/login`,{withCredentials: true}).then((response) =>{
      console.log('login:',response.data)
       this.setState({
          logged:response.data
        })
    }).catch((e)=>{
    console.log('error:',e)
  })
  
}

render() {
   return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/userLogin" name="Login Page1" render={props => <UserLogin {...props}/>} />
               
              <Route exact path="/userRegister" name="Register Page1" render={props => <UserRegister {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              {  this.state  &&
                <Route path="/" name="Home"  render={props => <DefaultLayout logged={this.state.logged} {...props}/>} />
              }
           </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
 