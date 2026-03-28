import { createContext, useContext } from "react";
import { useStore } from "../lib/store.jsx";

const DashboardContext = createContext(undefined);

export function DashboardProvider({ children }) {
  const { transactions, menuItems, inventory } = useStore();

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
