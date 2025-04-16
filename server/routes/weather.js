// server/routes/weather.js
import express from "express";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getWeatherByCity, getWeatherByCoords } from "../services/weatherService.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const filePath = path.join(__dirname, "../data/searches.json");

// GET weather by city
router.get("/weather", async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: "City is required" });

  const data = await getWeatherByCity(city);
  res.json(data);
});

// GET weather by coordinates
router.get("/weather/current", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: "Coordinates are required" });

  const data = await getWeatherByCoords(lat, lon);
  res.json(data);
});

// POST to save a searched city
router.post("/search", (req, res) => {
  const { city } = req.body;
  if (!city) return res.status(400).json({ error: "City is required" });

  const existing = JSON.parse(fs.readFileSync(filePath, "utf8") || "[]");
  const timestamp = new Date().toLocaleString();
  const newEntry = { city, time: timestamp };

  const updated = [newEntry, ...existing].slice(0, 10);
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
  res.json({ message: "Saved", entry: newEntry });
});

// GET all searches
router.get("/searches", (req, res) => {
  const stored = JSON.parse(fs.readFileSync(filePath, "utf8") || "[]");
  res.json(stored);
});

export default router;
