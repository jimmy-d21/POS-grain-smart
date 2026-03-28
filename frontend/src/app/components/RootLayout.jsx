import { Outlet, NavLink, Navigate } from "react-router";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Menu,
  Receipt,
  Users,
  Coffee,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useCashier } from "../context/CashierContext.jsx";
import { Button } from "./ui/button";

export function RootLayout() {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { cart } = useCashier();

  // Redirect to login if not authenticated
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { path: "/", label: "Cashier", icon: ShoppingCart, exact: true },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/inventory", label: "Inventory", icon: Package },
    { path: "/menu", label: "Menu", icon: Menu },
    { path: "/transactions", label: "Transactions", icon: Receipt },
    { path: "/staff", label: "Staff", icon: Users, adminOnly: true }, // Manager only
  ];

  const filteredNavItems = navItems.filter(
    (item) => !item.adminOnly || currentUser.role === "Manager",
  );

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Coffee className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                Grainsmart
              </h1>
              <p className="text-xs text-muted-foreground">Coffee POS</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-lg">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-primary-foreground">
                {currentUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground">
                {currentUser.role}
              </p>
            </div>
            <Button variant="ghost" className="h-8 w-8 p-0" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
