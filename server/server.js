import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weather.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", weatherRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
