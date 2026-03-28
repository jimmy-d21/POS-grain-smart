-- transactions table
CREATE TABLE transactions (
  id VARCHAR(32) PRIMARY KEY,
  cashier VARCHAR(255) NOT NULL,
  payment_method ENUM('Cash','Card','E-Wallet') NOT NULL,
  total DECIMAL(12,2) NOT NULL,
  date TIMESTAMP NOT NULL,
  status ENUM('Completed','Refunded','Pending') NOT NULL DEFAULT 'Completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (cashier) REFERENCES staff(email) -- or staff.id if you prefer
);

-- transaction_items link table
CREATE TABLE transaction_items (
  id VARCHAR(32) PRIMARY KEY,
  transaction_id VARCHAR(32) NOT NULL,
  menu_item_id VARCHAR(32) NOT NULL,
  size VARCHAR(10) NOT NULL,
  temperature ENUM('Hot','Cold') NOT NULL,
  quantity INT NOT NULL,
  subtotal DECIMAL(12,2) NOT NULL,
  FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE RESTRICT
);

-- transaction_item_add_ons link table (optional)
CREATE TABLE transaction_item_add_ons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  transaction_item_id VARCHAR(32) NOT NULL,
  add_on_id VARCHAR(32) NOT NULL,
  FOREIGN KEY (transaction_item_id) REFERENCES transaction_items(id) ON DELETE CASCADE,
  FOREIGN KEY (add_on_id) REFERENCES add_ons(id) ON DELETE RESTRICT
);
