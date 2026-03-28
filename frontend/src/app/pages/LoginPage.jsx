import { useState } from "react";
import { useNavigate } from "react-router";
import { useStore } from "../lib/store.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/card";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Coffee, Lock, Mail } from "lucide-react";
import { toast } from "sonner";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const success = login(email, password);

      if (success) {
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Invalid email or password");
        setIsLoading(false);
      }
    }, 500);
  };

  const handleDemoLogin = (role) => {
    const demoCredentials = {
      Manager: { email: "maria.santos@grainsmart.com", password: "admin123" },
      Cashier: {
        email: "juan.delacruz@grainsmart.com",
        password: "cashier123",
      },
    };

    const creds = demoCredentials[role];
    setEmail(creds.email);
    setPassword(creds.password);

    setIsLoading(true);
    setTimeout(() => {
      login(creds.email, creds.password);
      toast.success(`Logged in as ${role}!`);
      navigate("/");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Brand */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-2xl shadow-lg mb-4">
            <Coffee className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            Grainsmart Coffee
          </h1>
          <p className="text-muted-foreground">Point of Sale System</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to access the POS system</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@grainsmart.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-muted/50"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-muted/50"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-6 space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Demo Accounts
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleDemoLogin("Manager")}
                  disabled={isLoading}
                  className="w-full border-border"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Manager Demo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleDemoLogin("Cashier")}
                  disabled={isLoading}
                  className="w-full border-border"
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  Cashier Demo
                </Button>
              </div>

              <div className="text-xs text-muted-foreground text-center space-y-1 mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="font-semibold">Demo Credentials:</p>
                <p>Manager: maria.santos@grainsmart.com / admin123</p>
                <p>Cashier: juan.delacruz@grainsmart.com / cashier123</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          © 2026 Grainsmart Coffee. All rights reserved.
        </p>
      </div>
    </div>
  );
}
