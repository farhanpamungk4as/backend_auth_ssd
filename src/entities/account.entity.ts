import { 
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert 
} from "typeorm";
import bcrypt from "bcrypt";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 50, nullable: false })
    nama!: string;

    @Column({ type: "varchar", length: 50, nullable: false, unique: true })
    username!: string;

    @Column({ type: "text", nullable: false })
    password!: string;

    @Column({ type: "varchar", length: 100, unique: true, nullable: false })
    email!: string;

    @Column({ type: "date", nullable: false })
    tanggal_lahir!: Date;

    @Column({ type: "varchar", length: 100, nullable: false })
    tempat_tinggal!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    // Hash password sebelum menyimpan ke database
    
}
