import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(customerName, nationalID) {
        return {
          payload: {
            customerName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.customerName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});
// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         nationalID: action.payload.nationalID,
//         fullName: action.payload.fullName,
//         createdAt: action.payload.createdAt,
//       };

//     case "customer/updateCustomerName":
//       return { ...state, fullName: action.payload };

//     default:
//       return state;
//   }
// }

// export function updateName(fullName) {
//   return { type: "customer/updateCustomerName", payload: fullName };
// }

// export function createCustomer(fullName, nationalID) {
//   return {
//     type: "customer/createCustomer",
//     payload: { fullName, nationalID, createdAt: new Date().toISOString() },
//   };
// }

export default customerSlice.reducer;

export const { createCustomer, updateName } = customerSlice.actions;
