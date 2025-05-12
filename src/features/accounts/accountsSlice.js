import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export const accountsSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(loanAmount, loanPurpose) {
        return {
          payload: { loan: loanAmount, loanPurpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        state.balance += action.payload.loan;
        state.loan = action.payload.loan;
        state.loanPurpose = action.payload.loanPurpose;
      },
    },
    payLoan(state, action) {
      state.balance -= action.payload;
      state.loan = 0;
      state.loanPurpose = "";
    },
    converting(state, action) {
      state.isLoading = true;
    },
  },
});

export function deposit(depositAmount, currency) {
  if (currency === "USD")
    return { type: "account/deposit", payload: depositAmount };
  else {
    return async function (dispatch, getState) {
      dispatch({ type: "account/converting" });
      const res = await fetch(
        `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=${"USD"}`
      );
      const data = await res.json();
      const convertedAmount = (depositAmount * data.rates["USD"]).toFixed(2);
      return dispatch({
        type: "account/deposit",
        payload: Number(convertedAmount),
      });
    };
  }
}

// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposit":
//       console.log("Deposting Running");
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };

//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/payLoan":
//       return {
//         ...state,
//         balance: state.balance - state.loan,
//         loan: 0,
//         loanPurpose: "",
//       };

//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.loan,
//         loanPurpose: action.payload.loanPurpose,
//         balance: state.balance + action.payload.loan,
//       };

//     case "account/converting":
//       return { ...state, isLoading: true };

//     default:
//       return state;
//   }
// }

// export function deposit(depositAmount, currency) {
//   if (currency === "USD")
//     return { type: "account/deposit", payload: depositAmount };
//   else {
//     return async function (dispatch, getState) {
//       dispatch({ type: "account/converting" });
//       const res = await fetch(
//         `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=${"USD"}`
//       );
//       const data = await res.json();
//       const convertedAmount = (depositAmount * data.rates["USD"]).toFixed(2);
//       return dispatch({
//         type: "account/deposit",
//         payload: Number(convertedAmount),
//       });
//     };
//   }
// }
// export function withdraw(withdrawAmount) {
//   return { type: "account/withdraw", payload: withdrawAmount };
// }
// export function payLoan(loan) {
//   return { type: "account/payLoan", payload: loan };
// }
// export function requestLoan(loan, loanPurpose) {
//   return { type: "account/requestLoan", payload: { loan, loanPurpose } };
// }

export const { withdraw, payLoan, requestLoan } = accountsSlice.actions;

export default accountsSlice.reducer;
