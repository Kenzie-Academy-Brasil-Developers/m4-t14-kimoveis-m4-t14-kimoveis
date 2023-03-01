import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./users.entities";
import { RealEstate } from "./realState.entities";

@Entity("schedules_users_properties")
class Schedules {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  date: Date;

  @Column()
  hour: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => RealEstate)
  realEstate: RealEstate;
}

export { Schedules };
