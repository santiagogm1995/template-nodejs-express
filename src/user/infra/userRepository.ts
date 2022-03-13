import { MySQLPool } from "../../common/infra/factoryBBDD/mysqlSQLPoll";
import { IRepository } from "../../common/infra/iRepository";
import { UserDTO } from "../domain/userDTO";
import { UserEntity } from "../domain/userEntity";
import { UserMapper } from "../domain/userMapper";

export class UserRepository implements IRepository<UserDTO> {
  async save(dto: UserDTO): Promise<void> {
    const pool = new MySQLPool();
    const connection = await pool.getConnection();
    try {
      const repoEntity = connection.getRepository(UserEntity);
      const mapper = new UserMapper();
      const entity: any = mapper.toEntity(dto);
      await repoEntity.save(entity);
      connection.close();
    } catch (error) {
      console.log(error);
    }
  }

  async update(entity: UserDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async findById(id: string): Promise<UserDTO | null> {
    const pool = new MySQLPool();
    const connection = await pool.getConnection();
    let entity: UserEntity = new UserEntity();
    const mapper = new UserMapper();
    try {
      const repoEntity = connection.getRepository(UserEntity);
      entity =
        (await repoEntity.findOne({ where: { id: id } })) || new UserEntity();
      connection.close();
    } catch (error) {
      console.log(error);
    }

    const dto = mapper.toDTO(entity);

    return dto;
  }
  async findAll(): Promise<UserDTO[]> {
    const pool = new MySQLPool();
    const connection = await pool.getConnection();
    let entities = new Array<UserEntity>();
    const mapper = new UserMapper();
    try {
      const repoEntity = connection.getRepository(UserEntity);
      entities = await repoEntity.find();
      connection.close();
    } catch (error) {
      console.log(error);
    }

    return entities.map((entity: UserEntity) => mapper.toDTO(entity));
  }
}
