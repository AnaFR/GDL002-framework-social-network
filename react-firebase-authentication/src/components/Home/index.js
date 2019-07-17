import React from "react";
import { compose } from "recompose";
import { withAuthorization, withEmailVerification } from "../Session";
import Messages from "../Messages";
import Record from "../MedicalRecord";
import MedicalRecord from "../MedicalRecord";

const HomePage = () => (
  <div>
    {/* <h1>Home Page</h1>
    <p>The Home Page </p> */}

    {/* <Messages /> */}   
    
    <Record/>
    
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);






