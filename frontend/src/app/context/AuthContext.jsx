import { createContext, useContext, useState } from "react";
import { mockStaff, demoPasswords } from "../data/mockData";

const AuthContext = createContext(undefined);

const loadUserFromStorage = () => {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem("grainsmart_user");
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Error loading user from storage:", error);
    return null;
  }
};

const saveUserToStorage = (user) => {
  if (typeof window === "undefined") return;
  try {
    if (user) {
      localStorage.setItem("grainsmart_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("grainsmart_user");
    }
  } catch (error) {
    console.error("Error saving user to storage:", error);
  }
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => loadUserFromStorage());

  const isAuthenticated =
    currentUser !== null && currentUser.status === "Active";

  const login = (email, password) => {
    const user = mockStaff.find(
      (s) => s.email.toLowerCase() === email.toLowerCase(),
    );

    if (
      user &&
      user.status === "Active" &&
      demoPasswords[user.email] === password
    ) {
      setCurrentUser(user);
      saveUserToStorage(user);
      return true;
    }

    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    saveUserToStorage(null);
  };

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
