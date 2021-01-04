import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
 
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';


const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));


var chartOptions= {
    // Boolean - If we should show the scale at all
  showScale: true,
  // Boolean - Whether to show a dot for each point
  pointDot: true,
  showLines: false,
  title: {
      display: true,
      text: 'Chart.js Bar Chart'
  },
  legend: {
      display: true,
      labels: {
         boxWidth: 50,
         fontSize: 10,
         fontColor: '#bbb',
         padding: 5,
      }
  }}

var chartData = {
  labels: [['Sunday', 'Monday'], ['Sunday', 'Tuesday']],
  datasets: [
      {   
          color: "#4D5360",
          highlight: "#616774",
          borderColor: "rgba(179,181,198,1)",
          pointBackgroundColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(179,181,198,1)",
          label: 'Current lag',
          fill: false,
          lineTension: 0.1,
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          scaleOverride: true, scaleStartValue: 0, scaleStepWidth: 1, scaleSteps: 30,
          data: [[5, 8], [3, 11]]
      }
  ]
}








  Date.prototype.addDays =(days) => {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}





 
class Graph extends Component {
    constructor(props) {
      super(props);
        
      this.state = {
        orders :[],
        ResultArray:[],

         data :{
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'February', 'March', 'April', 'May', 'June', 'July', 'February', 'March'],
          datasets: [
            {
              label: 'Number of Uploads',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              // pointBorderColor: 'rgba(75,192,192,1)',
              pointBorderColor: 'rgba(102, 245, 66,2)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40, 55, 40,65]
            }
          ]
        }




       }
       }


    componentDidMount(){
      axios.get(`http://localhost:5000/orders`)
    .then( (response) => {
      console.log("Response", response.data);
    this.setState({
        orders: response.data
    })
  this.getAllDates();
    })  
    .catch(function (error) {
      console.log(error);
    });
    
  }


    getDates = (startDate, stopDate) => {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date (currentDate));
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }

    addDays = () => {
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          today = mm + '/' + dd + '/' + yyyy;
          return today;
          }


    getAllDates = ()=>{
      let DateArray = [];
      let filteredDateArray=[];
 
      var  count = {};
          this.state.orders.map(order=>{
            DateArray.push(order.created_at);
          })
         for(var i = 0;i<DateArray.length;i++){
           if(DateArray[i] !== undefined){
           console.log('DateArray[i]',DateArray[i])
           var str = DateArray[i];
           var res = str.split(/[\s,]+/);
           filteredDateArray.push(res[0]);
         }
        }
        var  uniqueCount =filteredDateArray;
        uniqueCount.forEach(function(i) { count[i] = (count[i]||0) + 1;});
        console.log(count);
        var obj = count; 
        console.log(Object.entries(obj));
        var  ResultArray =  Object.entries(obj);
        this.state.ResultArray = ResultArray;
        var gDate = [];
        var gValue = [];
        for(var j=0;j<ResultArray.length;j++){
        gDate.push(ResultArray[j][0]);
        gValue.push(ResultArray[j][1])
        }
        console.log("gDate",gDate);
        console.log("gValue",gValue);
         this.state.data.datasets[0].data = gValue;

         var {data} = this.state;
         const newData = {
           ...data,
           labels:gDate
         }
           this.setState({
             data:newData
           })
   
      
}


getMonthlyData = ()=>{
 

  var  monthArray = [];    
  var monthData = [];
  var monthValue =[];
  var ResultArray = this.state.ResultArray;
  for(var j=0;j<ResultArray.length;j++){
   console.log("ResultArray[j][0].includes(substring)",ResultArray[j][0].includes("/"),ResultArray[j][0])
       if(ResultArray[j][0].includes("/")){
         var str = ResultArray[j][0] ;
         var res = str.split("/");
         if(res[0] === "10"){
           monthArray.push(ResultArray[j])
         }
          
         console.log('monthArray',monthArray)
       }else{
         // var str = ResultArray[j][0] ;
         // var res = str.split("-");
         // if(res[1] === "10"){
         //   monthArray.push(ResultArray[j])
         // }
       
         // console.log('monthArray',monthArray) 
  
       }
     }
     
     for(var k=0;k<monthArray.length;k++){
       monthData.push(monthArray[k][0]);
       monthValue.push(monthArray[k][1])
       }

       this.state.data.datasets[0].data = monthValue;

       var {data} = this.state;
       const newData1 = {
         ...data,
         labels:monthData
       }
         this.setState({
           data:newData1
         })
       console.log("monthData",monthData)
       console.log("monthValue",monthValue)

       var d1 = Date.parse("10/1/2019");
       var d2 = Date.parse("10/12/2019");
       if (d1 > d2) {
          //  alert ("true!");
       }
       else{
        // alert ("false!");
       }

       var today = new Date()
       
         console.log("priorDate",priorDate)

      
        var currentMonth =[];
        for(var l=30;l>=0;l--){
          var priorDate = new Date().setDate(today.getDate()-l);
          function pad(s) { return (s < 10) ? '0' + s : s; }
          var d = new Date(priorDate)
          priorDate = [pad(d.getMonth()+1) ,pad(d.getDate()), d.getFullYear()].join('/');
          currentMonth.push(priorDate,0)

        }
       
       var currentMonthUpdate = [];
       console.log('monthArray',monthArray)

       var a = monthArray.length;


       for(var x = 0; x < currentMonth.length; x++){

        //Iterate through all elements in second array    
        for(var y = 0; y < monthArray.length; y++){
    
          /*This causes us to compare all elements 
             in first array to each element in second array
            Since md1[x] stays fixed while md2[y] iterates through second array.
             We compare the first two indexes of each array in conditional
          */
          if(currentMonth[x][0] == monthArray[y][0]){
            console.log("currentMonth[x][0]",currentMonth[x][0])
            currentMonthUpdate.push([currentMonth[x][0], monthArray[y][1]]);
          }
        }
    }
       
    //     for(var m=0;m< a;m++){
               
    //           if(monthArray[m][0] !== undefined){
    //             console.log('currentMonth[m]:',currentMonth[m]);
    //             console.log('monthArray:',monthArray[m][0]);
    //            if(currentMonth[m] === monthArray[m][0]){
    //             currentMonthUpdate.push([currentMonth[m], monthArray[m][1]]);
    //         }else{
               
    //           currentMonthUpdate.push([currentMonth[m], 0]);
    //         }}
    //         console.log('currentMonth[m]:',currentMonth[m]);
    //         console.log('monthArray:',monthArray[m][0]);
             
    // }

    // for(var n=a;n<currentMonth.length;n++){
    //   currentMonthUpdate.push([currentMonth[n], 0]);
    // }

          console.log("currentMonthUpdate",currentMonthUpdate)
         
         
 

  }
 
   convertDate = (inputFormat) => {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }
 
    render() {

        // var range = this.getDates(new Date(), new Date().addDays(7));


    
        var str = "How are you doing today?";
        var res = str.split(" ");

        console.log("range:",this.addDays())
        console.log('orders:',this.state.orders)
        
      return (
              <div>
                 {/* <Line data={chartData} options={chartOptions} width={600} height={250}/> */}
                 <div  style={{float:"right"}} >
                 <Button outline color="primary"  onClick={this.getAllDates}>Yearly</Button>{' '}
                 <Button outline color="primary"onClick={this.getMonthlyData}>Monthly</Button>
               </div>
              
                  <Line data={this.state.data} />
              </div>
            
        
      );
    }
  }
  
  export default Graph;