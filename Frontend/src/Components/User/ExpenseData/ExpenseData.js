import "./ExpenseData.css";
// import ExpenseContext from '../../../Store/expense-context';
// import { useContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import ExpenseItem from "./ExpenseItem";
import { expenseActions } from "../../../Store/expense-slice";
import { authActions } from "../../../Store/auth-slice";
import { Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

const ExpenseData = () => {
  const expData = useSelector((state) => state.expense.expenses);
  const authIsLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const selectInputRef = useRef("");
  const total = useSelector((state) => state.auth.total);
  // const [activePage,setActivePage]=useState(1)
  const activePage = useSelector((state) => state.auth.activePage);
  const LIMIT = useSelector((state) => state.auth.limit);
  const selectHandler = () => {
    const selectedlimit = selectInputRef.current.value;
    dispatch(authActions.setLimit(selectedlimit));
    dispatch(authActions.setActivePage(1));
  };
  const totalPagesCalculator = (total, limit) => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(total / limit); i++) {
      console.log("i>>>", i);
      pages.push(i);
    }
    return pages;
  };
  useEffect(() => {
    console.log(authIsLoggedIn);
    if (authIsLoggedIn) {
      axios
        .get("http://localhost:3000/expense", {
          headers: { Authorization: authToken },
          params: { page: activePage, size: LIMIT },
        })
        .then((response) => {
          console.log("expense>>>>>>", response.data.expenses);
          // console.log(response.data[0].createdAt.split('T')[0])
          let exp = response.data.expenses;
          let array = [];
          for (let i = exp.length - 1; i >= 0; i--) {
            array.push(exp[i]);
          }
          console.log("array>>", array);
          dispatch(authActions.setTotal(response.data.total));
          dispatch(expenseActions.setExpenses(array));
        });
    }
  }, [authIsLoggedIn, activePage, total, LIMIT]);

  const expenseList = useSelector((state) => state.expense.expenses);
  // const totalExpenseAmount = expData.reduce((curNumber, item) => {
  //   return curNumber + Number.parseInt(item.amount);
  // }, 0);
  return (
    <Fragment>
      <div className="expense-data">
        {expenseList.length === 0 && (
          <div className="text-center">
            <h5>No expenses found!!</h5>
          </div>
        )}
        {expenseList.length > 0 && (
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">category</th>
                <th scope="col">Amount</th>
                <th scope="col">Date</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {expenseList.map((item) => (
                <ExpenseItem
                  date={item.date}
                  amount={item.amount}
                  description={item.description}
                  category={item.category}
                  id={item._id}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="paginationdiv">
        <nav aria-label="Page navigation example ">
          <ul className="pagination">
            {activePage !== 1 && (
              <li
                className="page-item"
                onClick={() =>
                  dispatch(authActions.setActivePage(activePage - 1))
                }
              >
                <a className="page-link" href="javascript:void(null)">
                  Previous
                </a>
              </li>
            )}
            {totalPagesCalculator(total, LIMIT).map((page) => (
              <li
                className={`page-item ${activePage === page ? "active" : ""}`}
                key={page}
              >
                <a
                  className="page-link"
                  href="javascript:void(null)"
                  onClick={() => dispatch(authActions.setActivePage(page))}
                >
                  {page}
                </a>
              </li>
            ))}
            {activePage !== totalPagesCalculator(total, LIMIT).length && (
              <li
                className="page-item"
                onClick={() =>
                  dispatch(authActions.setActivePage(activePage + 1))
                }
              >
                <a className="page-link" href="javascript:void(null)">
                  Next
                </a>
              </li>
            )}
          </ul>
        </nav>

        <Form>
          Rows per page:
          <Form.Select
            aria-label="Default select example"
            style={{ width: "70px" }}
            ref={selectInputRef}
            onChange={selectHandler}
            size="sm"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </Form.Select>
        </Form>
      </div>
    </Fragment>
  );
};
export default ExpenseData;
