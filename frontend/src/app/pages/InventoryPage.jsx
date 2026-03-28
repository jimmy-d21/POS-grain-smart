import { useState } from "react";
import { useStore } from "../lib/store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Search, Package, AlertTriangle, Plus } from "lucide-react";
import { toast } from "sonner";

export function InventoryPage() {
  const { inventory, updateInventory } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [restockDialog, setRestockDialog] = useState({
    open: false,
    item: null,
  });
  const [restockAmount, setRestockAmount] = useState("");

  // Get unique categories
  const categories = [
    "All",
    ...Array.from(new Set(inventory.map((item) => item.category))),
  ];

  // Filter inventory
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Count low stock items
  const lowStockCount = inventory.filter(
    (item) => item.currentStock <= item.reorderLevel,
  ).length;

  const handleRestock = () => {
    if (!restockDialog.item || !restockAmount) return;

    const amount = parseFloat(restockAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    updateInventory(restockDialog.item.id, {
      currentStock: restockDialog.item.currentStock + amount,
    });

    toast.success(`${restockDialog.item.name} restocked successfully!`);
    setRestockDialog({ open: false, item: null });
    setRestockAmount("");
  };

  const getStockStatus = (item) => {
    const percentage = (item.currentStock / item.reorderLevel) * 100;
    if (percentage <= 25) return { label: "Critical", color: "bg-red-500" };
    if (percentage <= 50) return { label: "Low", color: "bg-yellow-500" };
    if (percentage <= 100) return { label: "Normal", color: "bg-green-500" };
    return { label: "Surplus", color: "bg-blue-500" };
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Inventory Management</h1>
          <p className="text-muted-foreground">
            Track and manage raw materials and supplies
          </p>
        </div>
        <div className="space-y-1 text-right">
          <p className="text-sm">
            Low-stock items: <span className="font-bold">{lowStockCount}</span>
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Reorder Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Restocked</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No inventory items found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInventory.map((item) => {
                    const stockStatus = getStockStatus(item);
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          {item.currentStock} {item.unit}
                        </TableCell>
                        <TableCell>
                          {item.reorderLevel} {item.unit}
                        </TableCell>
                        <TableCell>
                          <Badge className={stockStatus.color}>
                            {stockStatus.label}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(item.lastRestocked)}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setRestockDialog({ open: true, item })
                            }
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Restock
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Restock Dialog */}
      <Dialog
        open={restockDialog.open}
        onOpenChange={(open) => setRestockDialog((prev) => ({ ...prev, open }))}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restock Item</DialogTitle>
          </DialogHeader>

          {restockDialog.item && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Item Name</p>
                <p className="font-semibold">{restockDialog.item.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current Stock</p>
                  <p className="font-semibold">
                    {restockDialog.item.currentStock} {restockDialog.item.unit}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reorder Level</p>
                  <p className="font-semibold">
                    {restockDialog.item.reorderLevel} {restockDialog.item.unit}
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="restock-amount">
                  Restock Amount ({restockDialog.item.unit})
                </Label>
                <Input
                  id="restock-amount"
                  type="number"
                  placeholder="Enter amount to add"
                  value={restockAmount}
                  onChange={(e) => setRestockAmount(e.target.value)}
                  className="mt-2"
                />
              </div>

              {restockAmount && !isNaN(parseFloat(restockAmount)) && (
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    New Stock Level
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {restockDialog.item.currentStock +
                      parseFloat(restockAmount)}{" "}
                    {restockDialog.item.unit}
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setRestockDialog({ open: false, item: null });
                setRestockAmount("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleRestock}>Confirm Restock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
