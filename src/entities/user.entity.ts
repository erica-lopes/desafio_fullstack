import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Client } from "./clients.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 60 })
  name: string;

  @Column({ length: 60, unique: true })
  email: string;

  @Column({ length: 14 })
  phoneNumber: string;

  @Column({ length: 120 })
  @Exclude()
  password: string;

  @CreateDateColumn()
  registrationDate: Date;

  @OneToMany(() => Client, (client) => client.user, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  client: Client[];
}

export { User };
