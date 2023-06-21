import ShowAnalysisData from "./ShowAnalysisData";
const ExpAnalysisTable = (props) => {
  return (
    <div className="my-5">
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
        {props.month}
      </h4>
      <table class="table">
        <thead style={{ borderBottom: "1px solid grey" }}>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">category</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item) => (
            <ShowAnalysisData
              date={item.date}
              amount={item.amount}
              description={item.description}
              category={item.category}
              id={item.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ExpAnalysisTable;
