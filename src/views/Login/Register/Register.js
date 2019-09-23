import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);


const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};





class UserRegister extends Component {

  constructor(props) {
    super(props);
     this.state ={
       username : null,
       email :null,
       password:null,
       password2:null,
       register_success:"",
       formErrors:{
        username : "",
        email :"",
        password:"",
        password2:""
       }
     }
   }


   submitHandler =(e) =>{
    e.preventDefault();
    if(formValid(this.state)){
      console.log(`
      --SUBMITTING--
      First Name: ${this.state.username}
      Last Name: ${this.state.email}
      Email: ${this.state.password}
      Password: ${this.state.password2}
    `); 
    axios.post(`http://localhost:5000/admin-login/register`,this.state)
    .then((response) => {
        console.log("response after submit form:",response)
        if(response.data === false){
          alert("email already exist");
        }
        this.setState({
          register_success:response.data
        })
      })
    .catch(function (error) {
      console.log(error);
       
    });
 

    }else{
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  }


   inputChangeHandler =(e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "username":
        formErrors.username =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
       
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
        case "password2":
        formErrors.password2 =
          (value !== this.state.password ) ? "password does not match" : "";
        break;  
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  
     
   }





  render() {
   console.log('this.state.formError.username',this.state.formErrors.username)
   if (this.state.register_success) {
    var url = `/userlogin`;
    alert("Registration successfull");
     return <Redirect push to={url} />
      
    }
    
    

    const { formErrors } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    {formErrors.username.length > 0 && (
                        <div style={{color:'red'}}>{formErrors.username}</div>
                       )}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      
                      <Input type="text"
                       name="username"
                       defaultValue={this.state.username}
                       onChange={this.inputChangeHandler}
                       placeholder="Username" 
                       autoComplete="username" /> 
                      </InputGroup>
                      {formErrors.email.length > 0 && (
                       <span style={{color:'red'}}>{formErrors.email}</span>
                      )}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                       name="email"
                       defaultValue={this.state.email}
                       onChange={this.inputChangeHandler}
                       placeholder="Email" 
                       autoComplete="email" />
                    </InputGroup>
                    {formErrors.password.length > 0 && (
                       <span style={{color:'red'}}>{formErrors.password}</span>
                      )}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password"
                       name="password"
                       defaultValue={this.state.password}
                       onChange={this.inputChangeHandler}
                       placeholder="Password" 
                       autoComplete="new-password" />
                    </InputGroup>
                    {formErrors.password2.length > 0 && (
                       <span style={{color:'red'}}>{formErrors.password2}</span>
                      )}
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password"
                        name="password2"
                        defaultValue={this.state.password2}
                        onChange={this.inputChangeHandler}
                        placeholder="Repeat password"
                        autoComplete="new-password" />
                    </InputGroup>
                   
                    <Button color="success" onClick={this.submitHandler} block>Create Account</Button>
                  </Form>
                </CardBody>
                {/* <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default UserRegister;
