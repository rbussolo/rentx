import { Request, Response } from "express";
import { container } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data: ICreateUserDTO = request.body;

    try {
      const createUserUseCase = container.resolve(CreateUserUseCase);
      await createUserUseCase.execute(data);

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }
}

export { CreateUserController };
