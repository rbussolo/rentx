import { hash } from "bcryptjs";
import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }

  async create({
    id,
    name,
    password,
    email,
    driver_license,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 8);

    const user = this.repository.create({
      id,
      name,
      password: passwordHash,
      email,
      driver_license,
      avatar,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
