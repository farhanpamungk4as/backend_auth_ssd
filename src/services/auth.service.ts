import { AppDataSource } from "../config/database";
import { Account } from "../entities/account.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const accountRepository = AppDataSource.getRepository(Account);

export class AuthService {
    static async register(data: any) {
        const { nama, username, password, email, tanggal_lahir, tempat_tinggal } = data;

        // Cek apakah username atau email sudah ada
        const existingUser = await accountRepository.findOne({ where: [{ username }, { email }] });
        if (existingUser) throw new Error("Username atau Email sudah digunakan!");

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan ke database
        const user = accountRepository.create({
            nama,
            username,
            password: hashedPassword,
            email,
            tanggal_lahir,
            tempat_tinggal,
        });

        await accountRepository.save(user);
        return { message: "Registrasi berhasil!" };
    }

    static async login(data: any) {
        const { email, password } = data;

        // Cari user berdasarkan username
        const user = await accountRepository.findOne({ where: { email } });
        if (!user) throw new Error("User tidak ditemukan!");

        // Cek password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error("Password salah!");

        // Buat token JWT
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        const token = jwt.sign({ id: user.id, username: user.email }, process.env.JWT_SECRET as string, {
            expiresIn: "1h",
        });

        return { token, message: "Login berhasil!" };
    }

    static async getUsers() {
        const users = await accountRepository.find({
            select: ["id", "nama", "username", "email", "tanggal_lahir", "tempat_tinggal", "created_at","updated_at"],
        });
        return users;
    }

    static async updateUser(id: number, data: any) {
        const { nama, email, username, tanggal_lahir, tempat_tinggal } = data;
    
        // Cek apakah user ada
        const user = await accountRepository.findOne({ where: { id } });
        if (!user) throw new Error("User tidak ditemukan!");
    
        // Update data
        user.nama = nama || user.nama;
        user.email = email || user.email;
        user.username = username || user.username;
        user.tanggal_lahir = tanggal_lahir || user.tanggal_lahir;
        user.tempat_tinggal = tempat_tinggal || user.tempat_tinggal;
    
        await accountRepository.save(user);
        return { message: "User berhasil diperbarui!" };
    }
    
    static async deleteUser(id: number) {
        // Cek apakah user ada
        const user = await accountRepository.findOne({ where: { id } });
        if (!user) throw new Error("User tidak ditemukan!");
    
        await accountRepository.remove(user);
        return { message: "User berhasil dihapus!" };
    }
    

    
}
