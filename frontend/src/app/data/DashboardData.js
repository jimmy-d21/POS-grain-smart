export const dashboardDate = new Date("2026-03-25");

export const dashboardChartColors = [
  "#2d5f3f",
  "#8b6f47",
  "#4a7c59",
  "#d4a574",
  "#1f4529",
];

export const dashboardDefaultData = {
  overview: {
    todayRevenue: 12345.5,
    todayOrders: 120,
    weeklyRevenue: 78440.75,
    lowStockCount: 8,
  },
  hourlySales: [
    { hour: 8, total: 3500.12, orders: 25 },
    { hour: 9, total: 4300.01, orders: 31 },
    { hour: 10, total: 5100.7, orders: 40 },
    { hour: 11, total: 4700.4, orders: 38 },
    { hour: 12, total: 5200.95, orders: 44 },
    { hour: 13, total: 4500.2, orders: 36 },
    { hour: 14, total: 4100.35, orders: 33 },
    { hour: 15, total: 4800.67, orders: 39 },
    { hour: 16, total: 5700.35, orders: 45 },
    { hour: 17, total: 5900.92, orders: 49 },
    { hour: 18, total: 6100.55, orders: 52 },
    { hour: 19, total: 5600.25, orders: 47 },
    { hour: 20, total: 4900.85, orders: 41 },
    { hour: 21, total: 3200.1, orders: 28 },
  ],
  categorySales: [
    { name: "Regular Drinks", value: 31200.32 },
    { name: "Frappee", value: 21000.45 },
    { name: "Shimmer Juices", value: 9800.88 },
    { name: "Premium Drinks", value: 7600.65 },
    { name: "Rice Coffee Series", value: 10200.45 },
  ],
  bestSellers: [
    { name: "Classic Coffee", count: 52, revenue: 3380.0 },
    { name: "Americano", count: 47, revenue: 3290.0 },
    { name: "Cappuccino", count: 40, revenue: 3200.0 },
    { name: "Caramel Coffee Frappee", count: 35, revenue: 3500.0 },
    { name: "Barley Matcha", count: 28, revenue: 3080.0 },
  ],
  lowStockItems: [
    {
      name: "22oz Cups",
      category: "Cups & Lids",
      currentStock: 450,
      reorderLevel: 600,
      unit: "pcs",
    },
    {
      name: "Rice Coffee Blend",
      category: "Coffee",
      currentStock: 4,
      reorderLevel: 8,
      unit: "kg",
    },
    {
      name: "Matcha Powder",
      category: "Powders",
      currentStock: 3,
      reorderLevel: 5,
      unit: "kg",
    },
  ],
};
