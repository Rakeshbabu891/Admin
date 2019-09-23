import React, { Component } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
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
      click_id:null
     };
    
  }

  componentDidMount(){
    axios.get("http://localhost:5000/orders")
  .then( (response) => {
    console.log("Response", response.data);
  this.setState({
      orders: response.data.reverse()
  })
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




render() {
  

console.log('c_id:',c_id);
return (
   
     
      <div className="animated fadeIn">
          
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
</div>

    );
   
  }
}
export {c_id}
export default Upload;
