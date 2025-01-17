const express = require("express");
const app = express();

const port = process.env.PORT || 3001;
const base = `${__dirname}/public`;

app.use(express.static("public"));

/* landing features */

// landing page
app.get("/", (req, res) => {
  res.sendFile(`${base}/index.html`);
});

// LogIn page
app.get("/login", (req, res) => {
  res.sendFile(`${base}/views/landing-page/login.html`);
});

// Register page
app.get("/register", (req, res) => {
  res.sendFile(`${base}/views/landing-page/register.html`);
});

/* Admin features */

// Admin LogIn page
app.get("/admin", (req, res) => {
  res.sendFile(`${base}/views/admin/login-admin.html`);
});

// Admin Control Interface
app.get("/admin-control", (req, res) => {
  res.sendFile(`${base}/views/admin/control.html`);
});

/* User features */

// User Account Page
app.get("/account", (req, res) => {
  res.sendFile(`${base}/views/account/user.html`);
});

/* Sports features */

// Sports vacancy and Check in
app.get("/sport", (req, res) => {
  res.sendFile(`${base}/views/account/sport/sport.html`);
});

// Sports timer
app.get("/timer", (req, res) => {
  res.sendFile(`${base}/views/account/sport/timer.html`);
});

/* Activity log features */

// Users total Activity Log
app.get("/activitylog", (req, res) => {
  res.sendFile(`${base}/views/account/activity/log.html`);
});

// Fitness Calculater
app.get("/calculator", (req, res) => {
  res.sendFile(`${base}/views/account/activity/calculator.html`);
});

/* Store Features */

// Nexfit Store
app.get("/store", (req, res) => {
  res.sendFile(`${base}/views/account/store/store.html`);
});

app.get("/products", (req, res) => {
  res.sendFile(`${base}/views/account/store/products.html`);
});
app.get("/air_jordan", (req, res) => {
  res.sendFile(`${base}/views/account/store/air_jordan.html`);
});
app.get("/fcb_jersey", (req, res) => {
  res.sendFile(`${base}/views/account/store/fcb_jersey.html`);
});
app.get("/nba_jersey", (req, res) => {
  res.sendFile(`${base}/views/account/store/nba_jersey.html`);
});
app.get("/nike_mercurial", (req, res) => {
  res.sendFile(`${base}/views/account/store/nike_mercurial.html`);
});
app.get("/red_tshirt", (req, res) => {
  res.sendFile(`${base}/views/account/store/red_tshirt.html`);
});

app.get("/working", (req, res) => {
  res.sendFile(`${base}/common/soon.html`);
});

/* Error page */
app.get("*", (req, res) => {
  res.sendFile(`${base}/common/404.html`);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
