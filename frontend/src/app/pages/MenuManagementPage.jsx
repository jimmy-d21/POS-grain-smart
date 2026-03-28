import { useState } from "react";
import { useStore } from "../lib/store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Plus, Edit, Trash2, Coffee, Search } from "lucide-react";
import { toast } from "sonner";

const categories = [
  "Regular Drinks",
  "Frappee",
  "Shimmer Juices",
  "Premium Drinks",
  "Rice Coffee Series",
];

const temperatures = ["Hot", "Cold", "Both", "N/A"];
const sizes = ["12oz", "16oz", "22oz"];

export function MenuManagementPage() {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editDialog, setEditDialog] = useState({
    open: false,
    item: null,
  });

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    basePrice: "",
    temperature: "",
    availableSizes: [],
  });

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setFormData({
      name: "",
      category: "",
      basePrice: "",
      temperature: "",
      availableSizes: [],
    });
    setEditDialog({ open: true, item: null });
  };

  const handleOpenEdit = (item) => {
    setFormData({
      name: item.name,
      category: item.category,
      basePrice: item.basePrice.toString(),
      temperature: item.temperature,
      availableSizes: [...item.availableSizes],
    });
    setEditDialog({ open: true, item: item });
  };

  const handleSave = () => {
    if (
      !formData.name ||
      !formData.basePrice ||
      formData.availableSizes.length === 0
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const price = parseFloat(formData.basePrice);
    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    if (!editDialog.item) {
      const newItem = {
        id: `m${Date.now()}`,
        name: formData.name,
        category: formData.category,
        basePrice: price,
        temperature: formData.temperature,
        availableSizes: formData.availableSizes,
      };
      addMenuItem(newItem);
      toast.success("Menu item added successfully!");
    } else {
      updateMenuItem(editDialog.item.id, {
        name: formData.name,
        category: formData.category,
        basePrice: price,
        temperature: formData.temperature,
        availableSizes: formData.availableSizes,
      });
      toast.success("Menu item updated successfully!");
    }

    setEditDialog({ open: false, item: null });
  };

  const handleDelete = (item) => {
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
      deleteMenuItem(item.id);
      toast.success("Menu item deleted");
    }
  };

  const toggleSize = (size) => {
    setFormData((prev) => ({
      ...prev,
      availableSizes: prev.availableSizes.includes(size)
        ? prev.availableSizes.filter((s) => s !== size)
        : [...prev.availableSizes, size],
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Menu Management</h1>
          <p className="text-muted-foreground">
            Add, edit, and manage menu items
          </p>
        </div>
        <Button onClick={handleOpenAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Menu Item
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Card key={cat}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {cat}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {menuItems.filter((item) => item.category === cat).length}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === "All" ? "default" : "outline"}
                onClick={() => setSelectedCategory("All")}
                size="sm"
              >
                All
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat)}
                  size="sm"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">{item.category}</Badge>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenEdit(item)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item)}
                    className="text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <h3 className="font-semibold mb-2 line-clamp-2">{item.name}</h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Base Price
                  </span>
                  <span className="font-semibold text-primary">
                    ₱{item.basePrice}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Category
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Temperature
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {item.temperature}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Sizes</span>
                  <div className="flex gap-1">
                    {item.availableSizes.map((size) => (
                      <Badge key={size} variant="outline" className="text-xs">
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No menu items found
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Dialog */}
      <Dialog
        open={editDialog.open}
        onOpenChange={(open) =>
          setEditDialog({
            open,
            item: editDialog.item,
          })
        }
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editDialog.item === null ? "Add Menu Item" : "Edit Menu Item"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="e.g., Classic Coffee"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: value,
                  }))
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price">Base Price (₱) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.basePrice}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    basePrice: e.target.value,
                  }))
                }
                placeholder="0.00"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="temperature">Temperature *</Label>
              <Select
                value={formData.temperature}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: value,
                  }))
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {temperatures.map((temp) => (
                    <SelectItem key={temp} value={temp}>
                      {temp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Available Sizes *</Label>
              <div className="flex gap-4 mt-2">
                {sizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={size}
                      checked={formData.availableSizes.includes(size)}
                      onCheckedChange={() => toggleSize(size)}
                    />
                    <label htmlFor={size} className="text-sm cursor-pointer">
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setEditDialog({
                  open: false,
                  item: null,
                })
              }
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editDialog.item === null ? "Add Item" : "Update Item"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
