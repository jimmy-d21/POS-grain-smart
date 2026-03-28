export const getStatusBadge = (status) => {
  switch (status) {
    case "Completed":
      return "default";
    case "Refunded":
      return "destructive";
    case "Pending":
      return "secondary";
    default:
      return "outline";
  }
};
