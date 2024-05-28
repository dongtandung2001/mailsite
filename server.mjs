import express from "express";
import { handler as astroHandler } from "./dist/server/entry.mjs";
import sqlite3 from "sqlite3";
const app = express();
const PORT = 3000;
// Use Astro handler for all other routes
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin",
  );
  next();
});

app.post("/api/login", async (req, res) => {
  let db = new sqlite3.Database("northwind.db");

  const sql = "SELECT * FROM Employees WHERE EmployeeID = ?";
  const query = () => {
    return new Promise((resolve, reject) => {
      db.all(sql, [req.body.id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
  const rows = await query(sql);

  if (rows.length < 1) {
    return res.json(
      JSON.stringify({
        status: 404,
        msg: "Incorrect id/password",
      }),
    );
  }
  // check if password is correct
  if (req.body.password === rows[0].Password) {
    return res.json({
      status: 200,
      msg: "Login Successfully",
    });
  } else {
    return res.json(
      JSON.stringify({
        status: 404,
        msg: "Incorrect id/password",
      }),
    );
  }
});

app.get("/api/orders", async (req, res) => {
  let db = new sqlite3.Database("northwind.db");
  const sql = "SELECT * FROM Orders";
  const query = () => {
    return new Promise((resolve, reject) => {
      db.all(sql, [req.body.id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
  const rows = await query(sql);
  return res.json({
    status: 200,
    data: rows,
  });
});

app.get("/api/orders/:id", async (req, res) => {
  let db = new sqlite3.Database("northwind.db");
  const sql = `SELECT * FROM \`Order Details\` as o 
  JOIN Products as p ON o.ProductID == p.ProductID
  WHERE o.OrderID = ?
  `;
  const query = () => {
    return new Promise((resolve, reject) => {
      db.all(sql, [req.params.id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
  const rows = await query(sql);
  return res.json({
    status: 200,
    data: rows,
  });
});

app.get("/api", async (req, res) => {
  return res.json({ msg: "OK" });
});

app.use(astroHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
