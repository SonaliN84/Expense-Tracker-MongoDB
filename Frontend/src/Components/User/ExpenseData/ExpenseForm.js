import { Form, Col, Row, Button } from "react-bootstrap";
import "./ExpenseForm.css";
import { useState, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../../../Store/expense-slice";
// import ExpenseContext from '../../../Store/expense-context';
import axios from "axios";
import { authActions } from "../../../Store/auth-slice";
const ExpenseForm = () => {
  const dispatch = useDispatch();
  const expIsEdit = useSelector((state) => state.expense.isEdit);
  const expIsForm = useSelector((state) => state.expense.isForm);
  const expEditExpense = useSelector((state) => state.expense.editExpense);
  const email = useSelector((state) => state.auth.userEmail);
  const authToken = useSelector((state) => state.auth.token);
  const inputAmountRef = useRef("");
  const inputDescriptionRef = useRef("");
  const inputCategoryRef = useRef("");
  const inputDateRef = useRef("");
  const LIMIT = useSelector((state) => state.auth.limit);
  const expData = useSelector((state) => state.expense.expenses);
  const total = useSelector((state) => state.auth.total);

  //    const expCtx=useContext(ExpenseContext)

  const openExpenseFormHandler = () => {
    dispatch(expenseActions.setIsForm(true));
    // expCtx.setIsForm(true)
  };
  const submitFormHandler = (event) => {
    event.preventDefault();
    // console.log(expCtx.editExpense.description)
    // console.log("hey",expCtx.editExpense)
    const enteredAmount = inputAmountRef.current.value;
    const enteredDescription = inputDescriptionRef.current.value;
    const enteredCategory = inputCategoryRef.current.value;
    const enteredDate = inputDateRef.current.value;

    console.log(new Date(enteredDate));
    const month = new Date(enteredDate).toLocaleString("en-US", {
      month: "long",
    });
    const day = new Date(enteredDate).toLocaleString("en-US", {
      day: "2-digit",
    });
    const year = new Date(enteredDate).getFullYear();
    console.log(month, year);
    if (enteredAmount < 0 || enteredDescription.trim().length == 0) {
      alert("Please enter valid amount");
      return;
    }
    if (enteredDescription.trim().length == 0) {
      return;
    }

    let expense = {
      amount: enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
      date: enteredDate,
      month: month,
      year: year,
    };

    // let newExpense=JSON.stringify(expense)
    if (!expIsEdit) {
      axios
        .post("http://localhost:3000/expense/add-expense", expense, {
          headers: { Authorization: authToken },
        })
        .then((response) => {
          dispatch(authActions.setActivePage(1));
          // dispatch(expenseActions.setExpenses([response.data]))
          let array = [];
          array.push(response.data);
          console.log("expdata", expData);
          if (expData.length == LIMIT) {
            for (let i = 0; i < expData.length - 1; i++) {
              array.push(expData[i]);
            }
          } else {
            for (let i = 0; i < expData.length; i++) {
              array.push(expData[i]);
            }
          }

          dispatch(authActions.setTotal(total + 1));
          dispatch(expenseActions.setExpenses(array));

          console.log("expdata", expData);
          console.log(response.data);
          dispatch(expenseActions.setIsForm(false));
          dispatch(expenseActions.setIsForm(false));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let id = expEditExpense.id;
      axios
        .put(`http://localhost:3000/expense/edit-expense/${id}`, expense, {
          headers: { Authorization: authToken },
        })
        .then((response) => {
          console.log(response);

          dispatch(expenseActions.setIsEdit(false));
          dispatch(expenseActions.setEditExpense({}));

          dispatch(expenseActions.setIsForm(false));

          // dispatch(expenseActions.setExpenses(array))
        });
    }
  };

  const closeExpenseFormHandler = () => {
    // expCtx.setIsForm(false);
    dispatch(expenseActions.setIsForm(false));

    dispatch(expenseActions.setIsEdit(false));
    // expCtx.setIsEdit(false);

    dispatch(expenseActions.setEditExpense({}));
    // expCtx.setEditExpense({})
  };
  return (
    <div className="expense-form">
      {!expIsForm && (
        <div className="d-flex justify-content-center align-items-center">
          <Button onClick={openExpenseFormHandler}>Add Expense</Button>
        </div>
      )}
      {expIsForm && (
        <Form onSubmit={submitFormHandler}>
          <Row>
            <Col>
              <Form.Control
                placeholder="Description"
                className="mx-2 my-4"
                ref={inputDescriptionRef}
                required
                defaultValue={expEditExpense.description}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Amount"
                className="my-4"
                ref={inputAmountRef}
                required
                defaultValue={expEditExpense.amount}
                type="number"
                step="0.01"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Select
                aria-label="Default select example"
                className="mx-2"
                ref={inputCategoryRef}
                defaultValue={expEditExpense.category}
              >
                <option value="Fuel">Fuel</option>
                <option value="Food">Food</option>
                <option value="Electricity">Electricity</option>
                <option value="Shopping">Shopping</option>
                <option value="Others">Others</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Control
                ref={inputDateRef}
                required
                type="date"
                defaultValue={expEditExpense.date}
              />
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col className="d-flex flex-row-reverse">
              {!expIsEdit && (
                <Button type="submit" className="my-4">
                  submit
                </Button>
              )}
              {expIsEdit && (
                <Button type="submit" className="my-4">
                  Update
                </Button>
              )}
              <Button onClick={closeExpenseFormHandler} className="mx-3 my-4">
                cancel
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  );
};
export default ExpenseForm;
