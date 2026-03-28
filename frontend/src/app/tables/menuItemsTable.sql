-- menu_items table
CREATE TABLE menu_items (
  id VARCHAR(32) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  base_price DECIMAL(10,2) NOT NULL,
  temperature ENUM('Hot','Cold','Both','N/A') NOT NULL,
  available_sizes JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
