import { Row, Col, Button } from "react-bootstrap";
import "./ExpenseItem.css";
import axios from "axios";

import { useDispatch } from "react-redux";
import { expenseActions } from "../../../Store/expense-slice";
import { useSelector } from "react-redux";
import { authActions } from "../../../Store/auth-slice";
const ExpenseItem = (props) => {
  const expData = useSelector((state) => state.expense.expenses);
  console.log("exp dta>>>", expData);
  const dispatch = useDispatch();
  const total = useSelector((state) => state.auth.total);
  const authToken = useSelector((state) => state.auth.token);
  const activePage = useSelector((state) => state.auth.activePage);

  const deleteExpenseHandler = () => {
    axios
      .delete(`http://localhost:3000/expense/delete-expense/${props.id}`, {
        headers: { Authorization: authToken },
      })
      .then(() => {
        let array = expData.filter((item) => item._id != props.id);
        dispatch(expenseActions.setExpenses(array));

        dispatch(authActions.setActivePage(activePage));
        dispatch(authActions.setTotal(total - 1));

        // axios.get('http://localhost:3000/expense',{headers:{"Authorization":authToken}})
        // .then((response)=>{
        //     console.log(response)
        //     console.log(response.data,"get")

        //     dispatch(expenseActions.setExpenses(response.data))
        // })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editExpenseHandler = () => {
    dispatch(expenseActions.setIsForm(true));
    dispatch(expenseActions.setIsEdit(true));
    dispatch(
      expenseActions.setEditExpense({
        id: props.id,
        amount: props.amount,
        description: props.description,
        category: props.category,
        date: props.date,
      })
    );
  };
  return (
    <tr style={{ borderBottom: "1px solid grey" }}>
      <td>{props.description}</td>
      <td>{props.category}</td>
      <td>{props.amount}</td>
      <td>{props.date}</td>
      <td>
        {/* <Button onClick={editExpenseHandler} size="sm" >Edit</Button>    */}
        <Button onClick={deleteExpenseHandler} size="sm" className="mx-2">
          x
        </Button>
      </td>
    </tr>
  );
};
export default ExpenseItem;
