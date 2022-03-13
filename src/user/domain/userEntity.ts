import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryColumn({ name: "User", length: 255 })
  declare user: string;
  @Column({ name: "Status", length: 2 })
  declare status: string;
  @Column({ name: "created_at" })
  declare created_at: Date;
  @Column({ name: "updated_at" })
  declare updated_at: Date;
  @Column({ name: "TimeZone", length: 3 })
  declare timeZone: string;
  @Column({ name: "PublicProfile" })
  declare publicProfile: boolean;
}
