import { Fragment } from "react";
import ExpenseAnalysis from "../Components/Premium/ExpenseAnalysis/ExpenseAnalysis";
import ShowExpenseAnalysis from "../Components/Premium/ExpenseAnalysis/ShowExpenseAnalysis";
const ExpenseAnalysisPremium=()=>{
 return (
    <Fragment>
    <ExpenseAnalysis/>
    <ShowExpenseAnalysis/>
    </Fragment>
 );
}
export default ExpenseAnalysisPremium;