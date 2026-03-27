import { RouterProvider } from "react-router";
import { StoreProvider } from "./lib/store.jsx";
import { router } from "./routes.jsx";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
      <Toaster />
    </StoreProvider>
  );
}
