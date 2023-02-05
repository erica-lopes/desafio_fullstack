import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";

@Entity("clients")
class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 60 })
  name: string;

  @Column({ length: 60, unique: true })
  email: string;

  @Column({ length: 14 })
  phoneNumber: string;

  @CreateDateColumn()
  registrationDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User)
  user: User;
}

export { Client };
