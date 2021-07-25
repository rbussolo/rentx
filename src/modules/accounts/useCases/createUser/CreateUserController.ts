import { Request, Response } from "express";
import { container } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data: ICreateUserDTO = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);
    await createUserUseCase.execute(data);

    return response.status(201).send();
  }
}

export { CreateUserController };
