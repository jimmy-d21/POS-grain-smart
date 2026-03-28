import { createContext, useContext, useState } from "react";
import { mockMenuItems, mockAddOns } from "../data/mockData";

const CashierContext = createContext(undefined);

export function CashierProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartItem = (id, updates) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  return (
    <CashierContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        addTransaction,
        transactions,
        menuItems: mockMenuItems,
        addOns: mockAddOns,
      }}
    >
      {children}
    </CashierContext.Provider>
  );
}

export const useCashier = () => {
  const ctx = useContext(CashierContext);
  if (ctx === undefined) {
    throw new Error("useCashier must be used within CashierProvider");
  }
  return ctx;
};
