import express from "express";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(express.json()); // Pastikan JSON body bisa dibaca
app.use("/auth", authRoutes); // Pastikan route /auth sudah di-mount

app.listen(3000, () => console.log("Server running on port 3000"));
