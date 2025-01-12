import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import Computer from "../../img/computer.jpg";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";

const SignUpPage = () => (
  <div>
    {/* <h1>SignUp</h1> */}
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  isAdmin: false,
  error: null
};

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles
        });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <Grid centered columns={3}>
        <img className="loginbkg" src={Computer} alt="Computer" />

        <Grid.Column>
          <Header as="h2" textAlign="center">
            <br />
            <br />
            My Medical Record
          </Header>

          <Segment onSubmit={this.onSubmit}>
            <Form size="large">
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                name="username"
                value={username}
                onChange={this.onChange}
                type="text"
                placeholder="Full name"
              />
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email address"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                placeholder="Password"
                type="password"
              />
              <Form.Input
                fluid
                icon="warning sign"
                iconPosition="left"
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                placeholder="Confirm Password"
                type="password"
              />
              <label>
                Doctor:
                <input
                  name="isAdmin"
                  type="checkbox"
                  checked={isAdmin}
                  onChange={this.onChangeCheckbox}
                />
              </label>
              <Button
                disabled={isInvalid}
                type="submit"
                color="blue"
                fluid
                size="large"
              >
                SIGN UP
              </Button>
              {error && <p>{error.message}</p>}
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm };
