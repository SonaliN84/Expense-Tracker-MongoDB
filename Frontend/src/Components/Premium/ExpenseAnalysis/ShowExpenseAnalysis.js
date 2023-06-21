import { useSelector } from "react-redux";
import ShowAnalysisData from "./ShowAnalysisData";
import ExpAnalysisTable from "./ExpAnalysisTable";

const ShowExpenseAnalysis = () => {
  const expenseAnalysisData = useSelector(
    (state) => state.expense.expenseAnalysisData
  );

  const January = expenseAnalysisData.filter(
    (expense) => expense.month == "January"
  );
  January.sort(
    (a, b) => parseInt(a.date.split("-")[2]) - parseInt(b.date.split("-")[2])
  );

  const February = expenseAnalysisData.filter(
    (expense) => expense.month == "February"
  );
  February.sort(
    (a, b) => parseInt(a.date.split("-")[2]) - parseInt(b.date.split("-")[2])
  );

  const March = expenseAnalysisData.filter(
    (expense) => expense.month == "March"
  );
  March.sort(
    (a, b) => parseInt(a.date.split("-")[2]) - parseInt(b.date.split("-")[2])
  );

  const April = expenseAnalysisData.filter(
    (expense) => expense.month == "April"
  );
  April.sort(
    (a, b) => parseInt(a.date.split("-")[2]) - parseInt(b.date.split("-")[2])
  );

  const May = expenseAnalysisData.filter((expense) => expense.month == "May");
  May.sort(
    (a, b) => parseInt(a.date.split("-")[2]) - parseInt(b.date.split("-")[2])
  );

  const June = expenseAnalysisData.filter((expense) => expense.month == "June");
  June.sort(
    (a, b) => parseInt(a.date.split("-")[2]) - parseInt(b.date.split("-")[2])
  );

  const July = expenseAnalysisData.filter((expense) => expense.month == "July");
  July.sort(
    (a, b) => parseInt(a.date.split("-")[2]) - parseInt(b.date.split("-")[2])
  );

  const August = expenseAnalysisData.filter(
    (expense) => expense.month == "August"
  );
  August.sort(
    (a, b) => parseInt(a.date.split("-")[2]) - parseInt(b.date.split("-")[2])
  );

  const September = expenseAnalysisData.filter(
    (expense) => expense.month == "September"
  );
  September.sort(
    (a, b) => parseInt(a.date.split("-")[2]) - parseInt(b.date.split("-")[2])
  );

  const October = expenseAnalysisData.filter(
    (expense) => expense.month == "October"
  );
  October.sort(
    (a, b) => parseInt(a.date.split("-")[2]) - parseInt(b.date.split("-")[2])
  );

  const November = expenseAnalysisData.filter(
    (expense) => expense.month == "November"
  );
  November.sort(
    (a, b) => parseInt(a.date.split("-")[2]) - parseInt(b.date.split("-")[2])
  );

  const December = expenseAnalysisData.filter(
    (expense) => expense.month == "December"
  );
  December.sort(
    (a, b) => parseInt(a.date.split("-")[2]) - parseInt(b.date.split("-")[2])
  );

  const totalexpense = expenseAnalysisData.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);
  //    <option value="Fuel">Fuel</option>
  //    <option value="Food">Food</option>
  //    <option value="Electricity">Electricity</option>
  //    <option value="Shopping">Shopping</option>
  //    <option value="Others">Others</option>
  const Food = expenseAnalysisData.filter((item) => item.category == "Food");
  const foodExpenses = Food.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);
  const Fuel = expenseAnalysisData.filter((item) => item.category == "Fuel");
  const fuelExpenses = Fuel.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);
  const Electricity = expenseAnalysisData.filter(
    (item) => item.category == "Electricity"
  );
  const electricityExpenses = Electricity.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);
  const Shopping = expenseAnalysisData.filter(
    (item) => item.category == "Shopping"
  );
  const shoppingExpenses = Shopping.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);
  const Others = expenseAnalysisData.filter(
    (item) => item.category == "Others"
  );
  const othersExpenses = Others.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);

  return (
    <div className="Cover">
      {expenseAnalysisData.length === 0 && (
        <div className="text-center">
          <h5>No expenses found!!</h5>
        </div>
      )}
      {January.length > 0 && (
        <ExpAnalysisTable data={January} month="January" />
      )}
      {February.length > 0 && (
        <ExpAnalysisTable data={February} month="February" />
      )}
      {March.length > 0 && <ExpAnalysisTable data={March} month="March" />}
      {April.length > 0 && <ExpAnalysisTable data={April} month="April" />}
      {May.length > 0 && <ExpAnalysisTable data={May} month="May" />}
      {June.length > 0 && <ExpAnalysisTable data={June} month="June" />}
      {July.length > 0 && <ExpAnalysisTable data={July} month="July" />}
      {August.length > 0 && <ExpAnalysisTable data={August} month="August" />}
      {September.length > 0 && (
        <ExpAnalysisTable data={September} month="September" />
      )}
      {October.length > 0 && (
        <ExpAnalysisTable data={October} month="October" />
      )}
      {November.length > 0 && (
        <ExpAnalysisTable data={November} month="November" />
      )}
      {December.length > 0 && (
        <ExpAnalysisTable data={December} month="Decemebr" />
      )}

      {expenseAnalysisData.length > 0 && (
        <div>
          <h4
            style={{
              textAlign: "center",
              border: "1px solid #F7C8E0",
              padding: "5px",
              backgroundColor: "#F7C8E0",
              borderRadius: "10px",
            }}
            className="my-4"
          >
            Categorywise Analysis
          </h4>
          <table class="table">
            <thead style={{ borderBottom: "1px solid grey" }}>
              <tr>
                <th scope="col">Food</th>
                <th scope="col">Fuel</th>
                <th scope="col">Shopping</th>
                <th scope="col">Electricity</th>
                <th scope="col">Others</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rs.{foodExpenses}</td>
                <td>Rs.{fuelExpenses}</td>
                <td>Rs.{electricityExpenses}</td>
                <td>Rs.{shoppingExpenses}</td>
                <td>Rs.{othersExpenses}</td>
              </tr>
            </tbody>
          </table>
          <h4 className="text-center">Total Expense=Rs.{totalexpense}</h4>
        </div>
      )}
    </div>
  );
};
export default ShowExpenseAnalysis;
