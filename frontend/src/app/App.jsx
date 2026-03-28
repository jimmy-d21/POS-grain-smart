import { RouterProvider } from "react-router";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CashierProvider } from "./context/CashierContext.jsx";
import { DashboardProvider } from "./context/DashboardContext.jsx";
import { InventoryProvider } from "./context/InventoryContext.jsx";
import { MenuManagementProvider } from "./context/MenuManagementContext.jsx";
import { TransactionHistoryProvider } from "./context/TransactionHistoryContext.jsx";
import { StaffProvider } from "./context/StaffContext.jsx";
import { router } from "./routes.jsx";
import { Toaster } from "./components/sonner";

export default function App() {
  return (
    <AuthProvider>
      <CashierProvider>
        <DashboardProvider>
          <InventoryProvider>
            <MenuManagementProvider>
              <TransactionHistoryProvider>
                <StaffProvider>
                  <RouterProvider router={router} />
                  <Toaster position="top-right" />
                </StaffProvider>
              </TransactionHistoryProvider>
            </MenuManagementProvider>
          </InventoryProvider>
        </DashboardProvider>
      </CashierProvider>
    </AuthProvider>
  );
}
