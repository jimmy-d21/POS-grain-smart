// Mock Data for Grainsmart Coffee POS System

// Menu Items - 27 total items across all categories
export const mockMenuItems = [
  // Regular Drinks (8 items)
  {
    id: "m1",
    name: "Classic Coffee",
    category: "Regular Drinks",
    basePrice: 65,
    temperature: "Both",
    availableSizes: ["12oz", "16oz", "22oz"],
  },
  {
    id: "m2",
    name: "Americano",
    category: "Regular Drinks",
    basePrice: 70,
    temperature: "Both",
    availableSizes: ["12oz", "16oz", "22oz"],
  },
  {
    id: "m3",
    name: "Cappuccino",
    category: "Regular Drinks",
    basePrice: 80,
    temperature: "Both",
    availableSizes: ["12oz", "16oz", "22oz"],
  },
  {
    id: "m4",
    name: "Orange Juice",
    category: "Regular Drinks",
    basePrice: 75,
    temperature: "Cold",
    availableSizes: ["12oz", "16oz", "22oz"],
  },
  {
    id: "m5",
    name: "Mango Juice",
    category: "Regular Drinks",
    basePrice: 75,
    temperature: "Cold",
    availableSizes: ["12oz", "16oz", "22oz"],
  },
  {
    id: "m6",
    name: "Classic Milk Tea",
    category: "Regular Drinks",
    basePrice: 70,
    temperature: "Both",
    availableSizes: ["12oz", "16oz", "22oz"],
  },
  {
    id: "m7",
    name: "Taro Milk Tea",
    category: "Regular Drinks",
    basePrice: 75,
    temperature: "Both",
    availableSizes: ["12oz", "16oz", "22oz"],
  },
  {
    id: "m8",
    name: "Wintermelon Milk Tea",
    category: "Regular Drinks",
    basePrice: 75,
    temperature: "Both",
    availableSizes: ["12oz", "16oz", "22oz"],
  },

  // Frappee (6 items) - Cream-Based and Coffee-Based
  {
    id: "f1",
    name: "Vanilla Cream Frappee",
    category: "Frappee",
    basePrice: 95,
    temperature: "Cold",
    availableSizes: ["16oz", "22oz"],
  },
  {
    id: "f2",
    name: "Chocolate Cream Frappee",
    category: "Frappee",
    basePrice: 95,
    temperature: "Cold",
    availableSizes: ["16oz", "22oz"],
  },
  {
    id: "f3",
    name: "Strawberry Cream Frappee",
    category: "Frappee",
    basePrice: 95,
    temperature: "Cold",
    availableSizes: ["16oz", "22oz"],
  },
  {
    id: "f4",
    name: "Mocha Coffee Frappee",
    category: "Frappee",
    basePrice: 100,
    temperature: "Cold",
    availableSizes: ["16oz", "22oz"],
  },
  {
    id: "f5",
    name: "Caramel Coffee Frappee",
    category: "Frappee",
    basePrice: 100,
    temperature: "Cold",
    availableSizes: ["16oz", "22oz"],
  },
  {
    id: "f6",
    name: "Java Chip Frappee",
    category: "Frappee",
    basePrice: 105,
    temperature: "Cold",
    availableSizes: ["16oz", "22oz"],
  },

  // Shimmer Juices (4 items) - 16oz only
  {
    id: "s1",
    name: "Strawberry Cherry Shimmer",
    category: "Shimmer Juices",
    basePrice: 85,
    temperature: "Cold",
    availableSizes: ["16oz"],
  },
  {
    id: "s2",
    name: "Lemon Cucumber Shimmer",
    category: "Shimmer Juices",
    basePrice: 85,
    temperature: "Cold",
    availableSizes: ["16oz"],
  },
  {
    id: "s3",
    name: "Blue Lemonade Shimmer",
    category: "Shimmer Juices",
    basePrice: 85,
    temperature: "Cold",
    availableSizes: ["16oz"],
  },
  {
    id: "s4",
    name: "Passion Fruit Shimmer",
    category: "Shimmer Juices",
    basePrice: 85,
    temperature: "Cold",
    availableSizes: ["16oz"],
  },

  // Premium Drinks (4 items) - Sweetened by Stevia, 16oz only
  {
    id: "p1",
    name: "Barley Matcha",
    category: "Premium Drinks",
    basePrice: 110,
    temperature: "Both",
    availableSizes: ["16oz"],
  },
  {
    id: "p2",
    name: "Vita Milk Tea",
    category: "Premium Drinks",
    basePrice: 110,
    temperature: "Both",
    availableSizes: ["16oz"],
  },
  {
    id: "p3",
    name: "Premium Green Tea Latte",
    category: "Premium Drinks",
    basePrice: 115,
    temperature: "Both",
    availableSizes: ["16oz"],
  },
  {
    id: "p4",
    name: "Hokkaido Milk Tea",
    category: "Premium Drinks",
    basePrice: 120,
    temperature: "Both",
    availableSizes: ["16oz"],
  },

  // Rice Coffee Series (5 items) - Hot/Cold
  {
    id: "r1",
    name: "Café Filipino",
    category: "Rice Coffee Series",
    basePrice: 90,
    temperature: "Both",
    availableSizes: ["12oz", "16oz", "22oz"],
  },
  {
    id: "r2",
    name: "Barley Latte",
    category: "Rice Coffee Series",
    basePrice: 95,
    temperature: "Both",
    availableSizes: ["12oz", "16oz", "22oz"],
  },
  {
    id: "r3",
    name: "Rice Coffee Mocha",
    category: "Rice Coffee Series",
    basePrice: 95,
    temperature: "Both",
    availableSizes: ["12oz", "16oz", "22oz"],
  },
];

