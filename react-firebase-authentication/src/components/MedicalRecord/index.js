import React, { Component } from "react";

import { withFirebase } from "../Firebase";


class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: [],
      alert: false,
      alertData: {}
    };
  }

  showAlert(type, message) {
    this.setState({
      alert: true,
      alertData: { type, message }
    });
    setTimeout(() => {
      this.setState({ alert: false });
    }, 4000);
  }

  resetForm() {
    this.refs.contactForm.reset();
  }

  componentWillMount() {
    this.props.firebase
      .form()
      .orderByKey()
      .limitToLast(6);
    this.props.firebase.form().on("child_added", snapshot => {
      const {
        name,
        email,
        city,
        phone,
        message,
        age,
        weight,
        height
      } = snapshot.val();
      const data = { name, email, city, phone, message, age, weight, height };
      this.setState({ form: [data].concat(this.state.form) });
    });
  }

  sendMessage(e) {
    e.preventDefault();
    const params = {
      name: this.inputName.value,
      email: this.inputEmail.value,
      phone: this.inputPhone.value,
      sex: this.inputSex.value,
    
      message: this.textAreaMessage.value,
      age: this.inputAge.value,
      weight: this.inputWeight.value,
      height: this.inputHeight.value
    };
    if (
      params.name &&
      params.email &&
      params.phone &&
      params.sex &&
      params.message &&
      params.age &&
      params.weight &&
      params.height
    ) {
      this.props.firebase
        .form()
        .push(params)
        .then(() => {
          this.showAlert("success", "Your Medical Record was sent successfull");
        })
        .catch(() => {
          this.showAlert("danger", "Your Medical Record could not be sent");
        });
      this.resetForm();
    } else {
      this.showAlert("warning", "Please fill the form");
    }
  }

  render() {
    return (
      <div>
        {this.state.alert && (
          <div
            className={`alert alert-${this.state.alertData.type}`}
            role="alert"
          >
            <div className="container">{this.state.alertData.message}</div>
          </div>
        )}
        <div className="container" style={{ padding: `50px 0px` }}>
          <div className="row">
            <div className="col-sm-4">
              <h2>My medical Record</h2>
              <form onSubmit={this.sendMessage.bind(this)} ref="contactForm">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    ref={name => (this.inputName = name)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    ref={email => (this.inputEmail = email)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="number"
                    className="form-control"
                    id="phone"
                    placeholder="+52 1"
                    ref={phone => (this.inputPhone = phone)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sex">Sex</label>
                  <select
                    className="form-control"
                    id="sex"
                    ref={sex => (this.inputSex = sex)}
                  >
                    <option value="México">Female</option>
                    <option value="Guadalajara">Male</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    placeholder="age"
                    ref={age => (this.inputAge = age)}
                  />
                </div>







                
                <div className="form-group">
                  <label htmlFor="weight">Weight(Kg)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="weight"
                    placeholder="weight"
                    ref={weight => (this.inputWeight = weight)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="height">Height(mts)</label>
                  <input
                    type="height"
                    className="form-control"
                    id="height"
                    placeholder="height"
                    ref={height => (this.inputHeight = height)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Medical Diganosis</label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="1"
                    ref={message => (this.textAreaMessage = message)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </form>
            </div>
            <div className="col-sm-8">
              <div className="row">
                {this.state.form.map(form => (
                  <div
                    className="col-sm-6"
                    key={form.phone}
                    style={{ margin: `0px 0px 30px 0px` }}
                  >
                    <div className="card">
                      <div className="card-body">
                        <h8 className="card-title">{"Name:"   +  "     " + form.name}</h8>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {"Email:"  +  "      " + form.email}
                        </h6>
                        <p className="card-text">{"DX:" + "    "  + form.message}</p>
                        <a href={`tel:${form.phone}`} className="card-link">
                          {"Phone:"  +   "   " + form.phone}
                        </a>
                        <a href={`age:${form.age}`} className="card-link">
                          {form.age + "   " + "years"}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="alert alert-info fixed-bottom">
          <div className="container">
            <div className="row">
              <div className="col-sm-12" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(Record);
