import { ICategoriesRepositories } from "../../repositories/interfaces/ICategoriesRepositories";
import { CategoriesRepositoriesInMemory } from "../../repositories/in-memory/CategoriesRepositoriesInMemory";
import { CreateCategoryService } from "../../services/CreateCategoryService";

describe("Create category.", () => {
  let categoryRepository: ICategoriesRepositories;
  let createCategoryService: CreateCategoryService;

  beforeAll(() => {
    categoryRepository = new CategoriesRepositoriesInMemory();
    createCategoryService = new CreateCategoryService(categoryRepository);
  });

  it("Should be able to create a new category", async () => {
    const categoryData = {
      name: "Test0",
    };

    const category = await createCategoryService.execute(categoryData);

    expect(category).toHaveProperty("id");

    expect(category.name).toBe("Test0");
  });

  it("Should not be able to create an existing category", async () => {
    const categoryData = {
      name: "Test1",
    };

    /**
     * A primeira chamada é somente para a criação, não sendo necessário guardar
     * o retorno.
     */
    await createCategoryService.execute(categoryData);

    await expect(createCategoryService.execute(categoryData)).rejects.toEqual(
      new Error("Categoria já cadastrada.")
    );
  });
});
