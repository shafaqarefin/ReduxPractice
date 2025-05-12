import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import accountReducer from "./features/accounts/accountsSlice";
import customerReducer from "./features/customers/customerSlice";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  accounts: accountReducer,
  customers: customerReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
