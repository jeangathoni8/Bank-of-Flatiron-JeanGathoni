import React from "react";  // Removed useState since it's not used

function AddTransactionForm({ fetchFunction }) {
  function handleSubmit(e) {
    e.preventDefault(); // This stays here to prevent form submission
    const formData = {
      date: e.target.date.value,
      description: e.target.description.value,
      category: e.target.category.value,
      amount: parseFloat(e.target.amount.value)
    };
  
    // Pass formData to fetchFunction
    fetchFunction(formData);
    e.target.reset(); // Reset form fields
  }
  
  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input type="date" name="date" />
          <input type="text" name="description" placeholder="Description" />
          <input type="text" name="category" placeholder="Category" />
          <input type="number" name="amount" placeholder="Amount" step="0.01" />
          <button className="ui button" type="submit">
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTransactionForm;
