import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Badge,
} from "reactstrap";
import { Route, Router, NavLink } from "react-router-dom";
import "./Table.css";
import FileEdit from "./file-edit";
import axios from "axios";

var c_id = null;
var order_plced = "";

class NewTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [
        {
          name: null,
          email: null,
          mobile: null,
          _id: null,
          order_id: null,
        },
      ],
      click_id: null,
      spinClass: null,
      loader: false,
      page: 1,
      limit: 50,
    };
  }

  componentDidMount() {
    this.getOrder();
  }

  getOrder = () => {
    const { page, limit } = this.state;
    axios
      .get(
        `http://localhost:5000/orders/paid/orders?page=${page}&limit=${limit}`
      )
      .then((response) => {
        console.log("Response", response.data);
        this.setState({
          orders: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getNextOrders = async () => {
    await this.setState({
      page: this.state.page + 1,
      loader: true,
    });

    axios
      .get(
        `http://localhost:5000/orders/paid/orders?page=${this.state.page}&limit=${this.state.limit}`
      )
      .then((response) => {
        console.log("Response", response.data);
        this.setState({
          orders: response.data,
          loader: false,
        });
      })
      .catch(function (error) {
        console.log(error);
        this.setState({ loader: false });
      });
  };

  getPreviousOrders = async () => {
    if (this.state.page > 0) {
      await this.setState({
        page: this.state.page - 1,
      });

      if (this.state.page < 1) {
        await this.setState({ page: 1 });
      }
      this.setState({ loader: true });
      axios
        .get(
          `http://localhost:5000/orders/paid/orders?page=${this.state.page}&limit=${this.state.limit}`
        )
        .then((response) => {
          console.log("Response", response.data);
          this.setState({
            orders: response.data,
            loader: false,
          });
        })
        .catch(function (error) {
          console.log(error);
          this.setState({ loader: false });
        });
    }
  };

  create_click_id = (order_id) => {
    c_id = order_id;
    this.setState({
      click_id: order_id,
    });
  };

  manualPay = (order_id) => {
    var r = window.confirm("Confirm remove payment?");
    if (r == true) {
      this.setState({ spinClass: "fa fa-spinner fa-spin" });
      axios
        .post(`http://localhost:5000/orders/manualUpdate/${order_id}`, {
          payment: false,
        })
        .then((res) => {
          this.setState({ spinClass: null });
          this.getOrder();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  render() {
    console.log(
      "active",
      this.state.active1,
      this.state.active2,
      this.state.active3,
      this.state.active4
    );
    {
      this.state.orders.map((order) => {
        console.log("c_id:", c_id, "order_placed", order.order_placed);
        console.log("c_id:", c_id);
      });
    }

    return (
      <div className="animated fadeIn">
        <Pagination>
          <PaginationItem>
            <PaginationLink
              previous
              tag="button"
              onClick={this.getPreviousOrders}
            ></PaginationLink>
          </PaginationItem>
          <h6 style={{ padding: "5px" }}>
            {(this.state.page - 1) * this.state.limit + 1} to{" "}
            {this.state.page * this.state.limit}
          </h6>
          <PaginationItem>
            <PaginationLink
              next
              tag="button"
              onClick={this.getNextOrders}
            ></PaginationLink>
          </PaginationItem>
          {this.state.loader ? (
            <span style={{ marginLeft: "10px" }}>
              {" "}
              <i
                class="fa fa-refresh fa-spin"
                aria-hidden="true"
                style={{ textAlign: "center" }}
              ></i>
            </span>
          ) : (
            ""
          )}
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
                      <th>Status</th>
                      <th>Coupen</th>
                      <th>Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.orders.map((order) => {
                      if (order.order_placed === true) {
                        return (
                          <tr key={order._id}>
                            <td>
                              <NavLink
                                to="/file-edit"
                                onClick={() =>
                                  this.create_click_id(order.order_id)
                                }
                              >
                                {order.order_id}
                              </NavLink>
                            </td>
                            {/* <td onClick={()=> this.create_click_id(order.order_id)}>{order.order_id}</td> */}

                            <td>{order.created_at}</td>
                            <td>{order.name}</td>
                            <td>{order.orderTotal}</td>
                            {
                              <td>
                                {order.shipping_status !== "Shipped" &&
                                  order.shipping_status !== "Delivered" &&
                                  order.print_status !==
                                    "Awaiting Confirmation" &&
                                  order.print_status !== "File Error" &&
                                  order.print_status !==
                                    "Waiting for Response" && (
                                    <Badge color="warning">Processing</Badge>
                                  )}
                                {order.shipping_status !== "Shipped" &&
                                  order.shipping_status !== "Delivered" &&
                                  order.print_status === "File Error" && (
                                    <Badge color="dark">File Error</Badge>
                                  )}
                                {order.shipping_status !== "Shipped" &&
                                  order.shipping_status !== "Delivered" &&
                                  order.print_status ===
                                    "Waiting for Response" && (
                                    <Badge color="info">
                                      Waiting for Response
                                    </Badge>
                                  )}
                                {order.shipping_status !== "Shipped" &&
                                  order.shipping_status !== "Delivered" &&
                                  order.print_status ===
                                    "Awaiting Confirmation" && (
                                    <Badge color="danger">Awaiting</Badge>
                                  )}
                                {(order.shipping_status == "Shipped" ||
                                  order.shipping_status == "Delivered") && (
                                  <Badge color="success">Completed</Badge>
                                )}{" "}
                              </td>
                            }

                            <td>
                              {order.coupenApplied ? (
                                <span>&#x2714;</span>
                              ) : (
                                <span>&#10005;</span>
                              )}
                              {/* <div>
                                <span
                                  className="fa fa-star "
                                  id={
                                    order.rating === 1 ||
                                    order.rating === 2 ||
                                    order.rating === 3 ||
                                    order.rating === 4 ||
                                    order.rating === 5
                                      ? "feedbackStar"
                                      : "StarColor"
                                  }
                                ></span>
                                <span
                                  className="fa fa-star "
                                  style={{ marginLeft: "4px" }}
                                  id={
                                    order.rating === 2 ||
                                    order.rating === 3 ||
                                    order.rating === 4 ||
                                    order.rating === 5
                                      ? "feedbackStar"
                                      : "StarColor"
                                  }
                                ></span>
                                <span
                                  className="fa fa-star "
                                  style={{ marginLeft: "4px" }}
                                  id={
                                    order.rating === 3 ||
                                    order.rating === 4 ||
                                    order.rating === 5
                                      ? "feedbackStar"
                                      : "StarColor"
                                  }
                                ></span>
                                <span
                                  className="fa fa-star "
                                  style={{ marginLeft: "4px" }}
                                  id={
                                    order.rating === 4 || order.rating === 5
                                      ? "feedbackStar"
                                      : "StarColor"
                                  }
                                ></span>
                                <span
                                  className="fa fa-star "
                                  style={{ marginLeft: "4px" }}
                                  id={
                                    order.rating === 5
                                      ? "feedbackStar"
                                      : "StarColor"
                                  }
                                ></span> */}
                              {/* </div> */}
                            </td>

                            {
                              <td>
                                <button
                                  className="unpay-button"
                                  onClick={() => this.manualPay(order.order_id)}
                                >
                                  {" "}
                                  <i className={this.state.spinClass}></i>UnPay
                                </button>
                              </td>
                            }
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Pagination>
          <PaginationItem>
            <PaginationLink
              previous
              tag="button"
              onClick={this.getPreviousOrders}
            ></PaginationLink>
          </PaginationItem>
          <h6 style={{ padding: "5px" }}>
            {(this.state.page - 1) * this.state.limit + 1} to{" "}
            {this.state.page * this.state.limit}
          </h6>
          <PaginationItem>
            <PaginationLink
              next
              tag="button"
              onClick={this.getNextOrders}
            ></PaginationLink>
          </PaginationItem>
          {this.state.loader ? (
            <span style={{ marginLeft: "10px" }}>
              {" "}
              <i
                class="fa fa-refresh fa-spin"
                aria-hidden="true"
                style={{ textAlign: "center" }}
              ></i>
            </span>
          ) : (
            ""
          )}
        </Pagination>
      </div>
    );
  }
}
export { c_id };
export default NewTable;
