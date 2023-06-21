import { useSelector } from "react-redux";
import "./premium.css";
import Table from "react-bootstrap/Table";
import ShowLeaderboardData from "./ShowLeaderboardData";
import { Container } from "react-bootstrap";
const LeaderboardAnalysis = () => {
  const expenseLeaderboardData = useSelector(
    (state) => state.expense.leaderboardData
  );
  console.log("<<>><>", expenseLeaderboardData);
  return (
    <div className="Cover">
      <Table hover style={{ width: "100%" }}>
        <thead>
          <tr>
            <th style={{ width: "30%" }}>#</th>
            <th style={{ width: "30%" }}>Name</th>
            <th style={{ width: "30%" }}>Total Expense</th>
          </tr>
        </thead>
        <tbody>
          {expenseLeaderboardData.map((data, index) => (
            <ShowLeaderboardData
              name={data.name}
              totalexpense={data.totalexpense}
              index={index}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default LeaderboardAnalysis;
