import { createContext, useContext } from "react";
import { useStore } from "../lib/store.jsx";

const TransactionHistoryContext = createContext(undefined);

export function TransactionHistoryProvider({ children }) {
  const { transactions } = useStore();

  return (
    <TransactionHistoryContext.Provider value={{ transactions }}>
      {children}
    </TransactionHistoryContext.Provider>
  );
}

export const useTransactionHistory = () => {
  const ctx = useContext(TransactionHistoryContext);
  if (ctx === undefined) {
    throw new Error(
      "useTransactionHistory must be used within TransactionHistoryProvider",
    );
  }
  return ctx;
};
