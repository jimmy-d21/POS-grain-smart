export const categories = [
  "All",
  "Regular Drinks",
  "Frappee",
  "Shimmer Juices",
  "Premium Drinks",
  "Rice Coffee Series",
];

export const paymentMethods = ["Cash", "Card", "E-Wallet"];

export const cashierDefaultData = {
  currentUser: {
    id: "st2",
    name: "Juan Dela Cruz",
    role: "Cashier",
    email: "juan.delacruz@grainsmart.com",
  },
  cart: [],
  availableAddOns: [
    { id: "a1", name: "Black Pearl", price: 15 },
    { id: "a2", name: "Mix Fruit Jelly", price: 15 },
    { id: "a3", name: "Cream Cheese", price: 20 },
  ],
};
