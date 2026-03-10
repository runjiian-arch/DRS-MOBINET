const db = require('./utils/db');
const now = Date.now();

// Plans with data
db.run("DELETE FROM plans");
db.run("INSERT INTO plans (name, speed, duration, price, createdAt) VALUES (?, ?, ?, ?, ?)",
  ['1GB Plan', '5Mbps', 30, 100, now]);
db.run("INSERT INTO plans (name, speed, duration, price, createdAt) VALUES (?, ?, ?, ?, ?)",
  ['5GB Plan', '10Mbps', 60, 250, now]);
db.run("INSERT INTO plans (name, speed, duration, price, createdAt) VALUES (?, ?, ?, ?, ?)",
  ['Unlimited', '20Mbps', 120, 500, now]);

// Clear & insert routers
db.run("DELETE FROM routers");
db.run("INSERT INTO routers (name, host, plan, status) VALUES (?, ?, ?, ?)", ['Main Router', '192.168.1.1', 'premium', 'online']);
db.run("INSERT INTO routers (name, host, plan, status) VALUES (?, ?, ?, ?)", ['Branch', '192.168.2.1', 'standard', 'online']);
db.run("INSERT INTO routers (name, host, plan, status) VALUES (?, ?, ?, ?)", ['Backup', '192.168.3.1', 'basic', 'offline']);

// IoT devices (without createdAt)
db.run("DELETE FROM iot_devices");
db.run("INSERT INTO iot_devices (device_id, name, type, plan, status) VALUES (?, ?, ?, ?, ?)",
  ['IOT001', 'Smart TV Estate', 'smart-tv', 'premium', 'active']);
db.run("INSERT INTO iot_devices (device_id, name, type, plan, status) VALUES (?, ?, ?, ?, ?)",
  ['IOT002', 'WiFi Repeater', 'iot', 'standard', 'active']);
db.run("INSERT INTO iot_devices (device_id, name, type, plan, status) VALUES (?, ?, ?, ?, ?)",
  ['IOT003', 'Camera Gate', 'iot', 'basic', 'inactive']);

// Vouchers
db.run("DELETE FROM vouchers");
db.run("INSERT INTO vouchers (code, plan_id, used, expiry, createdAt) VALUES (?, ?, ?, ?, ?)",
  ['VOC-2024-001', 1, 0, now + 86400000, now]);
db.run("INSERT INTO vouchers (code, plan_id, used, expiry, createdAt) VALUES (?, ?, ?, ?, ?)",
  ['VOC-2024-002', 1, 0, now + 86400000, now]);
db.run("INSERT INTO vouchers (code, plan_id, used, expiry, createdAt) VALUES (?, ?, ?, ?, ?)",
  ['VOC-2024-003', 2, 1, now + 86400000, now]);
db.run("INSERT INTO vouchers (code, plan_id, used, expiry, createdAt) VALUES (?, ?, ?, ?, ?)",
  ['VOC-2024-004', 2, 0, now + 172800000, now]);
db.run("INSERT INTO vouchers (code, plan_id, used, expiry, createdAt) VALUES (?, ?, ?, ?, ?)",
  ['VOC-2024-005', 3, 0, now + 172800000, now]);

// Transactions
db.run("DELETE FROM transactions");
[
  [1, 1, 100, 'purchase', 'completed', 'mpesa', now],
  [1, 2, 250, 'purchase', 'completed', 'mpesa', now - 86400000],
  [2, 1, 100, 'purchase', 'completed', 'card', now - 172800000],
  [2, 3, 500, 'purchase', 'completed', 'mpesa', now - 259200000],
  [3, 1, 100, 'purchase', 'completed', 'mpesa', now - 345600000]
].forEach(args => {
  db.run("INSERT INTO transactions (user_id, plan_id, amount, type, status, payment_method, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)", args);
});

setTimeout(() => {
  console.log('✅ Complete - System Ready');
  process.exit(0);
}, 1000);
