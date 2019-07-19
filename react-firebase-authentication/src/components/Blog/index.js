import React from "react";
import { compose } from "recompose";
import { withAuthorization, withEmailVerification } from "../Session";
import Messages from "../Messages";

const BlogPage = () => (
  <div>
    <h1>Blog</h1>
    <p>This is a Medical blog you can share information about medical issues...... </p>

    <Messages />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(BlogPage);
