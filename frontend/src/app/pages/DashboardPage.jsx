import { useStore } from "../lib/store.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DollarSign, ShoppingCart, TrendingUp, Package } from "lucide-react";

export function DashboardPage() {
  const { transactions, menuItems, inventory } = useStore();

  // Calculate today's data
  const today = new Date("2026-03-25");
  const todayTransactions = transactions.filter((t) => {
    const txDate = new Date(t.date);
    return (
      txDate.getDate() === today.getDate() &&
      txDate.getMonth() === today.getMonth() &&
      txDate.getFullYear() === today.getFullYear() &&
      t.status === "Completed"
    );
  });

  const todaySales = todayTransactions.reduce((sum, t) => sum + t.total, 0);
  const todayOrders = todayTransactions.length;

  // Calculate week's data
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - 6);
  const weekTransactions = transactions.filter((t) => {
    const txDate = new Date(t.date);
    return txDate >= weekStart && txDate <= today && t.status === "Completed";
  });

  const totalRevenue = weekTransactions.reduce((sum, t) => sum + t.total, 0);

  // Best selling items
  const itemSales = new Map();

  todayTransactions.forEach((transaction) => {
    transaction.items.forEach((item) => {
      const existing = itemSales.get(item.menuItem.id);
      if (existing) {
        existing.count += item.quantity;
        existing.revenue += item.subtotal;
      } else {
        itemSales.set(item.menuItem.id, {
          name: item.menuItem.name,
          count: item.quantity,
          revenue: item.subtotal,
        });
      }
    });
  });

  const bestSellers = Array.from(itemSales.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Peak hours data (hourly sales for today)
  const hourlyData = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 8; // 8 AM to 9 PM
    const hourTransactions = todayTransactions.filter((t) => {
      const txHour = new Date(t.date).getHours();
      return txHour === hour;
    });

    return {
      hour,
      total: hourTransactions.reduce((sum, t) => sum + t.total, 0),
      orders: hourTransactions.length,
    };
  });
  const categoryData = new Map();

  todayTransactions.forEach((transaction) => {
    transaction.items.forEach((item) => {
      const category = item.menuItem.category;
      categoryData.set(
        category,
        (categoryData.get(category) || 0) + item.subtotal,
      );
    });
  });

  const categoryChartData = Array.from(categoryData.entries()).map(
    ([name, value]) => ({
      name,
      value,
    }),
  );

  const COLORS = ["#2d5f3f", "#8b6f47", "#4a7c59", "#d4a574", "#1f4529"];

  // Low stock items
  const lowStockItems = inventory.filter(
    (item) => item.currentStock <= item.reorderLevel,
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">Manager Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of store performance and metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today's Revenue
            </CardTitle>
            <DollarSign className="w-5 h-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₱{todaySales.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {todayOrders} orders today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
            <ShoppingCart className="w-5 h-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{todayOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Completed today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Weekly Revenue
            </CardTitle>
            <TrendingUp className="w-5 h-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₱{totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Low Stock Items
            </CardTitle>
            <Package className="w-5 h-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">
              {lowStockItems.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Need reorder</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Peak Hours Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Peak Sales Hours - Today</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis yAxisId="left" orientation="left" stroke="#2d5f3f" />
                <YAxis yAxisId="right" orientation="right" stroke="#8b6f47" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="total"
                  stroke="#2d5f3f"
                  name="Revenue (₱)"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  stroke="#8b6f47"
                  name="Orders"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category - Today</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Best Sellers */}
      <Card>
        <CardHeader>
          <CardTitle>Best Selling Items - Today</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bestSellers}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#2d5f3f" />
              <YAxis yAxisId="right" orientation="right" stroke="#8b6f47" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="count"
                fill="#2d5f3f"
                name="Quantity Sold"
              />
              <Bar
                yAxisId="right"
                dataKey="revenue"
                fill="#8b6f47"
                name="Revenue (₱)"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 bg-destructive/10 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-destructive">
                      {item.currentStock} {item.unit}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Reorder at {item.reorderLevel} {item.unit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
