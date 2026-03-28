import { createContext, useContext, useState } from "react";
import {
  mockMenuItems,
  mockAddOns,
  mockInventory,
  mockStaff,
  mockTransactions,
  demoPasswords,
} from "./data";

// Store Context
const StoreContext = createContext(undefined);

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [menuItems, setMenuItems] = useState(mockMenuItems);
  const [inventory, setInventory] = useState(mockInventory);
  const [staff, setStaff] = useState(mockStaff);
  const [addOns, setAddOns] = useState(mockAddOns);
  const [currentUser, setCurrentUser] = useState(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem("grainsmart_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated =
    currentUser !== null && currentUser.status === "Active";

  const login = (email, password) => {
    const user = staff.find(
      (s) => s.email.toLowerCase() === email.toLowerCase(),
    );

    if (
      user &&
      user.status === "Active" &&
      demoPasswords[user.email] === password
    ) {
      setCurrentUser(user);
      localStorage.setItem("grainsmart_user", JSON.stringify(user));
      return true;
    }

    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setCart([]);
    localStorage.removeItem("grainsmart_user");
  };

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

  const addMenuItem = (item) => {
    setMenuItems((prev) => [...prev, item]);
  };

  const updateMenuItem = (id, updates) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  };

  const deleteMenuItem = (id) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateInventory = (id, updates) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  };

  const addStaff = (staffMember) => {
    setStaff((prev) => [...prev, staffMember]);
  };

  const updateStaff = (id, updates) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    );
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        transactions,
        addTransaction,
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        inventory,
        updateInventory,
        staff,
        addStaff,
        updateStaff,
        currentUser,
        addOns,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