// Add-ons - 8 items
export const mockAddOns = [
  { id: "a1", name: "Black Pearl", price: 15 },
  { id: "a2", name: "Mix Fruit Jelly", price: 15 },
  { id: "a3", name: "Cream Cheese", price: 20 },
  { id: "a4", name: "Coffee Jelly", price: 15 },
  { id: "a5", name: "Nata de Coco", price: 15 },
  { id: "a6", name: "Popping Boba", price: 20 },
  { id: "a7", name: "Extra Shot Espresso", price: 25 },
  { id: "a8", name: "Oat Milk", price: 20 },
];

// Inventory Items - 17 items with low-stock alerts
export const mockInventory = [
  {
    id: "i1",
    name: "12oz Cups",
    category: "Cups & Lids",
    currentStock: 850,
    unit: "pcs",
    reorderLevel: 500,
    lastRestocked: new Date("2026-03-20"),
  },
  {
    id: "i2",
    name: "16oz Cups",
    category: "Cups & Lids",
    currentStock: 1200,
    unit: "pcs",
    reorderLevel: 800,
    lastRestocked: new Date("2026-03-20"),
  },
  {
    id: "i3",
    name: "22oz Cups",
    category: "Cups & Lids",
    currentStock: 450,
    unit: "pcs",
    reorderLevel: 600,
    lastRestocked: new Date("2026-03-18"),
  },
  {
    id: "i4",
    name: "Coffee Beans (Arabica)",
    category: "Coffee",
    currentStock: 15,
    unit: "kg",
    reorderLevel: 10,
    lastRestocked: new Date("2026-03-22"),
  },
  {
    id: "i5",
    name: "Coffee Beans (Robusta)",
    category: "Coffee",
    currentStock: 8,
    unit: "kg",
    reorderLevel: 10,
    lastRestocked: new Date("2026-03-15"),
  },
  {
    id: "i17",
    name: "Rice Coffee Blend",
    category: "Coffee",
    currentStock: 4,
    unit: "kg",
    reorderLevel: 8,
    lastRestocked: new Date("2026-03-17"),
  },
  {
    id: "i6",
    name: "Milk (Fresh)",
    category: "Dairy",
    currentStock: 25,
    unit: "L",
    reorderLevel: 20,
    lastRestocked: new Date("2026-03-24"),
  },
  {
    id: "i7",
    name: "Oat Milk",
    category: "Dairy",
    currentStock: 12,
    unit: "L",
    reorderLevel: 15,
    lastRestocked: new Date("2026-03-23"),
  },
  {
    id: "i8",
    name: "Black Pearl (Tapioca)",
    category: "Toppings",
    currentStock: 5,
    unit: "kg",
    reorderLevel: 8,
    lastRestocked: new Date("2026-03-21"),
  },
  {
    id: "i9",
    name: "Fruit Jelly Mix",
    category: "Toppings",
    currentStock: 18,
    unit: "kg",
    reorderLevel: 10,
    lastRestocked: new Date("2026-03-23"),
  },
  {
    id: "i10",
    name: "Cream Cheese",
    category: "Toppings",
    currentStock: 7,
    unit: "kg",
    reorderLevel: 5,
    lastRestocked: new Date("2026-03-24"),
  },
  {
    id: "i11",
    name: "Vanilla Syrup",
    category: "Syrups",
    currentStock: 10,
    unit: "L",
    reorderLevel: 8,
    lastRestocked: new Date("2026-03-22"),
  },
  {
    id: "i12",
    name: "Chocolate Syrup",
    category: "Syrups",
    currentStock: 9,
    unit: "L",
    reorderLevel: 8,
    lastRestocked: new Date("2026-03-22"),
  },
  {
    id: "i13",
    name: "Caramel Syrup",
    category: "Syrups",
    currentStock: 11,
    unit: "L",
    reorderLevel: 8,
    lastRestocked: new Date("2026-03-22"),
  },
  {
    id: "i14",
    name: "Matcha Powder",
    category: "Powders",
    currentStock: 3,
    unit: "kg",
    reorderLevel: 5,
    lastRestocked: new Date("2026-03-19"),
  },
  {
    id: "i15",
    name: "Taro Powder",
    category: "Powders",
    currentStock: 6,
    unit: "kg",
    reorderLevel: 5,
    lastRestocked: new Date("2026-03-23"),
  },
  {
    id: "i16",
    name: "Barley",
    category: "Grains",
    currentStock: 12,
    unit: "kg",
    reorderLevel: 10,
    lastRestocked: new Date("2026-03-21"),
  },
];

