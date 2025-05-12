const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        nationalID: action.payload.nationalID,
        fullName: action.payload.fullName,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateCustomerName":
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
}

export function updateName(fullName) {
  return { type: "customer/updateCustomerName", payload: fullName };
}

export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}
