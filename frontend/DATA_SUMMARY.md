# Grainsmart Coffee POS - Data Summary

## Data Location
All system data is now centralized in: `/src/app/lib/data.js`

## Complete Data Inventory

### 1. MENU ITEMS (27 Total Items)
Located in: `mockMenuItems` array

#### Regular Drinks (8 items)
- Classic Coffee - ₱65 (12oz/16oz/22oz, Hot/Cold)
- Americano - ₱70 (12oz/16oz/22oz, Hot/Cold)
- Cappuccino - ₱80 (12oz/16oz/22oz, Hot/Cold)
- Orange Juice - ₱75 (12oz/16oz/22oz, Cold)
- Mango Juice - ₱75 (12oz/16oz/22oz, Cold)
- Classic Milk Tea - ₱70 (12oz/16oz/22oz, Hot/Cold)
- Taro Milk Tea - ₱75 (12oz/16oz/22oz, Hot/Cold)
- Wintermelon Milk Tea - ₱75 (12oz/16oz/22oz, Hot/Cold)

#### Frappee (6 items - Cream-Based & Coffee-Based)
- Vanilla Cream Frappee - ₱95 (16oz/22oz, Cold)
- Chocolate Cream Frappee - ₱95 (16oz/22oz, Cold)
- Strawberry Cream Frappee - ₱95 (16oz/22oz, Cold)
- Mocha Coffee Frappee - ₱100 (16oz/22oz, Cold)
- Caramel Coffee Frappee - ₱100 (16oz/22oz, Cold)
- Java Chip Frappee - ₱105 (16oz/22oz, Cold)

#### Shimmer Juices (4 items - 16oz only)
- Strawberry Cherry Shimmer - ₱85 (16oz, Cold)
- Lemon Cucumber Shimmer - ₱85 (16oz, Cold)
- Blue Lemonade Shimmer - ₱85 (16oz, Cold)
- Passion Fruit Shimmer - ₱85 (16oz, Cold)

#### Premium Drinks (4 items - Sweetened by Stevia, 16oz only)
- Barley Matcha - ₱110 (16oz, Hot/Cold)
- Vita Milk Tea - ₱110 (16oz, Hot/Cold)
- Premium Green Tea Latte - ₱115 (16oz, Hot/Cold)
- Hokkaido Milk Tea - ₱120 (16oz, Hot/Cold)

#### Rice Coffee Series (5 items - Hot/Cold)
- Café Filipino - ₱90 (12oz/16oz/22oz, Hot/Cold)
- Barley Latte - ₱95 (12oz/16oz/22oz, Hot/Cold)
- Rice Coffee Mocha - ₱95 (12oz/16oz/22oz, Hot/Cold)

### 2. ADD-ONS (8 items)
Located in: `mockAddOns` array

- Black Pearl - ₱15
- Mix Fruit Jelly - ₱15
- Cream Cheese - ₱20
- Coffee Jelly - ₱15
- Nata de Coco - ₱15
- Popping Boba - ₱20
- Extra Shot Espresso - ₱25
- Oat Milk - ₱20

### 3. INVENTORY ITEMS (17 items with low-stock alerts)
Located in: `mockInventory` array

#### Cups & Lids (3 items)
- 12oz Cups - 850 pcs (reorder at 500 pcs)
- 16oz Cups - 1,200 pcs (reorder at 800 pcs)
- 22oz Cups - 450 pcs ⚠️ LOW STOCK (reorder at 600 pcs)

#### Coffee (3 items)
- Coffee Beans (Arabica) - 15 kg (reorder at 10 kg)
- Coffee Beans (Robusta) - 8 kg ⚠️ LOW STOCK (reorder at 10 kg)
- Rice Coffee Blend - 4 kg ⚠️ LOW STOCK (reorder at 8 kg)

#### Dairy (2 items)
- Milk (Fresh) - 25 L (reorder at 20 L)
- Oat Milk - 12 L ⚠️ LOW STOCK (reorder at 15 L)

#### Toppings (3 items)
- Black Pearl (Tapioca) - 5 kg ⚠️ LOW STOCK (reorder at 8 kg)
- Fruit Jelly Mix - 18 kg (reorder at 10 kg)
- Cream Cheese - 7 kg (reorder at 5 kg)

#### Syrups (3 items)
- Vanilla Syrup - 10 L (reorder at 8 L)
- Chocolate Syrup - 9 L (reorder at 8 L)
- Caramel Syrup - 11 L (reorder at 8 L)

#### Powders (2 items)
- Matcha Powder - 3 kg ⚠️ LOW STOCK (reorder at 5 kg)
- Taro Powder - 6 kg (reorder at 5 kg)

#### Grains (1 item)
- Barley - 12 kg (reorder at 10 kg)

**Total Low Stock Items: 6 items**

### 4. STAFF MEMBERS (4 members)
Located in: `mockStaff` array

- Maria Santos - Admin (Active) - maria.santos@grainsmart.com
- Juan Dela Cruz - Cashier (Active) - juan.delacruz@grainsmart.com
- Ana Reyes - Cashier (Active) - ana.reyes@grainsmart.com
- Pedro Garcia - Cashier (Inactive) - pedro.garcia@grainsmart.com

### 5. DEMO PASSWORDS
Located in: `demoPasswords` object

- maria.santos@grainsmart.com: "admin123"
- juan.delacruz@grainsmart.com: "cashier123"
- ana.reyes@grainsmart.com: "cashier123"
- pedro.garcia@grainsmart.com: "cashier123"

### 6. TRANSACTIONS (50 mock transactions)
Located in: `mockTransactions` array
- Generated programmatically for the last 7 days
- Random items, sizes, temperatures, and add-ons
- Payment methods: Cash, Card, E-Wallet
- Status: Mostly "Completed" with some "Refunded"
- Time range: 8 AM to 9 PM

## Size Multipliers
- 12oz: 1.0x base price
- 16oz: 1.2x base price
- 22oz: 1.4x base price

## Brand Colors
- Primary (Forest Green): #2d5f3f
- Secondary (Earthy Coffee Brown): #8b6f47
- Accent: #4a7c59
- Additional: #d4a574, #1f4529

## File Structure
```
/src/app/lib/
  ├── data.js          # All mock data centralized here
  └── store.jsx        # State management (imports from data.js)

/src/app/pages/
  ├── LoginPage.jsx
  ├── CashierPage.jsx
  ├── DashboardPage.jsx
  ├── InventoryPage.jsx
  ├── MenuManagementPage.jsx
  ├── TransactionHistoryPage.jsx
  └── StaffManagementPage.jsx

/src/app/components/
  └── RootLayout.jsx

/src/app/
  ├── App.tsx          # Entry point (references .jsx files)
  └── routes.jsx
```

## Notes
- All TypeScript files (.tsx) have been converted to JSX (.jsx) except:
  - App.tsx (protected entry point file)
  - UI components in /components/ui/ (library components)
  - ImageWithFallback.tsx (protected Figma component)
  
- All page and component files now use .jsx extension
- Type annotations removed for JavaScript compatibility
- All imports updated to reference .jsx files