// Staff Members - 4 members with roles
export const mockStaff = [
  {
    id: "st1",
    name: "Maria Santos",
    role: "Manager",
    email: "maria.santos@grainsmart.com",
    status: "Active",
  },
  {
    id: "st2",
    name: "Juan Dela Cruz",
    role: "Cashier",
    email: "juan.delacruz@grainsmart.com",
    status: "Active",
  },
  {
    id: "st3",
    name: "Ana Reyes",
    role: "Cashier",
    email: "ana.reyes@grainsmart.com",
    status: "Active",
  },
  {
    id: "st4",
    name: "Pedro Garcia",
    role: "Cashier",
    email: "pedro.garcia@grainsmart.com",
    status: "Inactive",
  },
];

// Demo Passwords (for login system)
export const demoPasswords = {
  "maria.santos@grainsmart.com": "admin123",
  "juan.delacruz@grainsmart.com": "cashier123",
  "ana.reyes@grainsmart.com": "cashier123",
  "pedro.garcia@grainsmart.com": "cashier123",
};

// Default Mock Transactions - Fixed data for consistent metrics
const createDefaultTransactions = () => {
  const transactions = [];
  const today = new Date("2026-03-25");

  // Today's transactions (March 25, 2026)
  const todayTransactions = [
    {
      items: [
        {
          id: "ci-1-0",
          menuItem: mockMenuItems[0], // Classic Coffee
          size: "16oz",
          temperature: "Hot",
          addOns: [mockAddOns[0]], // Espresso Shot
          quantity: 1,
          subtotal: (65 * 1.2 + 20) * 1,
        },
      ],
      date: new Date("2026-03-25T08:15:00"),
      paymentMethod: "Card",
      status: "Completed",
      cashier: mockStaff[0].name,
    },
    {
      items: [
        {
          id: "ci-2-0",
          menuItem: mockMenuItems[2], // Cappuccino
          size: "16oz",
          temperature: "Hot",
          addOns: [],
          quantity: 2,
          subtotal: 80 * 1.2 * 2,
        },
      ],
      date: new Date("2026-03-25T08:45:00"),
      paymentMethod: "Cash",
      status: "Completed",
      cashier: mockStaff[1].name,
    },
    {
      items: [
        {
          id: "ci-3-0",
          menuItem: mockMenuItems[3], // Orange Juice
          size: "12oz",
          temperature: "Cold",
          addOns: [],
          quantity: 1,
          subtotal: 75 * 1,
        },
      ],
      date: new Date("2026-03-25T09:20:00"),
      paymentMethod: "E-Wallet",
      status: "Completed",
      cashier: mockStaff[0].name,
    },
    {
      items: [
        {
          id: "ci-4-0",
          menuItem: mockMenuItems[5], // Classic Milk Tea
          size: "22oz",
          temperature: "Cold",
          addOns: [mockAddOns[1]], // Extra Pearls
          quantity: 1,
          subtotal: (70 * 1.4 + 15) * 1,
        },
      ],
      date: new Date("2026-03-25T09:50:00"),
      paymentMethod: "Card",
      status: "Completed",
      cashier: mockStaff[1].name,
    },
    {
      items: [
        {
          id: "ci-5-0",
          menuItem: mockMenuItems[1], // Americano
          size: "16oz",
          temperature: "Hot",
          addOns: [mockAddOns[0]], // Espresso Shot
          quantity: 1,
          subtotal: (70 * 1.2 + 20) * 1,
        },
      ],
      date: new Date("2026-03-25T10:15:00"),
      paymentMethod: "Cash",
      status: "Completed",
      cashier: mockStaff[2].name,
    },
    {
      items: [
        {
          id: "ci-6-0",
          menuItem: mockMenuItems[9], // Vanilla Cream Frappee
          size: "20oz",
          temperature: "Cold",
          addOns: [mockAddOns[2]], // Caramel Drizzle
          quantity: 1,
          subtotal: (95 * 1.3 + 10) * 1,
        },
      ],
      date: new Date("2026-03-25T10:45:00"),
      paymentMethod: "Card",
      status: "Completed",
      cashier: mockStaff[0].name,
    },
    {
      items: [
        {
          id: "ci-7-0",
          menuItem: mockMenuItems[6], // Taro Milk Tea
          size: "16oz",
          temperature: "Cold",
          addOns: [],
          quantity: 1,
          subtotal: 75 * 1.2,
        },
      ],
      date: new Date("2026-03-25T11:20:00"),
      paymentMethod: "E-Wallet",
      status: "Completed",
      cashier: mockStaff[1].name,
    },
    {
      items: [
        {
          id: "ci-8-0",
          menuItem: mockMenuItems[0], // Classic Coffee
          size: "12oz",
          temperature: "Hot",
          addOns: [],
          quantity: 3,
          subtotal: 65 * 1 * 3,
        },
      ],
      date: new Date("2026-03-25T12:00:00"),
      paymentMethod: "Cash",
      status: "Completed",
      cashier: mockStaff[2].name,
    },
    {
      items: [
        {
          id: "ci-9-0",
          menuItem: mockMenuItems[4], // Mango Juice
          size: "22oz",
          temperature: "Cold",
          addOns: [],
          quantity: 2,
          subtotal: 75 * 1.4 * 2,
        },
      ],
      date: new Date("2026-03-25T12:30:00"),
      paymentMethod: "Card",
      status: "Completed",
      cashier: mockStaff[0].name,
    },
    {
      items: [
        {
          id: "ci-10-0",
          menuItem: mockMenuItems[2], // Cappuccino
          size: "12oz",
          temperature: "Hot",
          addOns: [mockAddOns[0]], // Espresso Shot
          quantity: 1,
          subtotal: (80 * 1 + 20) * 1,
        },
      ],
      date: new Date("2026-03-25T13:15:00"),
      paymentMethod: "E-Wallet",
      status: "Completed",
      cashier: mockStaff[1].name,
    },
    {
      items: [
        {
          id: "ci-11-0",
          menuItem: mockMenuItems[8], // Chocolate Cream Frappee
          size: "20oz",
          temperature: "Cold",
          addOns: [mockAddOns[2]], // Caramel Drizzle
          quantity: 1,
          subtotal: (95 * 1.3 + 10) * 1,
        },
      ],
      date: new Date("2026-03-25T14:00:00"),
      paymentMethod: "Cash",
      status: "Completed",
      cashier: mockStaff[0].name,
    },
    {
      items: [
        {
          id: "ci-12-0",
          menuItem: mockMenuItems[1], // Americano
          size: "22oz",
          temperature: "Hot",
          addOns: [],
          quantity: 1,
          subtotal: 70 * 1.4,
        },
      ],
      date: new Date("2026-03-25T14:45:00"),
      paymentMethod: "Card",
      status: "Completed",
      cashier: mockStaff[2].name,
    },
    {
      items: [
        {
          id: "ci-13-0",
          menuItem: mockMenuItems[5], // Classic Milk Tea
          size: "16oz",
          temperature: "Cold",
          addOns: [mockAddOns[1]], // Extra Pearls
          quantity: 2,
          subtotal: (70 * 1.2 + 15) * 2,
        },
      ],
      date: new Date("2026-03-25T15:30:00"),
      paymentMethod: "E-Wallet",
      status: "Completed",
      cashier: mockStaff[1].name,
    },
    {
      items: [
        {
          id: "ci-14-0",
          menuItem: mockMenuItems[3], // Orange Juice
          size: "16oz",
          temperature: "Cold",
          addOns: [],
          quantity: 1,
          subtotal: 75 * 1.2,
        },
        {
          id: "ci-14-1",
          menuItem: mockMenuItems[0], // Classic Coffee
          size: "12oz",
          temperature: "Hot",
          addOns: [],
          quantity: 1,
          subtotal: 65 * 1,
        },
      ],
      date: new Date("2026-03-25T16:00:00"),
      paymentMethod: "Cash",
      status: "Completed",
      cashier: mockStaff[0].name,
    },
    {
      items: [
        {
          id: "ci-15-0",
          menuItem: mockMenuItems[9], // Vanilla Cream Frappee
          size: "20oz",
          temperature: "Cold",
          addOns: [],
          quantity: 1,
          subtotal: 95 * 1.3,
        },
      ],
      date: new Date("2026-03-25T16:45:00"),
      paymentMethod: "Card",
      status: "Completed",
      cashier: mockStaff[2].name,
    },
    {
      items: [
        {
          id: "ci-16-0",
          menuItem: mockMenuItems[2], // Cappuccino
          size: "16oz",
          temperature: "Hot",
          addOns: [mockAddOns[0]], // Espresso Shot
          quantity: 1,
          subtotal: (80 * 1.2 + 20) * 1,
        },
      ],
      date: new Date("2026-03-25T17:20:00"),
      paymentMethod: "E-Wallet",
      status: "Completed",
      cashier: mockStaff[1].name,
    },
  ];

  // Add transaction IDs and calculate totals
  todayTransactions.forEach((txn, idx) => {
    txn.id = `txn-${String(idx + 1).padStart(4, "0")}`;
    txn.total = txn.items.reduce((sum, item) => sum + item.subtotal, 0);
  });

  transactions.push(...todayTransactions);

  // Add previous days transactions
  const previousDaysCount = 25;
  const previousTransactions = [
    {
      date: new Date("2026-03-24T09:30:00"),
      total: 450,
      paymentMethod: "Card",
      status: "Completed",
      cashier: mockStaff[0].name,
      items: [
        {
          menuItem: mockMenuItems[1],
          size: "16oz",
          temperature: "Hot",
          addOns: [],
          quantity: 2,
          subtotal: 70 * 1.2 * 2,
        },
      ],
    },
    {
      date: new Date("2026-03-24T11:15:00"),
      total: 380,
      paymentMethod: "Cash",
      status: "Completed",
      cashier: mockStaff[1].name,
      items: [],
    },
    {
      date: new Date("2026-03-24T13:45:00"),
      total: 520,
      paymentMethod: "E-Wallet",
      status: "Completed",
      cashier: mockStaff[2].name,
      items: [],
    },
    {
      date: new Date("2026-03-24T15:30:00"),
      total: 310,
      paymentMethod: "Card",
      status: "Completed",
      cashier: mockStaff[0].name,
      items: [],
    },
    {
      date: new Date("2026-03-23T10:00:00"),
      total: 625,
      paymentMethod: "Cash",
      status: "Completed",
      cashier: mockStaff[1].name,
      items: [],
    },
    {
      date: new Date("2026-03-23T12:30:00"),
      total: 480,
      paymentMethod: "Card",
      status: "Completed",
      cashier: mockStaff[2].name,
      items: [],
    },
    {
      date: new Date("2026-03-23T14:15:00"),
      total: 390,
      paymentMethod: "E-Wallet",
      status: "Completed",
      cashier: mockStaff[0].name,
      items: [],
    },
    {
      date: new Date("2026-03-22T09:45:00"),
      total: 550,
      paymentMethod: "Card",
      status: "Completed",
      cashier: mockStaff[1].name,
      items: [],
    },
  ];

  previousTransactions.forEach((txn, idx) => {
    txn.id = `txn-${String(todayTransactions.length + idx + 1).padStart(4, "0")}`;
  });

  transactions.push(...previousTransactions);

  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export const mockTransactions = createDefaultTransactions();
