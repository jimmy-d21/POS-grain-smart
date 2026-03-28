import { createContext, useContext, useState } from "react";
import { mockTransactions } from "../data/mockData";

const TransactionHistoryContext = createContext(undefined);

export function TransactionHistoryProvider({ children }) {
  const [transactions] = useState(mockTransactions);

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
