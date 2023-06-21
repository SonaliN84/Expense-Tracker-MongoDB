import { Form, Button } from "react-bootstrap";
import "./AuthForm.css";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

const SignUpForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();
  const nameInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;
    const enteredName = nameInputRef.current.value;
    if (enteredPassword === enteredConfirmPassword) {
      let url = "http://localhost:3000/user/signup";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json().then((res) => {
              console.log("User has been succesfully signed up");
              console.log(res);
              alert(res.message);
              history.replace("/Login");
            });
          } else {
            return response.json().then((data) => {
              console.log(data.err);
              let errorMessage = data.err;
              throw new Error(errorMessage);
            });
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("Confirm password must be same as Password");
    }
  };

  return (
    <Form className="Auth-form border d-grid" onSubmit={submitHandler}>
      <h3 style={{ textAlign: "center" }}>Sign Up</h3>
      <Form.Group className="mb-2" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          required
          ref={nameInputRef}
        />
      </Form.Group>
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

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          required
          ref={confirmPasswordRef}
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className="my-2"
        style={{ borderRadius: "10px" }}
      >
        Sign Up
      </Button>

      <p style={{ textAlign: "center" }}>
        Have an account?{" "}
        <NavLink
          to="/Login"
          className="mb-3"
          style={{ textAlign: "center", textDecoration: "none" }}
        >
          Login
        </NavLink>
      </p>
    </Form>
  );
};
export default SignUpForm;
