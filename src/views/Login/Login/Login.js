import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Button, Card, CardBody,CardHeader, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

var log = false;

class UserLogin extends Component {
  constructor(props) {
    super(props);
   this.state ={
        logged:false
   }

  }

  
  componentDidMount=() =>{
     axios.get(`http://localhost:5000/facebook/login`,{withCredentials: true}).then((response) =>{
      console.log('login:',response.data)
     
       
        console.log('logged',response.data);
  
        
          this.setState({
            logged:response.data
          })
          
          if(response.data == 'unkown'){
            alert('this email is restricted');
          }
    
  
  
    }).catch((e)=>{
      console.log('error:',e)
    })
    
  }

  

 submitHandler = () => {

  
      // axios.get("http://localhost:5000/facebook/auth/google")
      // fetch(`http://localhost:5000/facebook/login`,{mode: 'no-cors'})
      // .then((response)=>{

        // console.log("response",response)
          // console.log('login detail:',response)
        // this.setState({
        //   login:response.data.login,
        //   msg:response.data.info.message
        // })


      // })

//       var url = 'http://localhost:5000/facebook/login';
// fetch(url, {
//   method: 'GET',
//   headers:{
//     'X-Requested-With': 'XMLHttpRequest'
//   },
//   mode: 'no-cors'
// }).then(res => res.json())
// .then(response => console.log('Success:', response))
// .catch(error => console.error('Error:', error));
 }


  render() {
     if(this.state.login){
       return <Redirect to="/dashboard"/>
     }
     console.log('logged:',this.state.logged)
    return (
      <div>
          {/* <Button block color="primary"  href="http://localhost:5000/facebook/auth/google">Lognmoasdasd</Button> */}
          <Row >    
          <Col xs="12" sm="6" md="4" style={{margin:"13% auto"}}>
            <Card className="border-primary">
              <CardHeader align="center">
               Sign in with google
              </CardHeader>
              <CardBody align="center"  >
                 <div><img src="https://www.3ding.in/img/3d.png"/></div>
                  <h4>Welcome to 3ding </h4><br/><br/>
                 <Button className="btn-google-plus btn-brand mr-1 mb-1" href="http://localhost:5000/facebook/auth/google"><i className="fa fa-google-plus"></i><span>Google+</span></Button>
                 {/* <Button className="btn-google-plus btn-brand mr-1 mb-1" onClick={this.submitHandler} ><i className="fa fa-google-plus"></i><span>Google+</span></Button> */}
              </CardBody>
            </Card>
          </Col>
          </Row>{
            this.state.logged =='unknown' ?
         (<Row > 
          <Col xs="12" sm="6" md="4"  >
          <h4> not Welcome to 3ding </h4>
          </Col>
         </Row>):null
          }
    </div>
    );
  }
}

export default UserLogin;
export {log};