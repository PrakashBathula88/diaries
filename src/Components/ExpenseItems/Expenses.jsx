import { useDispatch } from "react-redux";
import { CSVLink } from "react-csv";
import "./Expenses.css";
// import { Addcart } from "../Components/Auth/Auth";
import { Addcart } from "../Auth/Auth";
const Expenselist = ({ itemList, onRemove, onEdit }) => {
  const dispatch = useDispatch();

  const submiting = (expense) => {
    dispatch(Addcart(expense));
    alert("Added to the Cart");
  };

  const headers = [
    { label: "Amount", key: "amount" },
    { label: "Date", key: "date" },
    { label: "Paid To", key: "paidTo" },
  ];

  const csvFileData = itemList.map((expense) => ({
    amount: expense.amount,
    date: expense.date,
    paidTo: expense.paidTo,
  }));
  return (
    <div className="expenses-table-container">
      <h3>Expenses List</h3>
      <table className="expenses-table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Date</th>
            <th>Paid To</th>
            <th>Icon</th>
            <th className="Actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((expense) => (
            <tr key={expense.id} className="expense-item">
              <td>{expense.amount}</td>
              <td>{expense.date}</td>
              <td>{expense.paidTo}</td>
              <td>{expense.icons}</td>
              <td>
                <button onClick={() => onEdit(expense)} className="edit-button">
                  Edit
                </button>
                <button
                  onClick={() => onRemove(expense.id)}
                  className="delete-button"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    submiting(expense);
                  }}
                  className="cartutton"
                >
                  Cart
                </button>
                <button>
                  <CSVLink
                    data={csvFileData}
                    headers={headers}
                    filename={"expenses.csv"}
                  >
                    Download
                  </CSVLink>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Expenselist;
