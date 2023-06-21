const ShowLeaderboardData = (props) => {
  return (
    <tr>
      <td style={{ width: "20%" }}>{props.index + 1}</td>
      <td style={{ width: "30%" }}>{props.name}</td>
      <td style={{ width: "30%" }}>
        {props.totalexpense == null ? 0 : props.totalexpense}
      </td>
    </tr>
  );
};
export default ShowLeaderboardData;
