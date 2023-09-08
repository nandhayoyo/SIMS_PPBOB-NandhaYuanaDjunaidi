// History.js
import React, { useEffect, useState } from "react";
import "../styles/History.scss";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import {
  fetchHistory,
  getHistory,
  incrementOffset,
} from "../store/slice/historySlice";
import { LIMIT_HISTORY, OFFSET_HISTORY } from "../constants/variable";

const History = () => {
  const [more, setMore] = useState(0);

  const dispatch = useDispatch();
  const historyData = useSelector((state) => state.history.data);
  const historyStatus = useSelector((state) => state.history.status);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy HH:mm:ss", { locale: id });
  };

  useEffect(() => {
    if (historyStatus === "idle") {
      dispatch(
        fetchHistory({
          offset: OFFSET_HISTORY,
          limit: LIMIT_HISTORY,
        })
      );
    }
  }, [historyStatus, dispatch]);

  useEffect(() => {
    if (historyStatus !== "idle") {
      dispatch(
        fetchHistory({
          offset: more,
          limit: LIMIT_HISTORY,
        })
      );
    }
  }, [more]);

  const renderTransactionType = (transactionType) => {
    if (transactionType === "PAYMENT") {
      return <span className="red-text">{transactionType}</span>;
    } else if (transactionType === "TOPUP") {
      return <span className="green-text">{transactionType}</span>;
    } else {
      return transactionType;
    }
  };

  const handleShowMoreClick = () => {
    // dispatch(incrementOffset());
    setMore(more + LIMIT_HISTORY);
  };

  console.log("HISTORRRY ", historyData);

  return (
    <div className="container">
      <h5>Semua Transaksi</h5>
      {historyStatus === "loading" && <p>Loading...</p>}
      {historyData.records.map((transaction) => (
        <div className="row" key={transaction.invoice_number}>
          <div className="history-card">
            <div className="col">
              <h5
                className={
                  transaction.transaction_type === "PAYMENT"
                    ? "negative"
                    : "positive"
                }
              >
                {transaction.transaction_type === "PAYMENT" ? "- " : "+ "} Rp{" "}
                {transaction.total_amount}
              </h5>
              <p>{formatDate(transaction.created_on)}</p>
            </div>
            <p>{renderTransactionType(transaction.transaction_type)}</p>
          </div>{" "}
        </div>
      ))}

      {historyStatus === "succeeded" && (
        <button className="button-history" onClick={handleShowMoreClick}>
          Show More
        </button>
      )}
    </div>
  );
};

export default History;
