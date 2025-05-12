import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";
function Customer() {
  const [fullName, setFullName] = useState("Shafaq Arefin");
  const [nationalId, setNationalId] = useState("1234");
  const dispatch = useDispatch();
  function handleClick(e) {
    e.preventDefault();
    dispatch(createCustomer(fullName, nationalId));
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <form className="inputs">
        <div>
          <label>Customer full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button onClick={(e) => handleClick(e)}>Create new customer</button>
      </form>
    </div>
  );
}

export default Customer;
