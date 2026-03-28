import { createContext, useContext, useState } from "react";
import {
  mockTransactions,
  mockMenuItems,
  mockInventory,
} from "../data/mockData";

const DashboardContext = createContext(undefined);

export function DashboardProvider({ children }) {
  const [transactions] = useState(mockTransactions);
  const [menuItems] = useState(mockMenuItems);
  const [inventory] = useState(mockInventory);

  return (
    <DashboardContext.Provider
      value={{
        transactions,
        menuItems,
        inventory,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (ctx === undefined) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return ctx;
};
