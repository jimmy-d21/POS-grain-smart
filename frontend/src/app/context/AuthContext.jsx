import { createContext, useContext } from "react";
import { useStore } from "../lib/store.jsx";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const { currentUser, isAuthenticated, login, logout } = useStore();

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
