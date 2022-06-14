import * as crypto from 'crypto';
import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    salt: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(data: Partial<User> = {}) {
        Object.assign(this, data);
    }

    async checkPassword(plainPassword: string, salt: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const iterations = 50000;
            const keylen = 64;
            const digest = 'sha512';

            crypto.pbkdf2(plainPassword, salt, iterations, keylen, digest, (err, key) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(key.toString('hex'));
                }
            });
        });
    }
}
