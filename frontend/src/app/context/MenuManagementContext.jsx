import { createContext, useContext } from "react";
import { useStore } from "../lib/store.jsx";

const MenuManagementContext = createContext(undefined);

export function MenuManagementProvider({ children }) {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useStore();

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
