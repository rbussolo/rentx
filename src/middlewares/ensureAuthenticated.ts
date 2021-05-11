import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "24176e3fc59c20fba3764d244f7f7324"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(sub);

    if (!user) {
      throw new AppError("User not exists", 401);
    }
  } catch (error) {
    throw new AppError("Token invalid", 401);
  }

  next();
}
