import { ICategoriesRepositories } from "../../repositories/interfaces/ICategoriesRepositories";
import { CategoriesRepositoriesInMemory } from "../../repositories/in-memory/CategoriesRepositoriesInMemory";
import { CreateCategoryService } from "../../services/CreateCategoryService";
import { RemoveCategoryService } from "../../services/RemoveCategoryService";
import { Category } from "../../entities/Category";

describe("Remove a category", () => {
  let categoryRepository: ICategoriesRepositories;
  let createCategoryService: CreateCategoryService;
  let removeCategoryService: RemoveCategoryService;
  let categories: Category[] = [];

  beforeAll(async () => {
    const categoriesData = [
      {
        name: "Aventura",
      },
      {
        name: "Ação",
      },
      {
        name: "Romance",
      },
    ];

    categoryRepository = new CategoriesRepositoriesInMemory();
    createCategoryService = new CreateCategoryService(categoryRepository);
    removeCategoryService = new RemoveCategoryService(categoryRepository);

    categories[0] = await createCategoryService.execute(categoriesData[0]);
    categories[1] = await createCategoryService.execute(categoriesData[1]);
    categories[2] = await createCategoryService.execute(categoriesData[2]);
  });

  it("Should be able to remove a category", async () => {
    await expect(
      removeCategoryService.execute({ id: categories[1].id })
    ).toBeTruthy();
  });

  it("Should not be able to remove a non-existent category", async () => {
    await removeCategoryService.execute({ id: categories[2].id });

    await expect(
      removeCategoryService.execute({ id: categories[2].id })
    ).rejects.toEqual(new Error("Categoria inválida! Tente novamente."));
  });
});
