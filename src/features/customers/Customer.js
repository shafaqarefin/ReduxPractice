import { useSelector } from "react-redux";
function Customer() {
  const customerName = useSelector((select) => select.customers.fullName);
  return <h2>👋 Welcome, {customerName}</h2>;
}

export default Customer;
