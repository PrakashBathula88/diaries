import { createSlice, configureStore } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: [],
  reducers: {
    setExpenses(state, action) {
      return action.payload;
    },
    addExpense(state, action) {
      state.push(action.payload);
    },
    removeExpense(state, action) {
      return state.filter((expense) => expense.id !== action.payload);
    },
    editingExpense(state, action) {
      const { id, updatedData } = action.payload;
      const index = state.findIndex((expense) => expense.id === id);

      if (index !== -1) {
        state[index] = { ...state[index], ...updatedData };
      }
    },
  },
});
const inital = {
  darkmode: false,
};

const themeSlice = createSlice({
  name: "ToggleTheme",
  initialState: inital,
  reducers: {
    changetheme(state) {
      state.darkmode = !state.darkmode;
    },
  },
});

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false},
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

const cartSlice = createSlice({
  name: "AddToCart",
  initialState: {
    cartitems: JSON.parse(localStorage.getItem("cartItems"))||[],
  },
  reducers: {
    Addcart(state, action) {
      state.cartitems = [...state.cartitems,action.payload];
      localStorage.setItem("cartItems", JSON.stringify(state.cartitems));
    },
    removecart(state, action) {
      state.cartitems = state.cartitems.filter(
        (expense) => expense.id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartitems));
    },
  },
});

export const { setExpenses, addExpense, removeExpense, editingExpense } =
  expensesSlice.actions;

export const { toggle } = uiSlice.actions;
export const { changetheme } = themeSlice.actions;

export const { Addcart, removecart } = cartSlice.actions;
export default cartSlice.reducer;
export const store = configureStore({
  reducer: {
    expenses: expensesSlice.reducer,
    theme: themeSlice.reducer,
    ui: uiSlice.reducer,
    Addingcart: cartSlice.reducer,
  },
});
