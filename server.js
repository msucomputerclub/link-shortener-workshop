const path = require("path");
const express = require("express");
const cors = require("cors");
const PORT = 5000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

let map = new Map();

app.get("/", (req, res) => {
  console.log(`${req.method} | ${req.url} | ${req.headers["user-agent"]}`);
  res.send(path.join);
});

app.get("/:alias", (req, res) => {
  const { alias } = req.params;
  const url = map.get(alias);
  if (!url) return res.status(400).redirect("/");
  res.status(200).redirect(url);
});

app.post("/", (req, res) => {
  let { url, alias } = req.body;
  if (!url) return res.status(400).json({ err: "no url" });
  if (!alias) {
    alias = Math.random().toString(36).substring(2, 15);
  }
  map.set(alias, url);
  res.status(200).json(`${req.headers.origin}/${alias}`);
});

app.listen(PORT || 5000, () => {
  console.log("server listening on port " + PORT);
});
