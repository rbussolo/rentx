import { injectable, inject } from "tsyringe";

import { AppError } from "@errors/AppError";
import {
  ICreateUserDTO,
  IUsersRepository,
} from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new AppError("User already exists!");
    }

    await this.usersRepository.create(data);
  }
}

export { CreateUserUseCase };
