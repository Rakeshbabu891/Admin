import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';
import { Route, Router, NavLink } from "react-router-dom";
import { c_id } from './Upload';
import axios from 'axios';
import Select from "react-select";
import "./table.css";

var default_process_value = null;
var default_Print_status="none";
var default_Shipping_status= "none";
var default_Tracking_Number="none";


var processOptions = [];
var materialOptions = [];
var colorOptions = [];
var qualityOptions = [];
var densityOptions = [];

var filesArray = [];
var subTotal = 0;
var tax = 0;
var orderTotal = 0;
var shippingCharge = 0;
var fileArrayLenth = 0;

var orderSummary = [];
var external_access = false

var Process= {
  value: "fdm",
  label: "FDM/FFF"
}
var Material= {
  value: "fdm-pla",
  label: "PLA"
}
var Color= {
  value: "fdm-pla-white",
  label: "White"
}
var Quality= {
  value: "fdm-300-microns",
  label: "Draft 300 Microns"
}
var Density= {
  value: "fdm-density-20",
  label: "20%"
}
var Quantity={
  value: 1,
  label: "1"
}


const customStyles = {
  container: (provided, state) => ({
    ...provided,
    fontSize: 13
    // overflow: "visible"
  })
};




class File extends Component {
  constructor(props) {
    super(props);

    console.log("this.props.myProp", this.props.myProp);
//     this.state = {
//       files: [{
//         _id: null,
//         fileId: null,
//         processLabel: null,
//         material: null,
//         color: null,
//         quality: null,
//         density: null,
//         itemTotal: null,
//         quantity: null,
//       }],

//       users: [],
//       orders: [],
//       materials: [],
//       process: [],
//       colors: [],
//       quality: [],
//       density: [],
//       status: {
//         Created_At: new Date().toLocaleString(),
//         Handled_By: 'Natraj',
//         Print_status: default_Print_status,
//         Shipping_status: default_Shipping_status,
//         Tracking_Number: default_Tracking_Number
//       },
//       process_value: default_process_value,
//       material_value:"",
//  };

this.getProcessOptions();
this.getMaterialOptions("");
this.getColorOptions("");
this.getQualityOptions("");
this.getDensityOptions("");

this.state = {
  // uploadLength: uploadLength,
  filesArray: [],

  defaultProcess: {
    value: "fdm",
    label: "FDM/FFF"
  },
  defaultMaterial: {
    value: "fdm-pla",
    label: "PLA"
  },
  defaultColor: {
    value: "fdm-pla-white",
    label: "White"
  },
  defaultQuality: {
    value: "fdm-300-microns",
    label: "Draft 300 Microns"
  },
  defaultDensity: {
    value: "fdm-density-20",
    label: "20%"
  },
  defaultQuantity:{
    value: 1,
    label: "1"
  },
      users: [],
      orders: [],
  status: {
    Created_At: new Date().toLocaleString(),
    Handled_By: 'Natraj',
    Print_status: default_Print_status,
    Shipping_status: default_Shipping_status,
    Tracking_Number: default_Tracking_Number
  },
  customized_details :{
    customized_email:"",
    customized_mobile:""
  }
 


}
      


  }

