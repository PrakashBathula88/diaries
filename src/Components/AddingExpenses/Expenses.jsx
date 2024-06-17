import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoStatsChartSharp } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { TbToolsKitchen3 } from "react-icons/tb";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { GiHealthNormal } from "react-icons/gi";
import { SiParamountplus } from "react-icons/si";
import { MdOtherHouses } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { FaArrowDownUpAcrossLine } from "react-icons/fa6";
import { MdOutlinePedalBike } from "react-icons/md";
import "../AddingExpenses/Expenses.css";
import Expenselist from "../ExpenseItems/Expenses";
import axios from "axios";
import { changetheme } from "../Auth/Auth";
import { FaCloudMoonRain } from "react-icons/fa6";
import { FaCloudSunRain } from "react-icons/fa";
import {
  setExpenses,
  addExpense,
  removeExpense,
  editingExpense,
} from "../Auth/Auth";
import { useDispatch, useSelector } from "react-redux";

export default function Expenses() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const expenses = useSelector((state) => state.expenses);
  const [paidto, setPaidTo] = useState("");
  const [icons, setIcon] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentid, setCurrentId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [totalexpense, setTotal] = useState(0);
  const darkMode = useSelector((state) => state.theme.darkmode);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const response = await axios.get(
          "https://expense-tracker-app-d6619-default-rtdb.firebaseio.com/Expense.json"
        );
        const fetchedExpenses = response.data
          ? Object.entries(response.data).map(([id, data]) => ({ id, ...data }))
          : [];
        dispatch(setExpenses(fetchedExpenses));
        if(fetchedExpenses.length>0){
          setVisible(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchingData();
  }, [dispatch]);
  const submiting = async (event) => {
    event.preventDefault();

    const newExpense = { amount, date, paidto, icons };
    if (isEditing) {
      try {
        await axios.put(
          `https://expense-tracker-app-d6619-default-rtdb.firebaseio.com/Expense.json`,
          newExpense
        );
        dispatch(editingExpense({ id: currentid, updatedData: newExpense }));
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const response = await axios.post(
          "https://expense-tracker-app-d6619-default-rtdb.firebaseio.com/Expense.json",
          newExpense
        );
        const id = response.data.name;
        dispatch(addExpense({ id, ...newExpense }));
      } catch (err) {
        console.error(err);
      }
    }
    setAmount("");
    setDate("");
    setPaidTo("");
    setIcon("");
    setIsEditing(false);
    setCurrentId(null);
    setVisible(true);
  };

  const editingHandlingItems = (expense) => {
    setAmount(expense.amount);
    setDate(expense.date);
    setPaidTo(expense.paidto);
    setIcon(expense.icons);
    setIsEditing(true);
    setCurrentId(expense.id);
    setVisible(false);
  };

  const removingExpenses = async (id) => {
    try {
      await axios.delete(
        `https://expense-tracker-app-d6619-default-rtdb.firebaseio.com/Expense/${id}.json`
      );
      dispatch(removeExpense(id));
      console.log("SUCCESSFULLY DELETED");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const total = expenses.reduce(
      (acc, expense) => acc + parseInt(expense.amount),
      0
    );
    setTotal(total);
  }, [expenses]);

  const themeHandle = () => {
    dispatch(changetheme());
  };
  return (
    <div className={`All-background-items ${darkMode ? "dark" : "light"}`}>
      <button onClick={themeHandle} className="All-button">
        {darkMode
          ? " Light" && <FaCloudSunRain className="cloudy" />
          : " Dark" && <FaCloudMoonRain className="rainy"/>}

          
      </button>
      <form onSubmit={submiting}>
        <div className="All-amount-box">
          <h3>{isEditing ? "Edit Expense" : "Amount Spent"}</h3>
          <div className="Enter-amount">
            <FaRupeeSign className="rupee" />
            <input
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <FaArrowRightFromBracket className="bracket" />
          </div>
          <div className="All-date-items">
            <div className="All-date_timings">
              <label>Date & Time</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="All-date_paid">
              <label>Paid to</label>
              <input
                type="text"
                placeholder="Enter the name or place"
                value={paidto}
                onChange={(e) => setPaidTo(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div
          className="aLL-icons"
          value={icons}
          onChange={(e) => setIcon(e.target.value)}
          required
        >
          <p onClick={() => setIcon(<FaMoneyCheckDollar />)} required>
            <FaMoneyCheckDollar className="All-iconic-stars" />
          </p>
          <p onClick={() => setIcon(<IoStatsChartSharp />)} required>
            <IoStatsChartSharp className="All-iconic-sharp" />
          </p>
          <p onClick={() => setIcon(<BsStars />)} required>
            <BsStars className="All-iconic-enter" />
          </p>
          <p onClick={() => setIcon(<TbToolsKitchen3 />)} required>
            <TbToolsKitchen3 className="All-iconic-sood" />
          </p>
          <p onClick={() => setIcon(<BsFillFuelPumpFill />)} required>
            <BsFillFuelPumpFill className="All-iconic-fuels" />
          </p>
          <p onClick={() => setIcon(<MdOutlineLocalGroceryStore />)} required>
            <MdOutlineLocalGroceryStore className="All-iconic-groceries" />
          </p>
          <p onClick={() => setIcon(<GiHealthNormal />)} required>
            <GiHealthNormal className="All-iconic-health" />
          </p>
          <p onClick={() => setIcon(<SiParamountplus />)} required>
            <SiParamountplus className="All-iconic-inves" />
          </p>
          <p onClick={() => setIcon(<MdOtherHouses />)} required>
            <MdOtherHouses className="All-iconic-other" />
          </p>
          <p onClick={() => setIcon(<FaShoppingBag />)} required>
            <FaShoppingBag className="All-iconic-shopp" />
          </p>
          <p onClick={() => setIcon(<FaArrowDownUpAcrossLine />)} required>
            <FaArrowDownUpAcrossLine className="All-iconic-trans" />
          </p>
          <p onClick={() => setIcon(<MdOutlinePedalBike />)} required>
            <MdOutlinePedalBike className="All-iconic-travel" />
          </p>
        </div>

        <button className="save-button">{isEditing ? "Update" : "Save"}</button>
      </form>

     {visible &&<Expenselist
        itemList={expenses}
        onRemove={removingExpenses}
        onEdit={editingHandlingItems}
      />
}
      {totalexpense > 10000 && <button className="premiuum"  onClick={()=> alert("Premium Activated")}>Premium</button>}
    </div>
  );
}
