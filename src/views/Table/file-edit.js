import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';
import { Route, Router, NavLink } from "react-router-dom";
import { c_id } from './Table';
import { a_id } from '../Pending/Awaiting';
import { p_id } from '../Pending/Processing';
import { d_id } from '../Pending/Completed';
import axios from 'axios';

var default_process_value = null;
var default_Print_status="none";
var default_Shipping_status= "none";
var default_Tracking_Number="none";
var default_Courier_service="none";
var order_id = "";
 

class FileEdit extends Component {
  constructor(props) {
    super(props);

    console.log("this.props.myProp", this.props.myProp);
    this.state = {
      files: [{
        _id: null,
        fileId: null,
        processLabel: null,
        material: null,
        color: null,
        quality: null,
        density: null,
        itemTotal: null,
        quantity: null,
      }],

      users: [],
      orders: [],
      materials: [],
      process: [],
      colors: [],
      quality: [],
      density: [],
      status: {
        Created_At: new Date().toLocaleString(),
        Handled_By: 'Natraj',
        Print_status: default_Print_status,
        Shipping_status: default_Shipping_status,
        Tracking_Number: default_Tracking_Number,
        Courier_Services: default_Courier_service
      },
      process_value: default_process_value,
      material_value:"",

      // materialPrice = this.files.materialPrice,
      // qualityMultiplier = this.quality.qualityMultiplier,
      // densityMultiplier = this.

    };


  }

