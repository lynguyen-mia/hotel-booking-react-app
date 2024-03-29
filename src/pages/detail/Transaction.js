import React from "react";
import { getToken } from "../../utils/authorizeToken";
import { useLoaderData } from "react-router-dom";

const Transaction = (props) => {
  const transactionArr = useLoaderData();

  function convertDates(date) {
    return date?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  }

  return (
    <div className="detail-container" style={{ marginBottom: "200px" }}>
      <h1 className="fs-5 fw-bold mb-3">Your Transactions</h1>
      {transactionArr.length === 0 && (
        <p className="text-center">No transaction found.</p>
      )}
      {transactionArr && transactionArr.length > 0 && (
        <table className="table table-striped table-bordered align-middle">
          <thead>
            <tr className="text-light" style={{ backgroundColor: "#1098ad" }}>
              <th>#</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactionArr?.map((transaction, index) => {
              const rooms = [];
              transaction.room.forEach((room) =>
                rooms.push(room.roomNumbers.toString())
              );
              const roomNums = rooms.join(", ");
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{transaction.hotel.title}</td>
                  <td>{roomNums}</td>
                  <td>{`${convertDates(
                    new Date(transaction.dateStart)
                  )} - ${convertDates(new Date(transaction.dateEnd))}`}</td>
                  <td>${transaction.price}</td>
                  <td>{transaction.payment}</td>
                  <td>
                    <span className="bg-success py-1 px-2 rounded-2 text-light">
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Transaction;

// Fetch transactions
export async function loader() {
  // Get current user Id
  const curUserJSON = localStorage.getItem("curUser");
  const curUser = JSON.parse(curUserJSON);
  const userId = curUser?.id;
  const token = getToken();

  const res = await fetch(
    "https://hotel-booking-node-app.onrender.com/all-transactions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ id: userId })
    }
  );

  if (!res.ok) {
    console.log("Couldn't fetch transactions.");
  }

  const transactions = await res.json();
  // console.log(transactions);
  return transactions;
}
