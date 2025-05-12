import { useSelector } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const balance = useSelector((userAccounts) => userAccounts.accounts.balance);
  return <div className="balance">{formatCurrency(Number(balance))}</div>;
}

export default BalanceDisplay;
