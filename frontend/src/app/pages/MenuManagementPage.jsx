import { useState } from "react";
import { useMenuManagement } from "../context/MenuManagementContext.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Badge } from "../components/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select";
import { Checkbox } from "../components/checkbox";
import { Plus, Edit, Trash2, Coffee, Search } from "lucide-react";
import { categories, temperatures, sizes } from "../data/MenuManagementData";
import { toast } from "sonner";

export function MenuManagementPage() {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } =
    useMenuManagement();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editDialog, setEditDialog] = useState({
    open: false,
    item: null,
    mode: "add",
  });

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "Regular Drinks",
    basePrice: "",
    temperature: "Cold",
    availableSizes: ["16oz"],
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
      category: "Regular Drinks",
      basePrice: "",
      temperature: "Cold",
      availableSizes: ["16oz"],
    });
    setEditDialog({ open: true, item: null, mode: "add" });
  };

  const handleOpenEdit = (item) => {
    setFormData({
      name: item.name,
      category: item.category,
      basePrice: item.basePrice.toString(),
      temperature: item.temperature,
      availableSizes: item.availableSizes,
    });
    setEditDialog({ open: true, item, mode: "edit" });
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

    if (editDialog.mode === "add") {
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
    } else if (editDialog.item) {
      updateMenuItem(editDialog.item.id, {
        name: formData.name,
        category: formData.category,
        basePrice: price,
        temperature: formData.temperature,
        availableSizes: formData.availableSizes,
      });
      toast.success("Menu item updated successfully!");
    }

    setEditDialog({ open: false, item: null, mode: "add" });
  };

  const handleDelete = (item) => {
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
      deleteMenuItem(item.id);
      toast.success("Menu item deleted");
    }
  };

  const toggleSize = (size) => {
    setFormData((prev) => {
      const sizes = prev.availableSizes.includes(size)
        ? prev.availableSizes.filter((s) => s !== size)
        : [...prev.availableSizes, size];
      return { ...prev, availableSizes: sizes };
    });
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{menuItems.length}</div>
          </CardContent>
        </Card>
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
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === "All" ? "default" : "outline"}
                className="border-border"
                onClick={() => setSelectedCategory("All")}
                size="sm"
              >
                All
              </Button>
              {categories.map((cat) => (
                <Button
                  className="border-border"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Coffee className="w-8 h-8 text-primary" />
                </div>
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
            item: open ? editDialog.item : null,
            mode: editDialog.mode,
          })
        }
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editDialog.mode === "add" ? "Add Menu Item" : "Edit Menu Item"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Item Name *</Label>
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
                    temperature: value,
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
                  mode: "add",
                })
              }
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editDialog.mode === "add" ? "Add Item" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
