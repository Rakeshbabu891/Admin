import React, { Component } from "react";
import axios from "axios";

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

const makeid = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

class GenarateCoupen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loder: false,
      Coupen: {
        code: "",
        expireDate: "",
        validDays: 1,
        discountAmount: 0,
        comment: "",
      },
    };
  }

  componentDidMount() {
    let tomorrow = formatDate(new Date().addDays(1));
    let newCode = makeid(5);
    this.setState((prevState) => ({
      Coupen: {
        ...prevState.Coupen,
        code: newCode,
        expireDate: tomorrow,
      },
    }));
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      (prevState) => ({
        Coupen: {
          ...prevState.Coupen,
          [name]: value,
        },
      }),
      console.log(this.state.Coupen)
    );
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loader: true });
    const result = await axios.post(
      "http://localhost:5000/coupen",
      this.state.Coupen
    );
    this.setState({ loader: false });
    alert(`coupen data update ${result.data.status}`);
  };

  addExpireDate = (event) => {
    const { name, value } = event.target;

    if (value) {
      var date = new Date().addDays(value * 1);
      var newDate = formatDate(date);
      this.setState(
        (prevState) => ({
          Coupen: {
            ...prevState.Coupen,
            validDays: value,
            expireDate: newDate,
          },
        }),
        console.log(this.state.Coupen)
      );
    }
  };

  render() {
    console.log(this.state.Coupen);

    return (
      <div>
        <h1>Create Coupen</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="code" style={{ display: "block" }}>
            Coupen Code:{" "}
          </label>
          <input
            name="code"
            type="text"
            style={{ marginBottom: "15px" }}
            value={this.state.Coupen.code || ""}
            onChange={this.handleChange}
            required
          />
          <br />
          <label htmlFor="expireDate" style={{ display: "block" }}>
            Expire Date:{" "}
          </label>
          <input
            name="expireDate"
            type="text"
            value={this.state.Coupen.expireDate}
            style={{ marginBottom: "15px" }}
            required
          />
          <br />
          <label htmlFor="validDays" style={{ display: "block" }}>
            Valid Days:{" "}
          </label>
          <input
            name="validDays"
            type="number"
            value={this.state.Coupen.validDays}
            onChange={this.addExpireDate}
            style={{ marginBottom: "15px" }}
            required
          />
          <br />
          <label htmlFor="discountAmount" style={{ display: "block" }}>
            Discount Amount:{" "}
          </label>
          <input
            name="discountAmount"
            type="number"
            value={this.state.Coupen.discountAmount}
            onChange={this.handleChange}
            style={{ marginBottom: "15px" }}
            required
          />
          <br />
          <label htmlFor="comment" style={{ display: "block" }}>
            comment:{" "}
          </label>
          <input
            name="comment"
            type="text"
            value={this.state.Coupen.comment}
            onChange={this.handleChange}
            style={{ marginBottom: "15px" }}
            required
          />
          <br />
          <button type="submit" className="btn btn-success">
            Submit&nbsp;
            {this.state.loader ? (
              <i class="fa fa-refresh fa-spin" aria-hidden="true"></i>
            ) : null}
          </button>
        </form>
      </div>
    );
  }
}

export default GenarateCoupen;
