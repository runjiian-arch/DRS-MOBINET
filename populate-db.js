const db = require('./utils/db');
const now = Date.now();

console.log("🌱 Populating database with complete test data...");

// Wait for DB to initialize
setTimeout(() => {
  // Clear tables
  const tables = ['plans', 'users', 'vouchers', 'routers', 'iot_devices', 'transactions', 'sessions'];
  tables.forEach(t => {
    db.run(`DELETE FROM ${t}`, [], (e) => {});
  });

  setTimeout(() => {
    // 1. Plans
    db.run("INSERT INTO plans (name, speed, duration, price, createdAt) VALUES (?, ?, ?, ?, ?)",
      ['1GB Daily', '5Mbps', 30, 99, now], (e) => {});
    db.run("INSERT INTO plans (name, speed, duration, price, createdAt) VALUES (?, ?, ?, ?, ?)",
      ['5GB Weekly', '10Mbps', 60, 249, now], (e) => {});
    db.run("INSERT INTO plans (name, speed, duration, price, createdAt) VALUES (?, ?, ?, ?, ?)",
      ['20GB Monthly', '20Mbps', 120, 499, now], (e) => {});
    db.run("INSERT INTO plans (name, speed, duration, price, createdAt) VALUES (?, ?, ?, ?, ?)",
      ['Unlimited', '50Mbps', 365, 999, now], (e) => {});

    // 2. Users
    db.run("INSERT INTO users (username, email, password, role, balance, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
      ['john_doe', 'john@example.com', 'pass123', 'user', 1500, now], (e) => {});
    db.run("INSERT INTO users (username, email, password, role, balance, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
      ['jane_smith', 'jane@example.com', 'pass456', 'user', 2500, now], (e) => {});
    db.run("INSERT INTO users (username, email, password, role, balance, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
      ['mike_operator', 'mike@example.com', 'pass789', 'admin', 5000, now], (e) => {});
    db.run("INSERT INTO users (username, email, password, role, balance, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
      ['sarah_reseller', 'sarah@example.com', 'pass999', 'reseller', 3000, now], (e) => {});

    // 3. Routers (schema: name, host, plan, status)
    db.run("INSERT INTO routers (name, host, plan, status) VALUES (?, ?, ?, ?)",
      ['Main Router', '192.168.1.1', 'premium', 'online'], (e) => {});
    db.run("INSERT INTO routers (name, host, plan, status) VALUES (?, ?, ?, ?)",
      ['Branch Office', '192.168.2.1', 'standard', 'online'], (e) => {});
    db.run("INSERT INTO routers (name, host, plan, status) VALUES (?, ?, ?, ?)",
      ['Backup Unit', '192.168.3.1', 'basic', 'offline'], (e) => {});

    // 4. IoT Devices (schema: device_id, name, type, plan, status, createdAt)
    db.run("INSERT INTO iot_devices (device_id, name, type, plan, status, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
      ['IOT001', 'Smart TV Estate', 'smart-tv', 'premium', 'active', now], (e) => {});
    db.run("INSERT INTO iot_devices (device_id, name, type, plan, status, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
      ['IOT002', 'WiFi Repeater', 'iot', 'standard', 'active', now], (e) => {});
    db.run("INSERT INTO iot_devices (device_id, name, type, plan, status, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
      ['IOT003', 'Security Camera', 'iot', 'basic', 'inactive', now], (e) => {});

    // 5. Vouchers (schema: code, plan, used)
    db.run("INSERT INTO vouchers (code, plan, used) VALUES (?, ?, ?)",
      ['VOC-2024-001', 'basic', 0], (e) => {});
    db.run("INSERT INTO vouchers (code, plan, used) VALUES (?, ?, ?)",
      ['VOC-2024-002', 'standard', 0], (e) => {});
    db.run("INSERT INTO vouchers (code, plan, used) VALUES (?, ?, ?)",
      ['VOC-2024-003', 'premium', 0], (e) => {});
    db.run("INSERT INTO vouchers (code, plan, used) VALUES (?, ?, ?)",
      ['VOC-2024-004', 'basic', 1], (e) => {});
    db.run("INSERT INTO vouchers (code, plan, used) VALUES (?, ?, ?)",
      ['VOC-2024-005', 'standard', 0], (e) => {});

    // 6. Transactions (schema: id, user_id, plan_id, voucher_id, amount, type, status, payment_method, createdAt)
    db.run("INSERT INTO transactions (user_id, plan_id, voucher_id, amount, type, status, payment_method, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [1, 1, null, 99, 'purchase', 'completed', 'mpesa', now], (e) => {});
    db.run("INSERT INTO transactions (user_id, plan_id, voucher_id, amount, type, status, payment_method, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [1, 2, null, 249, 'purchase', 'completed', 'mpesa', now - 86400000], (e) => {});
    db.run("INSERT INTO transactions (user_id, plan_id, voucher_id, amount, type, status, payment_method, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [2, 1, null, 99, 'purchase', 'completed', 'card', now - 172800000], (e) => {});
    db.run("INSERT INTO transactions (user_id, plan_id, voucher_id, amount, type, status, payment_method, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [2, 3, null, 499, 'purchase', 'completed', 'mpesa', now - 259200000], (e) => {});
    db.run("INSERT INTO transactions (user_id, plan_id, voucher_id, amount, type, status, payment_method, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [3, 4, null, 999, 'purchase', 'completed', 'mpesa', now - 345600000], (e) => {});
    db.run("INSERT INTO transactions (user_id, plan_id, voucher_id, amount, type, status, payment_method, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [4, 2, null, 249, 'purchase', 'completed', 'mpesa', now - 432000000], (e) => {});

    // 7. Sessions (schema: id, user_id, plan_id, ip_address, expiry, active, createdAt)
    db.run("INSERT INTO sessions (user_id, plan_id, ip_address, expiry, active, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
      [1, 1, '192.168.1.100', now + 1800000, 1, now], (e) => {});
    db.run("INSERT INTO sessions (user_id, plan_id, ip_address, expiry, active, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
      [2, 2, '192.168.1.101', now + 3600000, 1, now], (e) => {});

    setTimeout(() => {
      console.log("✅ Database populated with complete test data!");
      process.exit(0);
    }, 1000);
  }, 500);
}, 1000);