  componentDidMount() {
    // order_id = c_id;
  
      if(a_id !== null){
        order_id = a_id
     }
     else if(p_id !== null){
      order_id = p_id
   }
   else if(d_id !== null){
    order_id = d_id
 }
 else if(c_id !== null){
  order_id = c_id
}

//    console.log('c_id:',c_id);
//    console.log('a_id',a_id);
//    console.log('p_id',p_id)




    console.log('c_id from file edit', order_id);
    axios.get(`http://localhost:5000/files/${order_id}`)
      .then((response) => {
        console.log("Response", response.data);
        this.setState({
          files: response.data
        })
        this.state.files.map(file => {
          console.log('file.process', file.process);
          this.state.process_value = file.process

        })
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get(`http://localhost:5000/orders/${order_id}`)
      .then((response) => {
        console.log("Response", response.data);
        this.setState({
          orders: response.data
        })

        {this.state.orders.map(order => {
            
          const { status } = this.state;
          const newStatus = {
            ...status,
            Handled_By:order.handled_By,
            Print_status: order.print_status,
           Shipping_status: order.shipping_status,
          Tracking_Number: order.tracking_number,
          Courier_Services:order.courier_services
          };
          this.setState({ status: newStatus });
 })}

      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get(`http://localhost:5000/user/${order_id}`)
      .then((response) => {
        console.log("Response", response.data);
        this.setState({
          users: response.data
        })
          
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get(`http://localhost:5000/process`)
      .then((response) => {
        console.log("Process", response.data);
        this.setState({
          process: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    axios.get(`http://localhost:5000/materials`)
      .then((response) => {
        console.log("materials", response.data);
        this.setState({
          materials: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    axios.get(`http://localhost:5000/colors`)
      .then((response) => {
        console.log("colors", response.data);
        this.setState({
          colors: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get(`http://localhost:5000/quality`)
      .then((response) => {
        console.log("quality", response.data);
        this.setState({
          quality: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      }); axios.get(`http://localhost:5000/density`)
        .then((response) => {
          console.log("density", response.data);
          this.setState({
            density: response.data
          })
        })
        .catch(function (error) {
          console.log(error);
        });




  }

  process_change = (event) => {
    console.log('process_value:', event.target.value)
    this.setState({ process_value: event.target.value });
  }
  material_change = (event) => {
    console.log('material:', event.target.value)
    this.setState({ material_value: event.target.value });
  }



  handleChangeFor = (propertyName) => (event) => {
    const { status } = this.state;
    const newStatus = {
      ...status,
      [propertyName]: event.target.value
    };
    this.setState({ status: newStatus });
  }




  updateOrder = () => {
    axios.patch(`http://localhost:5000/orders/${order_id}`, this.state.status)
      .then((response) => {
        alert("changes updated successfully");
        console.log("After updating message", response.data);
        

      })
      .catch(function (error) {
        console.log(error);
        alert("changes can not be updated");
      });
  }

  sendemail=()=>{

    var r = window.confirm(" confirm to send email");
     if (r == true) {
      
      axios.post(`http://localhost:5000/mail/${order_id}`,this.state.status)
      .then((response) => {
        alert("email has been sent");
      })
      .catch(function (error) {
        console.log(error);
        alert("changes can not be updated");
      });

    } else {
       
  }
 


   
  }

  //   calculatePrice = (volume,materialPrice, qualityMultiplier, densityMultiplier) => {


  //       file.price = Math.round(
  //         volume *
  //           materialPrice *
  //           qualityMultiplier *
  //           fdensityMultiplier
  //       );

  //  }







  render() {
    console.log('orders:', this.state.orders);
    console.log('c_id from file edit', order_id);
    console.log('process:', this.state.process);
    console.log('colors:', this.state.colors);
    console.log('materials:', this.state.materials);
    console.log('quality:', this.state.quality);
    console.log('density:', this.state.density);
    console.log('process_value', this.state.process_value);
    console.log('material_value', this.state.material_value);
    console.log('Print_status', this.state.status.Print_status);
    console.log('Courier_service', this.state.status.Courier_Services);
    // {this.state.orders.map(order => {
    //    console.log("order.payment_data[0].status",order.payment_data[0].status)
    // })}

    return (
      <div className="animated fadeIn">

        <Row>
          <Col xs="12" lg="4">
            <h5>Email</h5>
            {this.state.users.map(user => {
              return <input key={user._id} type="text" defaultValue={user.email} style={{ width: '100%' }} />
            })}
            <Row>
              <Col xs="12" lg="12">

                <div className="card" style={{ marginTop: '9%' }}>

                  <div className="card-body">
                    <div className="bd-example">
                      <dl className="row">
                        <dt className="col-sm-7">Created Date</dt>
                        <dd className="col-sm-5"> {this.state.orders.map(order => {
                          return <div>{order.created_at}</div>

                        })}   </dd>

                        <dt className="col-sm-7">Handled By</dt>
                        <dd className="col-sm-5">
                          <select onChange={this.handleChangeFor('Handled_By')} value={this.state.status.Handled_By} style={{ width: '113%' }}>
                            {this.state.orders.map(order => {
                                 return ([<option key={order._id} selected="selected" hidden>{order.handled_By}</option>,
                                ])
                               })}
                               <option value='Natraj' >Natraj</option>,
                                   <option value='Ram' >Ram</option>,
                                     <option value='Anvesh' >Anvesh</option>,
                                      
                            })}
                          </select>
                        </dd>

                        <dt className="col-sm-7">Print Status</dt>
                        <dd className="col-sm-5">
                          <select onChange={this.handleChangeFor('Print_status')} value={this.state.status.Print_status} style={{ width: '113%' }}>
                            {this.state.orders.map(order => {

                              return ([<option key={order._id} selected="selected" hidden>{order.print_status}</option>,
                             ])
                            })}
                            <option value='Awaiting Confirmation' >Awaiting Confirmation</option>,
                                <option value='File Error' >File Error</option>,
                                  <option value='Print in Progress' >Print in Progress</option>,
                                  <option value='Printing Complete' >Printing Complete</option>
                            </select>
                            
                        </dd>

                        <dt className="col-sm-7 ">Shipping Status</dt>
                        <dd className="col-sm-5">
                          <select onChange={this.handleChangeFor('Shipping_status')} value={this.state.status.Shipping_status} style={{ width: '113%' }}>
                            {this.state.orders.map(order => {
                              return <option key={order._id} selected="selected" hidden>{order.shipping_status}</option>
                            })}
                            <option value="Preparing for shipping">Preparing for shipping</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </dd>
                        {/* <dt className="col-sm-7"> payment status</dt>
                        <dd className="col-sm-5">
                          {this.state.orders.map(order => {
                            return <input type="text"
                              
                              defaultValue={order.payment_data[0].status}
                              style={{ width: '113%' }} />
                          })}
                          </dd> */}
                        <dt className="col-sm-7">Tracking Number</dt>
                        <dd className="col-sm-5">
                          {this.state.orders.map(order => {
                            return <input type="text"
                              onChange={this.handleChangeFor('Tracking_Number')}
                              defaultValue={order.tracking_number}
                              style={{ width: '113%' }} />
                          })}
                          </dd>

                          <dt className="col-sm-7 ">Courier Services</dt>
                        <dd className="col-sm-5">
                          <select onChange={this.handleChangeFor('Courier_Services')} value={this.state.status.Courier_Services} style={{ width: '113%' }}>
                            {this.state.orders.map(order => {
                              return <option key={order._id} selected="selected" hidden>{order.courier_services}</option>
                            })}
                            <option value="To be updated">To be updated</option>
                            <option value="FedEx">FedEx</option>
                            <option value="DTDC">DTDC</option>
                            <option value="Franch Express">Franch Express</option>
                            <option value="Aramex">Aramex</option>
                            <option value="Professional Courier">Professional Courier</option>
                            <option value="DHL">DHL</option>
                            <option value="Self Pickup">Self Pickup</option>
                          </select>
                        </dd>

                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs="12" lg="4">

            <div className="card">
              <div className="card-header">
                Billing details
          </div>
              <div className="card-body">
                <div className="bd-example">

                  {this.state.users.map(user => {
                    return <dl key={user._id} className="row">
                      <dt className="col-sm-4">Name</dt>
                      <dd className="col-sm-8">{user.name}</dd>

                      <dt className="col-sm-4">Company</dt>
                      <dd className="col-sm-8">
                        {user.company}
                      </dd>

                      <dt className="col-sm-4">GSTIN</dt>
                      <dd className="col-sm-8"> {user.gst}</dd>

                      <dt className="col-sm-4 ">Address</dt>
                      <dd className="col-sm-8">{user.billing_address}</dd>

                      <dt className="col-sm-4">City</dt>
                      <dd className="col-sm-8">{user.city}</dd>

                      <dt className="col-sm-4">State</dt>
                      <dd className="col-sm-8">{user.state}</dd>


                      <dt className="col-sm-4">Pincode</dt>
                      <dd className="col-sm-8">{user.pin}</dd>

                      <dt className="col-sm-4">Contact</dt>
                      <dd className="col-sm-8">{user.mobile}</dd>
                    </dl>
                  })}
                </div>
              </div>
            </div>
          </Col>
          <Col xs="12" lg="4">
            <div className="card">
              <div className="card-header">
                Shipping details
          </div>
              <div className="card-body">
                <div className="bd-example">

                  {this.state.orders.map(order => {
                    return <dl key={order._id} className="row">
                      <dt className="col-sm-4">Name</dt>
                      <dd className="col-sm-8">{order.name}</dd>

                      <dt className="col-sm-4">Company</dt>
                      <dd className="col-sm-8">
                        {order.company}
                      </dd>



                      <dt className="col-sm-4 ">Address</dt>
                      <dd className="col-sm-8">{order.shipping_address}</dd>

                      <dt className="col-sm-4">City</dt>
                      <dd className="col-sm-8">{order.city}</dd>

                      <dt className="col-sm-4">State</dt>
                      <dd className="col-sm-8">{order.state}</dd>


                      <dt className="col-sm-4">Pincode</dt>
                      <dd className="col-sm-8">{order.pin}</dd>

                      <dt className="col-sm-4">Country</dt>
                      <dd className="col-sm-8">India</dd>

                      <dt className="col-sm-4">Contact</dt>
                      <dd className="col-sm-8">{order.mobile}</dd>
                    </dl>

                  })}
                </div>
              </div>
            </div>

          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> File Requests
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>

                      <th>File Name</th>
                      <th>Technology</th>
                      <th>Material</th>
                      <th>Color</th>
                      <th>Quality</th>
                      <th>Density</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Item Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.files.map(file => {
                      // this.calculatePrice(file.volume);
                      return <tr key={file._id}>
                        <td><a href={"https://tus-server-file.s3.ap-south-1.amazonaws.com/" + file.fileId}  >{file.fileId}</a ></td>

                        <td>

                          <select onChange={this.process_change} value={this.state.value} >
                            <option value={file.process} selected hidden>{file.processLabel}</option>
                            {this.state.process.map(process => {
                               
                                return <option key={process._id} value={process.process} >{process.processLabel}</option>
                              

                            })}
                          </select>
                        </td>
                        <td>
                          <select  onChange={this.material_change} value={this.state.value} >
                            <option value={file.material} selected hidden>{file.materialLabel}</option>
                            {this.state.materials.map(material => {
                              if ( this.state.process_value === material.process) {
                                return <option key={material._id} value={material.material}>{material.materialLabel}</option>
                              }
                            })}
                          </select>
                        </td>

                        <td>
                          <select>
                            <option value={file.color} selected hidden>{file.colorLabel}</option>
                            {this.state.colors.map(color => {
                              if  (this.state.material_value === color.material) {
                                return <option key={color._id}>{color.colorLabel}</option>
                              }

                            })}
                          </select>
                        </td>
                        <td>
                          <select>
                            <option selected hidden>{file.qualityLabel}</option>
                            {this.state.quality.map(quality => {
                              if (this.state.process_value == quality.process) {
                                return <option key={quality._id}>{quality.qualityLabel}</option>
                              }

                            })}
                          </select>
                        </td>
                        <td>
                          <select>
                            <option selected hidden>{file.density}</option>
                            {this.state.density.map(density => {
                              if (file.density != density.density) {
                                return <option key={density._id}>{density.density}</option>
                              }

                            })}
                          </select>
                        </td>
                        <td> <input type="text" defaultValue={file.itemTotal} />    </td>
                        <td>
                          <select>
                            <option>{file.quantity}</option>
                          </select>
                        </td>
                        <td>{file.itemTotal}</td>
                      </tr>
                    })}
                  </tbody>
                </Table>

              </CardBody>
            </Card>
          </Col>
        </Row>

        <Table>

      <Row>
      <Col xs="12" lg="4"></Col>
      <Col xs="12" lg="4"></Col>
      <Col xs="12" lg="4">

<div className="card">
  <div className="card-header" align="center">
    Order Summary
</div>
  <div className="card-body">
    <div className="bd-example">

      {this.state.orders.map(order => {
        return <dl key={order._id} className="row" >
        <dd className="col-sm-1"></dd>
          <dt className="col-sm-5">No of files</dt>
          <dd className="col-sm-3" align="right">{order.uploadLength}</dd>
          <dd className="col-sm-2"></dd>
    
          <dd className="col-sm-1"></dd>
          <dt className="col-sm-5">subTotal</dt>
          <dd className="col-sm-3" align="right">
          ₹{order.subTotal}
          </dd><dd className="col-sm-2"></dd>
         
          <dd className="col-sm-1"></dd>
          <dt className="col-sm-5">Tax</dt>
          <dd className="col-sm-3" align="right"> ₹{order.tax}</dd>
          <dd className="col-sm-2"></dd> 

          <dd className="col-sm-1"></dd>
          <dt className="col-sm-5 ">Shipping</dt>
          <dd className="col-sm-3" align="right">₹{order.shippingCharge}</dd>
          <dd className="col-sm-2"></dd>
          
          <dd className="col-sm-1"></dd>
          <dt className="col-sm-5 ">Order Total</dt>
          <dd className="col-sm-3" align="right">₹{order.orderTotal}</dd>
          <dd className="col-sm-2"></dd>
       </dl>
      })}
    </div>
  </div>
</div>
</Col>
</Row>  
          <Row>
            <Col sm="6"></Col>
            <Col sm="2"><Button block color="success" onClick={this.sendemail}>Save and Send </Button></Col>
            <Col sm="2"><Button block color="success" onClick={this.updateOrder}>Save</Button></Col>
            <Col sm="2"><Button block color="primary" >Cancel</Button></Col>
          </Row>
        </Table>






      </div>

    );

  }
}

export default FileEdit;
