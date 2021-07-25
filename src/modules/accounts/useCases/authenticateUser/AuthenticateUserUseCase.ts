import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    console.log(email);
    console.log(password);

    // Check if user exists
    const user = await this.usersRepository.findByEmail(email);

    console.log(user);

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    // Check if password is correct
    const passwordMatch = await compare(password, user.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    // Generate jsonwebtoken
    const token = sign({}, "24176e3fc59c20fba3764d244f7f7324", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
