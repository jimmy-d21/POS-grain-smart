import { createContext, useContext, useState } from "react";
import { mockInventory } from "../data/mockData";

const InventoryContext = createContext(undefined);

export function InventoryProvider({ children }) {
  const [inventory, setInventory] = useState(mockInventory);

  const updateInventory = (id, updates) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  };

  return (
    <InventoryContext.Provider value={{ inventory, updateInventory }}>
      {children}
    </InventoryContext.Provider>
  );
}

export const useInventory = () => {
  const ctx = useContext(InventoryContext);
  if (ctx === undefined) {
    throw new Error("useInventory must be used within InventoryProvider");
  }
  return ctx;
};
