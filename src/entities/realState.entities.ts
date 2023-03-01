import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Category } from "./categories.entities";
import { Address } from "./address.entities";

@Entity("real_estate")
class RealEstate {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("boolean", { nullable: true, default: true })
  sold?: boolean | null | undefined = false;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  value: number | string;

  @Column({ type: "int", default: 0 })
  size: number = 0;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Category, {
    nullable: true,
  })
  category: Category;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;
}

export { RealEstate };
