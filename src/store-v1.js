import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountsSlice";
import customerReducer from "./features/customers/customerSlice";

const store = configureStore({
  reducer: {
    accounts: accountReducer,
    customers: customerReducer,
  },
});

export default store;
