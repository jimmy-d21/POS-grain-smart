export const transactionStatuses = ["All", "Completed", "Refunded", "Pending"];
export const transactionFilters = ["search", "status"];

export const transactionHistoryDefaultData = {
  totals: {
    revenue: 345678.0,
    transactions: 412,
    completed: 387,
    refunded: 25,
  },
  recentTransactions: [
    {
      id: "txn-0042",
      cashier: "Juan Dela Cruz",
      date: "2026-03-25T12:45:00.000Z",
      paymentMethod: "Cash",
      total: 450.45,
      status: "Completed",
      items: 3,
    },
    {
      id: "txn-0043",
      cashier: "Ana Reyes",
      date: "2026-03-25T13:15:00.000Z",
      paymentMethod: "Card",
      total: 512.8,
      status: "Completed",
      items: 4,
    },
    {
      id: "txn-0044",
      cashier: "Juan Dela Cruz",
      date: "2026-03-25T14:20:00.000Z",
      paymentMethod: "E-Wallet",
      total: 189.25,
      status: "Refunded",
      items: 1,
    },
  ],
};
