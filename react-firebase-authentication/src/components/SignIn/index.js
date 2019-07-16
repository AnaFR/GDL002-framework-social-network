import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

// import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import Computer from "../../img/computer.jpg";
// import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import {
  Button,
  Form,
  Grid,
  Icon,
  Header,
  Message,
  
  Segment
} from "semantic-ui-react";

const SignInPage = () => (
  <div>
    {/* <h1>SignIn</h1> */}
    <SignInForm />
    <SignInGoogle />
    {/* <PasswordForgetLink /> */}
    {/* <SignUpLink /> */}
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

const ERROR_CODE_ACCOUNT_EXISTS =
  "auth/account-exists-with-different-credential";

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

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
                name="password"
                value={password}
                onChange={this.onChange}
                placeholder="Password"
                type="password"
              />

              <Button
                disabled={isInvalid}
                type="submit"
                color="blue"
                fluid
                size="large"
              >
                Login
              </Button>
              {error && <p>{error.message}</p>}
            </Form>
          </Segment>
          <Message>
            <Link to={ROUTES.SIGN_UP}>Register Now</Link> &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {}
        });
      })
      .then(() => {
        this.setState({ error: null });
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

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <center>
          {" "}
          or Sign Up with.
          <Button type="submit" icon>
            <Icon name="google" />
          </Button>
        </center>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase
)(SignInGoogleBase);

export default SignInPage;

export { SignInForm, SignInGoogle };
