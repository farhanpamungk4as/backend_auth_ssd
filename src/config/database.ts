import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Account } from "../entities/account.entity";

dotenv.config(); // Load environment variables lebih awal

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "mydatabase",
    schema: "my_schema",
    synchronize: process.env.NODE_ENV !== "production", // Jangan pakai synchronize di production
    logging: process.env.NODE_ENV === "development",
    entities: [Account],
    extra: {
      max: 5, // Batasi maksimal 5 koneksi
      idleTimeoutMillis: 30000, // Tutup koneksi yang idle selama 30 detik
  },
    migrations: ["src/migrations/*.ts"], // Tambahkan untuk update skema aman
});
