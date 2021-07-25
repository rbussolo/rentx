import { AppError } from "@errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create a new Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Test Category",
      description: "A new category for test",
    };

    // Adiciona a categoria no banco
    await createCategoryUseCase.execute(category);

    // Busca a categoria criada
    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    // Verifica se ocorreu o esperado
    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with name exists", async () => {
    expect(async () => {
      const category = {
        name: "Test Category",
        description: "A new category for test",
      };

      // Adiciona a categoria no banco
      await createCategoryUseCase.execute(category);

      // Adiciona novamente para capturar o erro
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
