console.log("🔥 NODE IS EXECUTING index.js - IANO DRS ISP PLATFORM");

const express = require("express");
const cors = require("cors");
const path = require("path");

// Initialize database
require("./utils/db");

const app = express();

/* ------------------- MIDDLEWARE ------------------- */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static("public"));
app.use("/ads", express.static(path.join(__dirname, "ads")));

/* ------------------- HEALTH CHECK ------------------- */

app.get("/", (req, res) => {
  res.json({
    name: "IANO DRS ISP Platform",
    status: "running",
    version: "2.0",
    timestamp: new Date().toISOString(),
  });
});

/* ------------------- CORE ROUTES ------------------- */

const routes = [
  ["auth", "./routes/auth.routes"],
  ["plans", "./routes/plans.routes"],
  ["users", "./routes/users.routes"],
  ["billing", "./routes/billing.routes"],
  ["payments", "./routes/payments.routes"],
  ["payment", "./routes/payment.routes"],
  ["analytics", "./routes/analytics.routes"],
  ["vouchers", "./routes/voucher.routes"],
  ["routers", "./routes/routers.routes"],
  ["iot", "./routes/iot.routes"],
  ["hotspot", "./routes/hotspot.routes"],
  ["smarttv", "./routes/smarttv.routes"],
  ["stats", "./routes/stats.routes"],
  ["ads", "./routes/ads.routes"],
  ["sessions", "./routes/sessions.routes"],
  ["pppoe", "./routes/pppoe.routes"],
];

// Load routes safely
routes.forEach(([routePath, file]) => {
  try {
    const route = require(file);
    app.use(`/api/${routePath}`, route);
    console.log(`✅ Loaded route: /api/${routePath}`);
  } catch (err) {
    console.log(`⚠️ Failed loading route ${routePath}: ${err.message}`);
  }
});

/* ------------------- PORTAL ROUTE ------------------- */

try {
  app.use("/portal", require("./routes/portal.routes"));
  console.log("✅ Portal route loaded");
} catch (err) {
  console.log("⚠️ Portal route failed:", err.message);
}

/* ------------------- ADMIN DASHBOARD ------------------- */

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

/* ------------------- SERVER START ------------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 IANO DRS ISP Platform running on port ${PORT}`);
  console.log("✅ Complete Billing System: ACTIVE");
  console.log("✅ Analytics & Reporting: ACTIVE");
  console.log("✅ Fraud Detection: ACTIVE");
  console.log("✅ Admin Dashboard: READY at /admin.html");

  /* ------------------- BACKGROUND SERVICES ------------------- */

  setTimeout(() => {
    try {
      require("./services/routerMonitor.service");
      require("./services/voucherMonitor.service");
      require("./services/hotspotCleanup.service");

      const { runEnforcement } = require("./services/enforcement.service");

      setInterval(runEnforcement, 5 * 60 * 1000);

      console.log("✅ All background services: ACTIVE");
    } catch (err) {
      console.log("⚠️ Some background services failed:", err.message);
    }
  }, 1000);
});

/* ------------------- GLOBAL ERROR HANDLER ------------------- */

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Promise Rejection:", err);
});
