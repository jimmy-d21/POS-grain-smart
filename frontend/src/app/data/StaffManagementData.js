export const staffRoles = ["All", "Manager", "Cashier"];
export const staffStatus = ["Active", "Inactive"];

export const staffManagementDefaultData = {
  total: 4,
  active: 3,
  manager: 1,
  cashier: 3,
  members: [
    {
      id: "st1",
      name: "Maria Santos",
      email: "maria.santos@grainsmart.com",
      role: "Manager",
      status: "Active",
    },
    {
      id: "st2",
      name: "Juan Dela Cruz",
      email: "juan.delacruz@grainsmart.com",
      role: "Cashier",
      status: "Active",
    },
    {
      id: "st3",
      name: "Ana Reyes",
      email: "ana.reyes@grainsmart.com",
      role: "Cashier",
      status: "Active",
    },
    {
      id: "st4",
      name: "Pedro Garcia",
      email: "pedro.garcia@grainsmart.com",
      role: "Cashier",
      status: "Inactive",
    },
  ],
};
