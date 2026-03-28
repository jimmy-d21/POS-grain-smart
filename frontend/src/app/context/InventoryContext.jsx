import { createContext, useContext } from "react";
import { useStore } from "../lib/store.jsx";

const InventoryContext = createContext(undefined);

export function InventoryProvider({ children }) {
  const { inventory, updateInventory } = useStore();

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
