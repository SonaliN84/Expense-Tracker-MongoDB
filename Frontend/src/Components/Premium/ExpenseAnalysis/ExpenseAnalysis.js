import "../premium.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { expenseActions } from "../../../Store/expense-slice";
const ExpenseAnalysis = () => {
  const inputYearRef = useRef("");
  const inputMonthRef = useRef("");
  const authToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const getExpensesHandler = (event) => {
    event.preventDefault();
    const enteredYear = inputYearRef.current.value;
    const enteredMonth = inputMonthRef.current.value;
    localStorage.setItem("year", enteredYear);
    localStorage.setItem("month", enteredMonth);

    axios
      .get("http://localhost:3000/premium/expense-analysis", {
        headers: { Authorization: authToken },
        params: { year: enteredYear, month: enteredMonth },
      })
      .then((response) => {
        console.log(response);
        dispatch(expenseActions.setExpenseAnalysisData(response.data));
      });
  };

  return (
    <div className="Cover">
      <Form onSubmit={getExpensesHandler}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Choose Year</Form.Label>
            <Form.Select ref={inputYearRef}>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Choose Month</Form.Label>
            <Form.Select ref={inputMonthRef}>
              <option value="">Choose...</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Button type="submit">Get Expenses</Button>
          </Col>
          <Col></Col>
        </Row>
      </Form>
    </div>
  );
};
export default ExpenseAnalysis;
