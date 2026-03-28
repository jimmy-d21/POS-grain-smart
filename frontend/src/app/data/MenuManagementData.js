export const categories = [
  "All",
  "Regular Drinks",
  "Frappee",
  "Shimmer Juices",
  "Premium Drinks",
  "Rice Coffee Series",
];

export const temperatures = ["Hot", "Cold", "Both", "N/A"];
export const sizes = ["12oz", "16oz", "22oz"];

export const menuManagementDefaultData = {
  totalItems: 27,
  categories: {
    "Regular Drinks": 8,
    Frappee: 6,
    "Shimmer Juices": 4,
    "Premium Drinks": 4,
    "Rice Coffee Series": 5,
  },
  recentItems: [
    {
      id: "r2",
      name: "Barley Latte",
      category: "Rice Coffee Series",
      basePrice: 95,
      temperature: "Both",
      availableSizes: ["12oz", "16oz", "22oz"],
    },
    {
      id: "p4",
      name: "Hokkaido Milk Tea",
      category: "Premium Drinks",
      basePrice: 120,
      temperature: "Both",
      availableSizes: ["16oz"],
    },
    {
      id: "f6",
      name: "Java Chip Frappee",
      category: "Frappee",
      basePrice: 105,
      temperature: "Cold",
      availableSizes: ["16oz", "22oz"],
    },
  ],
};
