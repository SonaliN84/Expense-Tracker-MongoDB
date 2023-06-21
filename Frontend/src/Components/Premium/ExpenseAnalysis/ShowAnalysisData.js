const ShowAnalysisData = (props) => {
  return (
    <tr>
      <td>{props.description}</td>
      <td>{props.category}</td>
      <td>{props.amount}</td>
      <td>{props.date}</td>
    </tr>
  );
};
export default ShowAnalysisData;
