const db = require('./utils/db');
const now = Date.now();

// Plans (basic fields)
db.run("INSERT OR IGNORE INTO plans (name, speed, duration, price, createdAt) VALUES (?, ?, ?, ?, ?)",
  ['1GB Plan', '5Mbps', 30, 100, now]);
db.run("INSERT OR IGNORE INTO plans (name, speed, duration, price, createdAt) VALUES (?, ?, ?, ?, ?)",
  ['5GB Plan', '10Mbps', 60, 250, now]);
db.run("INSERT OR IGNORE INTO plans (name, speed, duration, price, createdAt) VALUES (?, ?, ?, ?, ?)",
  ['Unlimited', '20Mbps', 120, 500, now]);

// Users
db.run("INSERT OR IGNORE INTO users (username, email, password, role, balance, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
  ['john_doe', 'john@ex.com', 'pass', 'user', 1500, now]);
db.run("INSERT OR IGNORE INTO users (username, email, password, role, balance, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
  ['jane_smith', 'jane@ex.com', 'pass', 'user', 2000, now]);
db.run("INSERT OR IGNORE INTO users (username, email, password, role, balance, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
  ['testuser', 'test@ex.com', 'pass', 'user', 500, now]);

// Routers (match actual schema: name, host, plan, status)
db.run("INSERT OR IGNORE INTO routers (name, host, plan, status) VALUES (?, ?, ?, ?)",
  ['Main Router', '192.168.1.1', 'premium', 'online']);
db.run("INSERT OR IGNORE INTO routers (name, host, plan, status) VALUES (?, ?, ?, ?)",
  ['Branch Router', '192.168.2.1', 'standard', 'online']);
db.run("INSERT OR IGNORE INTO routers (name, host, plan, status) VALUES (?, ?, ?, ?)",
  ['Backup Router', '192.168.3.1', 'basic', 'offline']);

// IoT Devices
db.run("INSERT OR IGNORE INTO iot_devices (device_id, name, type, plan, status, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
  ['IOT001', 'Smart TV', 'smart-tv', 'premium', 'active', now]);
db.run("INSERT OR IGNORE INTO iot_devices (device_id, name, type, plan, status, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
  ['IOT002', 'WiFi Repeater', 'iot', 'standard', 'active', now]);
db.run("INSERT OR IGNORE INTO iot_devices (device_id, name, type, plan, status, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
  ['IOT003', 'Camera', 'iot', 'basic', 'inactive', now]);

// Vouchers
db.run("INSERT OR IGNORE INTO vouchers (code, plan_id, used, expiry, createdAt) VALUES (?, ?, ?, ?, ?)",
  ['VOC001', 1, 0, now + 86400000, now]);
db.run("INSERT OR IGNORE INTO vouchers (code, plan_id, used, expiry, createdAt) VALUES (?, ?, ?, ?, ?)",
  ['VOC002', 1, 0, now + 86400000, now]);
db.run("INSERT OR IGNORE INTO vouchers (code, plan_id, used, expiry, createdAt) VALUES (?, ?, ?, ?, ?)",
  ['VOC003', 2, 1, now + 86400000, now]);
db.run("INSERT OR IGNORE INTO vouchers (code, plan_id, used, expiry, createdAt) VALUES (?, ?, ?, ?, ?)",
  ['VOC004', 2, 0, now + 172800000, now]);
db.run("INSERT OR IGNORE INTO vouchers (code, plan_id, used, expiry, createdAt) VALUES (?, ?, ?, ?, ?)",
  ['VOC005', 3, 0, now + 172800000, now]);

// Transactions
db.run("INSERT OR IGNORE INTO transactions (user_id, plan_id, amount, type, status, payment_method, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
  [1, 1, 100, 'purchase', 'completed', 'mpesa', now]);
db.run("INSERT OR IGNORE INTO transactions (user_id, plan_id, amount, type, status, payment_method, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
  [1, 2, 250, 'purchase', 'completed', 'mpesa', now - 86400000]);
db.run("INSERT OR IGNORE INTO transactions (user_id, plan_id, amount, type, status, payment_method, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
  [2, 1, 100, 'purchase', 'completed', 'card', now - 172800000]);
db.run("INSERT OR IGNORE INTO transactions (user_id, plan_id, amount, type, status, payment_method, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
  [2, 3, 500, 'purchase', 'completed', 'mpesa', now - 259200000]);
db.run("INSERT OR IGNORE INTO transactions (user_id, plan_id, amount, type, status, payment_method, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
  [3, 1, 100, 'purchase', 'completed', 'mpesa', now - 345600000]);

setTimeout(() => { console.log('✅ Complete'); process.exit(0); }, 1000);
