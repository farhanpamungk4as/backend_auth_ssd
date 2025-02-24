import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import { AppDataSource } from "./config/database";
import expressListRoutes from "express-list-routes";




dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.path}`);
    next();
});

app.use("/auth", authRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected!");
        app.listen(3000, () => console.log("Server running on port 3000"));
    })
    .catch((error) => console.log("Database connection error:", error));

expressListRoutes(app);