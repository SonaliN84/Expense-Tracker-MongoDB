import { Fragment } from "react";
import "./User.css";

import { Link } from "react-router-dom";
import ExpenseForm from "./ExpenseData/ExpenseForm";
import ExpenseData from "./ExpenseData/ExpenseData";
import DownloadExpense from "./ExpenseData/DownloadExpense";

const User = () => {
  return (
    <Fragment>
      <div className="profile">
        Your profile is incomplete.
        <Link to="/ProfileUpdate" style={{ color: "white", marginLeft: "8px" }}>
          Complete now
        </Link>
      </div>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ margin: "10px auto", clear: "both" }}>
          Welcome to Expense Tracker
        </h2>
      </div>
      <ExpenseForm />
      <ExpenseData />
      <DownloadExpense />
    </Fragment>
  );
};
export default User;
