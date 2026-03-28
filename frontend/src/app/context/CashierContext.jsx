import { createContext, useContext } from "react";
import { useStore } from "../lib/store.jsx";

const CashierContext = createContext(undefined);

export function CashierProvider({ children }) {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    addTransaction,
    menuItems,
    addOns,
    currentUser,
  } = useStore();

  return (
    <CashierContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        addTransaction,
        menuItems,
        addOns,
        currentUser,
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
