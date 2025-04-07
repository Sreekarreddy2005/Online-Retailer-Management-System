CREATE DATABASE online_retailer;
USE online_retailer;
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2),
    category VARCHAR(100)
);

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    product_id INT,
    quantity INT,
    order_status VARCHAR(50) DEFAULT 'Pending',
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    quantity INT,
    user_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES customers(id)
);
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Sreekar@2005';FLUSH PRIVILEGES;
SELECT * FROM cart;
-- Switch to your online_retailer database if you're not already using it
USE online_retailer;

-- Create the admins table
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO admins (name, email, password) VALUES
('Administrator', 'admin@onlineretail.com', '$2b$10$abcdefghijklmnopqrstuvwxyza0123456789abcdefghijklmn');

DESCRIBE admins;

SELECT * FROM admins;

CREATE TABLE IF NOT EXISTS retailers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    business_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
    -- Add other retailer-specific fields here if needed
);

DESCRIBE retailers;
SELECT * FROM retailers;
UPDATE admins
SET password = '$2b$10$SAkzCkK4B0vfn2EP4tQ/wuzhfXWOonXcBbs9lRv3CcRKLnnQAVDB2'
WHERE email = 'admin@onlineretail.com';

