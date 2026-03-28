import { createContext, useContext, useState } from "react";
import { mockMenuItems } from "../data/mockData";

const MenuManagementContext = createContext(undefined);

export function MenuManagementProvider({ children }) {
  const [menuItems, setMenuItems] = useState(mockMenuItems);

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

  return (
    <MenuManagementContext.Provider
      value={{ menuItems, addMenuItem, updateMenuItem, deleteMenuItem }}
    >
      {children}
    </MenuManagementContext.Provider>
  );
}

export const useMenuManagement = () => {
  const ctx = useContext(MenuManagementContext);
  if (ctx === undefined) {
    throw new Error(
      "useMenuManagement must be used within MenuManagementProvider",
    );
  }
  return ctx;
};
