import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const result = await AuthService.register(req.body);
            res.status(201).json(result);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ error: err.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const result = await AuthService.login(req.body);
            res.status(200).json(result);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ error: err.message });
        }
    }

    static async getUsers(req: Request, res: Response) {  // 🔹 Tambahkan ini
        try {
            const users = await AuthService.getUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: "Gagal mengambil data pengguna!" });
        }
    }

        static async updateUser(req: Request, res: Response) {
            try {
                const { id } = req.params;
                const result = await AuthService.updateUser(Number(id), req.body);
                res.status(200).json(result);
            } catch (error) {
                res.status(400).json({ error: (error as Error).message });
            }
        }
    
        static async deleteUser(req: Request, res: Response) {
            try {
                const { id } = req.params;
                const result = await AuthService.deleteUser(Number(id));
                res.status(200).json(result);
            } catch (error) {
                res.status(400).json({ error: (error as Error).message });
            }
        }
    }

