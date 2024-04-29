import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";  // Make sure this component can handle onDelete prop
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";  // Assume this form handles onSubmit with proper event prevention

function AccountContainer() {
  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then(res => res.json())
      .then(data => setAccountData(data))
      .catch(error => console.log(error));
  }, []);

  const searchFunction = (searchTerms) => {
    fetch("http://localhost:8001/transactions")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(item => item.description.toLowerCase().includes(searchTerms.toLowerCase()));
        setAccountData(filtered);
      })
      .catch(error => console.log(error));
  };

  const fetchAddData = (submitted) => {
    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(submitted)
    })
    .then(res => res.json())
    .then(data => setAccountData(prevData => [...prevData, data]))
    .catch(error => console.log(error));
  };
  
  const sortTransactions = (sortBy) => {
    setAccountData(prevData => [...prevData].sort((a, b) => {
      if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) return -1;
      if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) return 1;
      return 0;
    }));
  };

  const deleteTransaction = (id) => {
    fetch(`http://localhost:8001/transactions/${id}`, { method: 'DELETE' })
    .then(response => {
      if (response.ok) {
        setAccountData(prevData => prevData.filter(item => item.id !== id));
      } else {
        console.error('Failed to delete the transaction');
      }
    })
    .catch(error => console.log("Error deleting transaction:", error));
  };

  return (
    <div>
      <Search searchFunction={searchFunction} />
      <AddTransactionForm fetchFunction={fetchAddData} />
      <div>
        <label>Sort by: </label>
        <select onChange={(e) => sortTransactions(e.target.value)}>
          <option value="description">Description</option>
          <option value="category">Category</option>
        </select>
      </div>
      <TransactionsList data={accountData} onDelete={deleteTransaction} />
    </div>
  );
}

export default AccountContainer;
