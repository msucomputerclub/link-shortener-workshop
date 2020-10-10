const express = require("express");

const app = express();

const PORT = 5000;

let map = new Map();

app.get("/", (req, res) => {
  console.log(`${req.method} | ${req.url} | ${req.headers["user-agent"]}`);
  res.send("<h1>Hello world!</h1>");
});

app.get("/:alias", (req, res) => {
  const { alias } = req.params;
  const url = map.get(alias);
  res.status(200).redirect("https://" + url);
});

app.post("/:url/:alias?", (req, res) => {
  let { url, alias } = req.params;
  if (!url) return res.status(400).json({ err: "no url" });
  if (!alias) {
    alias = Math.random().toString(36).substring(2, 15);
  }
  map.set(alias, url);
  res.status(200).json(`url: ${url}, alias: ${alias}`);
});

app.listen(PORT || 5000, () => {
  console.log("server listening on port " + PORT);
});
