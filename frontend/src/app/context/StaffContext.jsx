import { createContext, useContext } from "react";
import { useStore } from "../lib/store.jsx";

const StaffContext = createContext(undefined);

export function StaffProvider({ children }) {
  const { staff, addStaff, updateStaff } = useStore();

  return (
    <StaffContext.Provider value={{ staff, addStaff, updateStaff }}>
      {children}
    </StaffContext.Provider>
  );
}

export const useStaff = () => {
  const ctx = useContext(StaffContext);
  if (ctx === undefined) {
    throw new Error("useStaff must be used within StaffProvider");
  }
  return ctx;
};