  componentDidMount() {
    console.log('c_id from file edit', c_id);
    axios.get(`http://localhost:5000/files/${c_id}`)
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

    axios.get(`http://localhost:5000/orders/${c_id}`)
      .then((response) => {
        console.log("Response", response.data);
        this.setState({
          orders: response.data
        })

        {this.state.orders.map(order => {
            
          const { status } = this.state;
          const newStatus = {
            ...status,
            Print_status: order.print_status,
           Shipping_status: order.shipping_status,
          Tracking_Number: order.tracking_number
          };
          this.setState({ status: newStatus });
 })}

      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get(`http://localhost:5000/user/${c_id}`)
      .then((response) => {
        console.log("Response", response.data);
        this.setState({
          users: response.data
        })
          
      })
      .catch(function (error) {
        console.log(error);
      });
      this.getFiles();

    // axios.get(`http://localhost:5000/process`)
    //   .then((response) => {
    //     console.log("Process", response.data);
    //     this.setState({
    //       process: response.data
    //     })
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // axios.get(`http://localhost:5000/materials`)
    //   .then((response) => {
    //     console.log("materials", response.data);
    //     this.setState({
    //       materials: response.data
    //     })
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // axios.get(`http://localhost:5000/colors`)
    //   .then((response) => {
    //     console.log("colors", response.data);
    //     this.setState({
    //       colors: response.data
    //     })
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // axios.get(`http://localhost:5000/quality`)
    //   .then((response) => {
    //     console.log("quality", response.data);
    //     this.setState({
    //       quality: response.data
    //     })
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   }); axios.get(`http://localhost:5000/density`)
    //     .then((response) => {
    //       console.log("density", response.data);
    //       this.setState({
    //         density: response.data
    //       })
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });




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




  // updateOrder = () => {
  //   axios.patch(`http://localhost:5000/orders/${c_id}`, this.state.status)
  //     .then((response) => {
  //       alert("changes updated successfully");
  //       console.log("After updating message", response.data);
        

  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       alert("changes can not be updated");
  //     });
  // }

  // sendemail=()=>{
  //   axios.post(`http://localhost:5000/mail/${c_id}`,this.state.status)
  //     .then((response) => {
  //       alert("email has been sent");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       alert("changes can not be updated");
  //     });
  // }
  sendemail=()=>{

    var r = window.confirm(" confirm to send email");
     if (r == true) {
      
      axios.post(`http://localhost:5000/mail/quote/${c_id}`,this.state.customized_details)
      
.then((response) => {
        alert("email has been sent");
      })
      .catch(function (error) {
        console.log(error);
        alert("changes can not be updated");
      });

    } else {
       
  }}

  //   calculatePrice = (volume,materialPrice, qualityMultiplier, densityMultiplier) => {


  //       file.price = Math.round(
  //         volume *
  //           materialPrice *
  //           qualityMultiplier *
  //           fdensityMultiplier
  //       );

  //  }




  //Write to DB
  updateOrder() {
    // var index = filesArray.findIndex(file => file._id === fileId);
    console.log("Writing Order to DB");
    filesArray.forEach(file => {
      // console.log("File", file.index, JSON.stringify(file));
      fetch("http://localhost:5000/files/" + file._id, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        // body: JSON.stringify({ a: 1, b: "Textual content" })
        body: JSON.stringify(file)

    
      })
        .then(response => response.json())
        .then(resData => {
          console.log(resData);
        });
    });
   
  }

  getFiles() {
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://localhost:5000/files/"; // site that doesn’t send Access-Control-*
    // fetch(url + this.orderId)
    fetch(url + c_id)
      .then(response => response.json())
      .then(resData => {
        filesArray = resData;
        this.setState({ filesArray: resData });
        // console.log("Order Data:", this.state.filesArray);
        // console.log("Global Order Data:", filesArray);
        setTimeout(() => { this.updateDefaultOptions();this.calculatePrice(); }, 1000);
        
      });
  }

  // Update Initial Options
  updateDefaultOptions() {
    console.log("Updating Default Options");
   
    // filesArray.map(file => {
    filesArray.forEach(file => {
      // Default Process
      if (file.process === undefined) {
        file.process = this.state.defaultProcess.value;
      }

      file.processLabel = processOptions.find(
        index => index.value === file.process
      ).label;

      console.log("Default Process", file.process, file.processLabel);

      // Default Material
      if (file.material === undefined) {
        file.material = this.state.defaultMaterial.value;
      }
      file.materialLabel = materialOptions.find(
        index => index.value === file.material
      ).label;
      file.materialPrice = materialOptions.find(
        index => index.value === file.material
      ).materialPrice;

    

      // Default Color
      if (file.color === undefined) {
        file.color = this.state.defaultColor.value;
      }
      file.colorLabel = colorOptions.find(
        index => index.value === file.color
      ).label;

      // console.log("Default Color", file.color, file.colorLabel);

      // Default Quality
      if (file.quality === undefined) {
        file.quality = this.state.defaultQuality.value;
      }
      file.qualityLabel = qualityOptions.find(
        index => index.value === file.quality
      ).label;
      file.qualityMultiplier = qualityOptions.find(
        index => index.value === file.quality
      ).qualityMultiplier;

      

      // Default Density
      if (file.density === undefined) {
        file.density = this.state.defaultDensity.value;
      }
      file.densityLabel = densityOptions.find(
        index => index.value === file.density
      ).label;
      file.densityMultiplier = densityOptions.find(
        index => index.value === file.density
      ).densityMultiplier;

      if (file.quantity === undefined) {
        file.quantity = 1;
      }

   
    }
  
  
  
  );
    // console.log(this.state.defaultProcess);
    console.log("Order Data", filesArray);
    // this.calculatePrice();
  }

  // Get Process Options

   process = null;
  getProcessOptions() {
  
    
    const url = "http://localhost:5000/process/"; // site that doesn’t send Access-Control-*
    console.log("before fetch starting");
    fetch(url)
      .then(response => response.json())
      .then(resData => {
        processOptions = resData.map(key => ({
          value: key.process,
          label: key.processLabel
        }));
        console.log("Global Process Options:", processOptions);
       this.process = processOptions;
      });
  }

  // Get Material Options
  getMaterialOptions(process) {
    fetch("http://localhost:5000/materials/" + process)
      .then(response => response.json())
      .then(resData => {
        materialOptions = resData.map(key => ({
          value: key.material,
          label: key.materialLabel,
          process: key.process,
          materialPrice: key.materialPrice
        }));

         
        console.log("Global Material Options:", materialOptions);
      });
  }

  // Get Color Options
  getColorOptions(material) {
    fetch("http://localhost:5000/colors/" + material)
      .then(response => response.json())
      .then(resData => {
        colorOptions = resData.map(key => ({
          value: key.color,
          label: key.colorLabel,
          material: key.material
        }));

        
        console.log("Global Color Options:", colorOptions);
      });
  }

  // Get Quality Options
  getQualityOptions(process) {
    fetch("http://localhost:5000/quality/" + process)
      .then(response => response.json())
      .then(resData => {
        qualityOptions = resData.map(key => ({
          value: key.quality,
          label: key.qualityLabel,
          process: key.process,
          qualityMultiplier: key.qualityMultiplier
        }));
 
        console.log("Global Quality Options:", qualityOptions);
      });
  }

  // Get Density Options
  getDensityOptions(process) {
    fetch("http://localhost:5000/density/" + process)
      .then(response => response.json())
      .then(resData => {
        densityOptions = resData.map(key => ({
          value: key.density,
          label: key.densityLabel,
          process: key.process,
          densityMultiplier: key.densityMultiplier
        }));

      
        console.log("Global Density Options:", densityOptions);
      });
  }

  // Calculate Price
  calculatePrice() {
    console.log("Calculating Price");

    subTotal = 0;

    filesArray.forEach(file => {
      

      file.materialPrice = materialOptions.find(
        index => index.value === file.material
      ).materialPrice;

      file.qualityMultiplier = qualityOptions.find(
        index => index.value === file.quality
      ).qualityMultiplier;

      file.densityMultiplier = densityOptions.find(
        index => index.value === file.density
      ).densityMultiplier;

      file.price = Math.round(
        file.volume *
          file.materialPrice *
          file.qualityMultiplier *
          file.densityMultiplier
      );

       

      file.itemTotal = file.price * file.quantity;
      if((file.itemTotal > 0) && (file.itemTotal < 100)){
        file.price=100;
        file.itemTotal = 100
      }
      subTotal += file.itemTotal;
      shippingCharge = 0;
      console.log(
        file.volume,
        file.materialPrice,
        file.qualityMultiplier,
        file.densityMultiplier,
        file.quantity,
        file.price,
        file.itemTotal
      );
    });

    tax = Math.round((subTotal * 18) / 100);

    if((subTotal <500) && (subTotal > 0) ){
      shippingCharge = 100;
      orderTotal = subTotal + tax + shippingCharge;
    }
    else{
      orderTotal = subTotal + tax;
    }
     
     
    console.log("Sub Total", subTotal);
    console.log("Tax", tax);
    console.log("Total", orderTotal);
    console.log("Order Data", filesArray);
 

    this.setState({
      state: this.state
    });
    this.updateOrder();
  }
  

  inputChangerHandler=(propertyName) => (event) =>{
    event.preventDefault()
    console.log(event.target.value)

    const { customized_details } = this.state;
    const newCustomer = {
      ...customized_details,
      [propertyName]: event.target.value
    };
    this.setState({ customized_details: newCustomer });
}







  render() {
    console.log('this.state.customized_details', this.state.customized_details);
    console.log('c_id from file edit', c_id);
    console.log('Print_status', this.state.status.Print_status);
    // {this.state.orders.map(order => {
    //    console.log("order.payment_data[0].status",order.payment_data[0].status)
    // })}

    return (
      <div className="animated fadeIn">
       {this.state.orders.map(order => {
         if(order.shipping_address){
        return <Row>
          <Col xs="12" lg="4">
            <h5>Email</h5>
            
              <input key={order._id} type="text" defaultValue={order.email} style={{ width: '100%' }} />
            
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
                              return <option key={order._id} selected="selected">{order.handled_By}</option>
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
                        <dt className="col-sm-7">tracking Number</dt>
                        <dd className="col-sm-5">
                          {this.state.orders.map(order => {
                            return <input type="text"
                              onChange={this.handleChangeFor('Tracking_Number')}
                              defaultValue={order.tracking_number}
                              style={{ width: '113%' }} />
                          })}


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
        }else{
          return <div>
                 <Row>
                 <Col xs="12" lg="4">
                  <h5>Email</h5>
                  {this.state.orders.map(order => {
                    return  <input  type="text" name="customized_email" onChange={this.inputChangerHandler('customized_email')} defaultValue="" style={{ width: '100%' }} />
                  })}
                 
                 </Col>
                 <Col xs="12" lg="4">
                  <h5>Mobile</h5>
                  {this.state.orders.map(order => {
                    return  <input  type="text" name="customized_mobile" onChange={this.inputChangerHandler('customized_mobile')}  defaultValue="" style={{ width: '100%' }} />
                  })}
                 
                 </Col>

                </Row>
                <br/><br/>
            </div>
        }})}
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> File Requests
              </CardHeader>
              <CardBody>
                {/* <Table responsive>
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
                </Table> */}



                <Table responsive align="center" responsive>
              <thead>
                <tr align="center">
                  <th className="align-middle">#</th>
                  <th className="align-middle" align="left" width="20%">
                    File Name
                    
                  </th>
                  <th className="align-middle " align="center"  >
                     <div className="a1">Technology<sup style={{color:'black'}}> ?</sup> <span className="tooltiptext"><b style={{fontWeight:"bold"}}>FFF/FDM</b>: The most affordable type of 3D Printing. Perfect for quick prototypes.
<br/><br/>More to be added soon...
  </span>  </div>
                     
                  </th>
                  <th className="align-middle" align="center">
                     <div className="a1">Material<sup style={{color:'black'}}>?</sup><span className="tooltiptext"> <b style={{fontWeight:"bold"}}>PLA</b>: The most affordable material in FDM.<br/><br/> 

<b style={{fontWeight:"bold"}}>ABS</b>: Choice of most Plastic Manufacturing industries. Can be grinded and sanded post 3D Printing.<br/><br/>

<b style={{fontWeight:"bold"}}>HIPS</b>: An Industrial Plastic that’s stronger & harder than PLA & ABS. Less prone to deformity.<br/><br/>

More to be added soon...
 </span></div> 
                  </th>
                  <th className="align-middle" align="center">
                    Color
                  </th>
                  <th className="align-middle" align="center">
                    <div className="a1"> Quality<sup style={{color:'black'}}>?</sup><span className="tooltiptext"><b style={{paddingLeft:"28%"}}>Layer Height</b> <br/><br/>Draft: 0.3 mm. Fast, Affordable & perfect for quick trials. Good for starters.<br/><br/>

Standard: 0.2 mm. Most chosen.<br/><br/>

High: 0.1mm. High res; Gives a smoother surface quality. Consumes time & hence Expensive.<br/><br/>
  </span></div>
                  </th>
                  <th className="align-middle" align="center">
                   <div className="a1"> Density<sup style={{color:'black'}}>?</sup><span className="tooltiptext"> <b style={{paddingLeft:"36%"}}>Density</b><br/><br/>

The infill percentage inside a print - Contributes to the strength. 20% is the default.
  </span></div> 
                  </th>
                  <th className="align-middle" align="center">
                    Price
                  </th>
                  <th className="align-middle" align="center" width="5%">
                    Quantity
                  </th>
                  <th className="align-middle" align="center" width="10%">
                    Item Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.filesArray.map(file => (
                    

                   
                      
                    (file.process !== undefined) ? 
                    Process= {
                      value: file.process,
                      label: file.processLabel  
                    }:
                    process=this.state.defaultProcess,
                    (file.material !== undefined) ? 
                    Material= {
                      value: file.material,
                      label: file.materialLabel  
                    }:
                    Material=this.state.defaultMaterial,
                    (file.color !== undefined) ? 
                    Color= {
                      value: file.color,
                      label: file.colorLabel  
                    }:
                    Color=this.state.defaultColor,
                    (file.quality !== undefined) ? 
                    Quality= {
                      value: file.quality,
                      label: file.qualityLabel  
                    }:
                    Quality=this.state.defaultQuality,
                    (file.density !== undefined) ? 
                    Density= {
                      value: file.density,
                      label: file.densityLabel  
                    }:
                    Density=this.state.defaultDensity,
                    (file.quantity !== undefined) ? 
                    Quantity= {
                      value: file.quantity,
                      label: file.quantity  
                    }:
                    Quantity=this.state.defaultQuantity,


                         
                     
                    <tr key={file._id}>
                    {/* Serial Number */}
                    <td className="align-middle">
                      {
                        (file.index =
                          filesArray.findIndex(
                            array => array._id === file._id
                          ) + 1)
                      }
                    </td>

                    {/*  */}
                    {/*  */}
                    {/* File Name */}
                    {/*  */}
                    {/*  */}

                    <td className="align-middle" align="left">
                      {file.fileName}
                      <div style={{ fontSize: 12 }}>
                        {Math.round(file.dimensions[0])}*
                        {Math.round(file.dimensions[1])}*
                        {Math.round(file.dimensions[2])} mm
                        {/* {Math.round(file.volume)} cc */}
                      </div>
                    </td>

                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/* Process Dropdown */}
                    {/*  */}
                    {/*  */}
                    {/*  */}

                    <td className="align-middle" align="center">
                      <Select
                        theme={theme => ({
                          ...theme,
                          borderRadius: 0
                        })}
                        styles={customStyles}
                        style={{fontSize:"12px"}}
                        // defaultValue={this.state.defaultProcess}
                        defaultValue={Process}
                        
                        options={processOptions}
                        onChange={value => {
                          console.log("Process Changed", value.label);
                          var index = filesArray.findIndex(
                            array => array._id === file._id
                          );
                          console.log("Index", index);
                          filesArray[index].process = value.value;
                          filesArray[index].processLabel = value.label;
                          console.log("File Data", filesArray[index]);
                        }}
                      />
                    </td>

                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/* Material Dropdown */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {
                      console.log("file.materialLabel",file.materialLabel )

                      
                    }


                    <td className="align-middle" align="center">
                      <Select
                        theme={theme => ({
                          ...theme,
                          borderRadius: 0
                        })}
                        styles={customStyles}  
                        style={{fontSize:"12px"}}
                        // defaultValue={this.state.defaultMaterial}
                        defaultValue={Material}
                        onFocus={() => {
                          console.log(
                            "onFocus Material Options",
                            file.process,
                            materialOptions.filter(
                              material => material.process === file.process
                            )
                          );
                          this.setState({
                            materialOptions: materialOptions.filter(
                              material => material.process === file.process
                            )
                          });
                        }}
                        options={this.state.materialOptions}
                        onChange={value => {
                          console.log("Material Changed", value.label);
                          var index = filesArray.findIndex(
                            array => array._id === file._id
                          );
                          console.log("Index", index);

                          filesArray[index].material = value.value;
                          filesArray[index].materialLabel = value.label;
                          filesArray[index].materialPrice = value.materialPrice;

                          console.log("File Data", filesArray[index]);
                          this.calculatePrice();
                        }}
                      />
                    </td>

                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/* Color Dropdown */}
                    {/*  */}
                    {/*  */}
                    {/*  */}

                    <td className="align-middle" align="center">
                      <Select
                        theme={theme => ({
                          ...theme,
                          borderRadius: 0
                        })}
                        styles={customStyles}
                        style={{fontSize:"12px"}}
                        // defaultValue={this.state.defaultColor}
                        defaultValue={Color}
                        onFocus={() => {
                          console.log(
                            "onFocus Color Options",
                            file.material,
                            colorOptions.filter(
                              color => color.material === file.material
                            )
                          );
                          this.setState({
                            colorOptions: colorOptions.filter(
                              color => color.material === file.material
                            )
                          });
                        }}
                        options={this.state.colorOptions}
                        onChange={value => {
                          console.log("Color Changed", value.label);
                          var index = filesArray.findIndex(
                            array => array._id === file._id
                          );
                          console.log("Index", index);

                          filesArray[index].color = value.value;
                          filesArray[index].colorLabel = value.label;

                          console.log("File Data", filesArray[index]);
                          this.calculatePrice();
                        }}
                      />
                    </td>

                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/* Quality Dropdown */}
                    {/*  */}
                    {/*  */}
                    {/*  */}

                    <td className="align-middle" align="center">
                      <Select
                        theme={theme => ({
                          ...theme,
                          borderRadius: 0
                        })}
                        styles={customStyles}
                        style={{fontSize:"12px"}}
                        // defaultValue={this.state.defaultQuality}
                        defaultValue={Quality}
                        onFocus={() => {
                          console.log(
                            "onFocus Quality Options",
                            file.process,
                            qualityOptions.filter(
                              quality => quality.process === file.process
                            )
                          );
                          this.setState({
                            qualityOptions: qualityOptions.filter(
                              quality => quality.process === file.process
                            )
                          });
                        }}
                        options={this.state.qualityOptions}
                        onChange={value => {
                          console.log("Quality Changed", value.label);
                          var index = filesArray.findIndex(
                            array => array._id === file._id
                          );
                          console.log("Index", index);
                          console.log(
                            "Quality Multiplier",
                            value.qualityMultiplier
                          );

                          filesArray[index].quality = value.value;
                          filesArray[index].qualityLabel = value.label;
                          filesArray[index].qualityMultiplier =
                            value.qualityMultiplier;

                          console.log("File Data", filesArray[index]);
                          this.calculatePrice();
                        }}
                      />
                    </td>

                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/* Density Dropdown */}
                    {/*  */}
                    {/*  */}
                    {/*  */}

                    <td className="align-middle" align="center">
                      <Select
                        theme={theme => ({
                          ...theme,
                          borderRadius: 0
                        })}
                        styles={customStyles}
                        style={{fontSize:"12px"}}
                        // defaultValue={this.state.defaultDensity}
                        defaultValue={Density}
                        onFocus={() => {
                          console.log(
                            "onFocus Density Options",
                            file.process,
                            densityOptions.filter(
                              density => density.process === file.process
                            )
                          );
                          this.setState({
                            densityOptions: densityOptions.filter(
                              density => density.process === file.process
                            )
                          });
                        }}
                        options={this.state.densityOptions}
                        onChange={value => {
                          console.log("Density Changed", value.label);
                          var index = filesArray.findIndex(
                            array => array._id === file._id
                          );
                          console.log("Index", index);

                          filesArray[index].density = value.value;
                          filesArray[index].densityLabel = value.label;
                          filesArray[index].densityMultiplier =
                            value.densityMultiplier;

                          console.log("File Data", filesArray[index]);
                          this.calculatePrice();
                        }}
                      />
                    </td>

                    <td className="align-middle" align="right">
                      &#8377; {file.price}
                    </td>

                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/* Quantity Dropdown */}
                    {/*  */}
                    {/*  */}
                    {/*  */}

                    <td className="align-middle" align="center">
                      <Select
                        theme={theme => ({
                          ...theme,
                          borderRadius: 0
                        })}
                        styles={customStyles}
                        style={{fontSize:"12px"}}
                        defaultValue={Quantity}

                        options={[
                          {
                            value: 0,
                            label: 0
                          },
                          {
                            value: 1,
                            label: 1
                          },
                          {
                            value: 2,
                            label: 2
                          },
                          {
                            value: 3,
                            label: 3
                          },
                          {
                            value: 4,
                            label: 4
                          },
                          {
                            value: 5,
                            label: 5
                          },
                          {
                            value: 6,
                            label: 6
                          },
                          {
                            value: 7,
                            label: 7
                          },
                          {
                            value: 8,
                            label: 8
                          },
                          {
                            value: 9,
                            label: 9
                          },
                          {
                            value: 10,
                            label: 10
                          }
                        ]}
                        onChange={value => {
                          console.log("Quantity Changed", value.label);
                          var index = filesArray.findIndex(
                            array => array._id === file._id
                          );
                          console.log("Index", index);
                          filesArray[index].quantity = value.value;
                          console.log("File Data", filesArray[index]);
                          this.calculatePrice();
                        }}
                      />
                    </td>
                    <td className="align-middle" align="right">
                      &#8377; {file.itemTotal}
                    </td>
                  </tr>
                ))}
                
            

                
                
                <div>  < br/> < br/> < br/> < br/> < br/> < br/> < br/> < br/> < br/> < br/>   </div> 
              
                
                
              </tbody>
            </Table>





              </CardBody>
            </Card>
          </Col>
        </Row>

        <Table>
          <Row>
            <Col sm="6"></Col>
            <Col sm="2"><Button block color="success" onClick={this.sendemail} > Save and Send </Button></Col>
            <Col sm="2"><Button block color="success" onClick={this.updateOrder}>Save</Button></Col>
            <Col sm="2"><Button block color="primary" >Cancel</Button></Col>
          </Row>
        </Table>






      </div>

    );

  }
}

export default File;
