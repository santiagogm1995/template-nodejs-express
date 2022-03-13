import { Connection, createConnection } from "typeorm";
import { v4 } from "uuid";
import { UserEntity } from "../../../user/domain/userEntity";

export class MySQLPool /*implements IPool<Connection>*/ {
  async getConnection(): Promise<Connection> {
    return await createConnection({
      name: v4(),
      type: "mysql",
      host: process.env.HOSTDB,
      port: Number(process.env.PORTDB),
      username: process.env.USERDB,
      password: process.env.PASSDB,
      database: process.env.DB_NAME,
      logger: "advanced-console",
      entities: [UserEntity],
      logging: ["query", "error"],
    });
  }
}
