import { createContext, useContext, useState } from "react";
import { mockStaff } from "../data/mockData";

const StaffContext = createContext(undefined);

export function StaffProvider({ children }) {
  const [staff, setStaff] = useState(mockStaff);

  const addStaff = (staffMember) => {
    setStaff((prev) => [...prev, staffMember]);
  };

  const updateStaff = (id, updates) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    );
  };

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
