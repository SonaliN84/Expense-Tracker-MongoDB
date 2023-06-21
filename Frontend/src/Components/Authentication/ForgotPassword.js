import { Button, Form } from "react-bootstrap";
import { useRef, useState } from "react";
import axios from "axios";
const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const emailInputRef = useRef("");
  const submitHandler = (event) => {
    // setIsLoading(true)
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;

    axios
      .post("http://localhost:3000/password/forgot-password", {
        email: enteredEmail,
      })
      .then((res) => {
        // setIsLoading(false)
        console.log(res);
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };
  return (
    <Form
      className="Auth-form border d-flex flex-column"
      onSubmit={submitHandler}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter the email which you have registered</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          required
          ref={emailInputRef}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="align-self-center">
        {!isLoading && <div>Send Link</div>}
        {isLoading && (
          <div class="spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        )}
      </Button>
    </Form>
  );
};
export default ForgotPassword;
