import React, { Component } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {Route,Router,NavLink} from "react-router-dom";
import FileEdit from './File';
import axios from 'axios';

 var c_id = null;
 
class Upload extends Component {
  constructor(props) {
    
    super(props);
     this.state = {
      orders: [{
        name:null,
        email:null,
        mobile:null,
        _id:null,
        order_id:null
      }],
      currentOrderNumber:0,
      orders2:[],
      click_id:null
     };

     
    
  }

  componentDidMount(){
    axios.get(`http://localhost:5000/orders/skip/0`)
  .then( (response) => {
    console.log("Response", response.data);
  this.setState({
      orders: response.data
  })
  // setTimeout(() => {this.DisplayOrders();}, 1000)

  })  
  .catch(function (error) {
    console.log(error);
  });
  
}

create_click_id=(order_id)=>{

  c_id = order_id;


  console.log("this id clicked",order_id);
  this.setState({
    click_id: order_id
})
 
}

getData =() =>{
  console.log("currentOrderNumber:",this.state.currentOrderNumber);
  axios.get(`http://localhost:5000/orders/skip/${this.state.currentOrderNumber}`)
  .then( (response) => {
    console.log("Response", response.data);
    if(response.data.length !== 0){
      this.setState({
        orders: response.data
    })
    }else{
      this.state.currentOrderNumber = this.state.currentOrderNumber-100
    }
})  
  .catch(function (error) {
    console.log(error);
  });
}


getNextOrders = () => {
   var nextOrderNumber =  this.state.currentOrderNumber +100
   this.state.currentOrderNumber = nextOrderNumber
   this.getData();
  }
getPreviousOrders = () => {
  var previousOrderNumber =  this.state.currentOrderNumber-100
  this.state.currentOrderNumber = previousOrderNumber
  if(this.state.currentOrderNumber < 0){
    this.state.currentOrderNumber = 0
  }
  
  this.getData();
}

 render() {
   var from = this.state.currentOrderNumber+1
   var to  = this.state.currentOrderNumber + 101
   
 
return (
   
     
      <div className="animated fadeIn">

                  <Pagination>
                  <PaginationItem>
                    <PaginationLink previous tag="button" onClick = {this.getPreviousOrders}></PaginationLink>
                  </PaginationItem>
                 <h6 style={{padding:"5px"}}>{from} to {to}</h6>
                  <PaginationItem>
                    <PaginationLink next tag="button" onClick = {this.getNextOrders}></PaginationLink>
                  </PaginationItem>
                </Pagination>
          
         <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Simple Table
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                  <th>order id</th>
                  <th>Date</th>
                  <th>name</th>
                  <th>Order Total</th>
                    
                  </tr>
                  </thead>
                   <tbody>
                   {this.state.orders.map(order => {
                    {/* {b.map(order => { */}
                       
                     if(order.order_placed !== true ){
                      
                     return <tr key={order._id}>
                       
                     <td><NavLink  to="/files" onClick={()=> this.create_click_id(order.order_id)}>{order.order_id}</NavLink ></td>
                     {/* <td onClick={()=> this.create_click_id(order.order_id)}>{order.order_id}</td> */}
                      <td>{order.created_at}</td>
                      <td>{order.name}</td>
                      <td>{order.orderTotal}</td>
                      
                     
                    </tr>
                     }})}
                   </tbody>

                   
                </Table>
               
              </CardBody>
            </Card>
          </Col>
    </Row>
    <Pagination>
                  <PaginationItem>
                    <PaginationLink previous tag="button" onClick = {this.getPreviousOrders}></PaginationLink>
                  </PaginationItem>

                   <h6 style={{padding:"5px"}}>{from} to {to}</h6>
                  {/* <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">4</PaginationLink>
                  </PaginationItem> */}
                  <PaginationItem>
                    <PaginationLink next tag="button" onClick = {this.getNextOrders}></PaginationLink>
                  </PaginationItem>
                </Pagination>
</div>

    );
   
  }
}
export {c_id}
export default Upload;
