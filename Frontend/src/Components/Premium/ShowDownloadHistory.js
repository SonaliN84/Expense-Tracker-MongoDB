import { Button } from "react-bootstrap";
// import './ShowDownloadHistory.css'
const ShowDownloadHistory = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid grey",
        alignItems: "center",
      }}
    >
      <div>
        Downloaded on:{" "}
        <p
          style={{ display: "inline", fontWeight: "bold", fontStyle: "italic" }}
        >
          {props.date.split("G")[0]}
        </p>
      </div>
      <Button className="my-3" size="sm">
        <a href={props.file} style={{ textDecoration: "none", color: "white" }}>
          Download Again
        </a>
      </Button>
    </div>
  );
};
export default ShowDownloadHistory;
