import { useState } from "react";
import { useCashier } from "../context/CashierContext.jsx";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { Badge } from "../components/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/dialog";
import { ScrollArea } from "../components/scroll-area";
import { Separator } from "../components/separator";
import { categories, paymentMethods } from "../data/CashierData";
import { Plus, Minus, Trash2, Coffee, Thermometer, X } from "lucide-react";
import { toast } from "sonner";

export function CashierPage() {
  const {
    menuItems,
    cart,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    addTransaction,
    addOns,
    currentUser,
  } = useCashier();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [customizeDialog, setCustomizeDialog] = useState({
    open: false,
    item: null,
  });
  const [selectedSize, setSelectedSize] = useState("16oz");
  const [selectedTemp, setSelectedTemp] = useState("Cold");
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [checkoutDialog, setCheckoutDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const handleItemClick = (item) => {
    setCustomizeDialog({ open: true, item });
    setSelectedSize(item.availableSizes[0]);
    setSelectedTemp(item.temperature === "Hot" ? "Hot" : "Cold");
    setSelectedAddOns([]);
  };

  const handleAddToCart = () => {
    if (!customizeDialog.item) return;

    const item = customizeDialog.item;
    const sizeMultiplier =
      selectedSize === "12oz" ? 1 : selectedSize === "16oz" ? 1.2 : 1.4;
    const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
    const subtotal = item.basePrice * sizeMultiplier + addOnsTotal;

    const cartItem = {
      id: `cart-${Date.now()}-${Math.random()}`,
      menuItem: item,
      size: selectedSize,
      temperature: selectedTemp,
      addOns: selectedAddOns,
      quantity: 1,
      subtotal,
    };

    addToCart(cartItem);
    setCustomizeDialog({ open: false, item: null });
    toast.success(`${item.name} added to cart`);
  };

  const handleQuantityChange = (id, delta) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    const unitPrice = item.subtotal / item.quantity;
    updateCartItem(id, {
      quantity: newQuantity,
      subtotal: unitPrice * newQuantity,
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    setCheckoutDialog(true);
  };

  const handleCompletePayment = () => {
    const total = cart.reduce((sum, item) => sum + item.subtotal, 0);

    const transaction = {
      id: `txn-${Date.now()}`,
      items: [...cart],
      total,
      date: new Date(),
      paymentMethod,
      status: "Completed",
      cashier: currentUser?.name || "Unknown",
    };

    addTransaction(transaction);
    clearCart();
    setCheckoutDialog(false);
    toast.success("Order completed successfully!");
  };

  const toggleAddOn = (addOn) => {
    setSelectedAddOns((prev) => {
      const exists = prev.find((a) => a.id === addOn.id);
      if (exists) {
        return prev.filter((a) => a.id !== addOn.id);
      }
      return [...prev, addOn];
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div className="h-full flex">
      {/* Left: Product Grid */}
      <div className="flex-1 flex flex-col bg-background">
        {/* Header */}
        <div className="p-6 border-b border-border bg-card">
          <h2 className="text-2xl font-semibold mb-4">Point of Sale</h2>

          {/* Category Filters */}
          <div className="flex gap-2 flex-wrap">
            <Button
              className="border-border"
              variant={selectedCategory === "All" ? "default" : "outline"}
              onClick={() => setSelectedCategory("All")}
              size="sm"
            >
              All Items
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

        {/* Products Grid */}
        <ScrollArea className="flex-1 p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="p-4 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary"
                onClick={() => handleItemClick(item)}
              >
                <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                  <Coffee className="w-12 h-12 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-semibold">
                    ₱{item.basePrice}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {item.availableSizes[0]}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right: Cart */}
      <div className="w-96 bg-card border-l border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold">Current Order</h3>
            {cart.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearCart}>
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{cart.length} item(s)</p>
        </div>

        <ScrollArea className="flex-1 p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Coffee className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-sm">No items in cart</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">
                        {item.menuItem.name}
                      </h4>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {item.size}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {item.temperature}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {item.addOns.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs text-muted-foreground">
                        Add-ons: {item.addOns.map((a) => a.name).join(", ")}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <span className="font-semibold text-primary">
                      ₱{item.subtotal.toFixed(2)}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Cart Summary */}
        <div className="p-6 border-t border-border bg-muted/50">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">₱{cartTotal.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-bold text-primary">
                ₱{cartTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Checkout
          </Button>
        </div>
      </div>

      {/* Customize Dialog */}
      <Dialog
        open={customizeDialog.open}
        onOpenChange={(open) =>
          setCustomizeDialog({ open, item: open ? customizeDialog.item : null })
        }
      >
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{customizeDialog.item?.name}</DialogTitle>
          </DialogHeader>

          {customizeDialog.item && (
            <div className="space-y-4">
              {/* Size Selection */}
              <div>
                <label className="text-sm font-semibold mb-2 block">Size</label>
                <div className="flex gap-2">
                  {customizeDialog.item.availableSizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      className="flex-1 border-border"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Temperature Selection */}
              {customizeDialog.item.temperature === "Both" && (
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Temperature
                  </label>
                  <div className="flex gap-2">
                    <Button
                      variant={selectedTemp === "Hot" ? "default" : "outline"}
                      onClick={() => setSelectedTemp("Hot")}
                      className="flex-1 border-border"
                    >
                      <Thermometer className="w-4 h-4 mr-2" />
                      Hot
                    </Button>
                    <Button
                      variant={selectedTemp === "Cold" ? "default" : "outline"}
                      onClick={() => setSelectedTemp("Cold")}
                      className="flex-1 border-border"
                    >
                      <Coffee className="w-4 h-4 mr-2" />
                      Cold
                    </Button>
                  </div>
                </div>
              )}

              {/* Add-ons */}
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Add-ons (Optional)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {addOns.map((addOn) => {
                    const isSelected = selectedAddOns.find(
                      (a) => a.id === addOn.id,
                    );
                    return (
                      <Button
                        key={addOn.id}
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => toggleAddOn(addOn)}
                        className="justify-start text-xs h-auto py-2 px-3 border-border"
                      >
                        <div className="text-left">
                          <div className="font-semibold">{addOn.name}</div>
                          <div className="text-xs opacity-80">
                            +₱{addOn.price}
                          </div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Price Preview */}
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Price</span>
                  <span className="text-xl font-bold text-primary">
                    ₱
                    {(
                      customizeDialog.item.basePrice *
                        (selectedSize === "12oz"
                          ? 1
                          : selectedSize === "16oz"
                            ? 1.2
                            : 1.4) +
                      selectedAddOns.reduce((sum, a) => sum + a.price, 0)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCustomizeDialog({ open: false, item: null })}
            >
              Cancel
            </Button>
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Checkout Dialog */}
      <Dialog open={checkoutDialog} onOpenChange={setCheckoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Amount</span>
                <span className="text-2xl text-primary">
                  ₱{cartTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {paymentMethods.map((method) => (
                  <Button
                    className="border-border"
                    key={method}
                    variant={paymentMethod === method ? "default" : "outline"}
                    onClick={() => setPaymentMethod(method)}
                  >
                    {method}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              className="border-border"
              variant="outline"
              onClick={() => setCheckoutDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCompletePayment}>Complete Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
