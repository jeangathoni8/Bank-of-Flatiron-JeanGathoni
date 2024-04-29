import React from "react";
import Transaction from "./Transaction";

function TransactionsList({ data, onDelete }) {
  return (
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
          <th>
            <h3 className="ui center aligned header">Date</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Description</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Category</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Amount</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Actions</h3>
          </th>
        </tr>
        
        {data.map(dataItem => (
          <Transaction
            key={dataItem.id}
            date={dataItem.date}
            description={dataItem.description}
            category={dataItem.category}
            amount={dataItem.amount}
            onDelete={() => onDelete(dataItem.id)}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TransactionsList;
