import React, { Component } from "react";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import axios from "axios";

class Coupen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coupens: [],
    };
  }

  componentDidMount = async () => {
    const result = await axios.get("http://localhost:5000/coupen");
    if (result.data.data.length) {
      this.setState({ coupens: result.data.data.reverse() });
    }
  };

  render() {
    console.log(this.state.coupens);
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
                      <th>Coupen Code</th>
                      <th>Expire Date</th>
                      <th>discountAmount</th>
                      <th>Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.coupens.map((coupen) => (
                      <tr key={coupen._id}>
                        <td>{coupen.coupen.code}</td>
                        <td>{coupen.coupen.expireDate}</td>
                        <td>{coupen.coupen.discountAmount}</td>
                        <td>{coupen.coupen.comment}</td>
                      </tr>
                    ))}
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

export default Coupen;
