import { UserDTO } from "../domain/userDTO";
import { UserRepository } from "../infra/userRepository";

export class UserService {
  findById(id: string) {
    const repo = new UserRepository();
    return repo.findById(id);
  }
  async saveUser(log: UserDTO): Promise<void> {
    const repo = new UserRepository();
    await repo.save(log);
  }

  async findAllUsers(): Promise<UserDTO[]> {
    const repo = new UserRepository();
    return await repo.findAll();
  }
}
