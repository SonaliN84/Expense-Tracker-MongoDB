import { Form, Button } from "react-bootstrap";
import "./AuthForm.css";
import { useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { authActions } from "../../Store/auth-slice";

import axios from "axios";
const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    axios
      .post("http://localhost:3000/user/login", {
        email: enteredEmail,
        password: enteredPassword,
      })
      .then((response) => {
        history.replace("/Users");
        dispatch(
          authActions.login({
            token: response.data.token,
            isPremium: response.data.isPremium,
          })
        );
      })
      .catch((error) => {
        alert(error.response.data.err);
      });
  };

  return (
    <Form className="Auth-form border d-grid" onSubmit={submitHandler}>
      <h3 style={{ textAlign: "center" }}>Login</h3>

      <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          required
          ref={emailInputRef}
        />
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          required
          ref={passwordInputRef}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="my-3">
        Login
      </Button>
      <NavLink
        to="/Forgot_Password"
        className="mb-3"
        style={{ textAlign: "center", textDecoration: "none" }}
      >
        Forgot password
      </NavLink>

      <p style={{ textAlign: "center" }}>
        Don't have an account?{" "}
        <NavLink
          to="/SignUp"
          className="mb-3"
          style={{ textAlign: "center", textDecoration: "none" }}
        >
          Sign Up
        </NavLink>
      </p>
    </Form>
  );
};
export default LoginForm;
