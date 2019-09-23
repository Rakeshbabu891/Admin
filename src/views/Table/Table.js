import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {Route,Router,NavLink} from "react-router-dom";
import FileEdit from './file-edit';
import axios from 'axios';

 var c_id = null;
 var order_plced="";
class NewTable extends Component {
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
  
  {this.state.orders.map(order => {
    console.log('c_id:',c_id,"order_placed",order.order_placed);
console.log('c_id:',c_id);})}

 

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
                  <th>Status</th>
                    
                  </tr>
                  </thead>
                   <tbody>
                   {this.state.orders.map(order => {
                     if(order.order_placed === true){
                     return <tr key={order._id}>
                     <td><NavLink  to="/file-edit" onClick={()=> this.create_click_id(order.order_id)}>{order.order_id}</NavLink ></td>
                     {/* <td onClick={()=> this.create_click_id(order.order_id)}>{order.order_id}</td> */}
                     <td>{order.created_at}</td>
                      <td>{order.name}</td>
                      <td>{order.orderTotal}</td>
                      {
                        ( <td>{ ((order.shipping_status != 'Shipped' ) && (order.shipping_status !== 'Delivered') && (order.print_status !== 'Awaiting Confirmation') ) &&  <Badge color="warning">Processing</Badge>}
                              { ((order.shipping_status != 'Shipped' ) && (order.shipping_status !== 'Delivered') && (order.print_status === 'Awaiting Confirmation') ) &&  <Badge color="danger">Awaiting</Badge>} 
                        
                          {((order.shipping_status == 'Shipped' ) || (order.shipping_status == 'Delivered')) &&<Badge color="success">Completed</Badge>}   </td>) 
                      }
                          
                      
                    </tr>
                    }
                     
                    
                    
                    
                    
                    
                    })}
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
export default NewTable;
