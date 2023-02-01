import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer";

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
}

export { User };
