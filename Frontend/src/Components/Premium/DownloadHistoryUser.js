import { useSelector } from "react-redux";
import ShowDownloadHistory from "./ShowDownloadHistory";
import "./premium.css";

const DownloadHistoryUser = () => {
  const downloadHistory = useSelector((state) => state.expense.downloadHistory);

  return (
    <div className="Cover">
      {downloadHistory.map((data, index) => (
        <ShowDownloadHistory file={data.fileURL} date={data.date} />
      ))}
    </div>
  );
};
export default DownloadHistoryUser;
