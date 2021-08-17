import { Category } from "../../entities/Category";
import { CategoriesRepositoriesInMemory } from "../../repositories/in-memory/CategoriesRepositoriesInMemory";
import { ICategoriesRepositories } from "../../repositories/interfaces/ICategoriesRepositories";
import { CreateCategoryService } from "../../services/CreateCategoryService";
import { UpdateCategoryService } from "../../services/UpdateCategoryService";

describe("Update Category", () => {
  let categoryRepository: ICategoriesRepositories;
  let updateCategoryService: UpdateCategoryService;
  let createCategoryService: CreateCategoryService;
  let category: Category[] = [];

  beforeAll(async () => {
    categoryRepository = new CategoriesRepositoriesInMemory();
    updateCategoryService = new UpdateCategoryService(categoryRepository);
    createCategoryService = new CreateCategoryService(categoryRepository);

    let categoryData = [
      {
        name: "Ação",
      },
      {
        name: "Romance",
      },
      {
        name: "Ecchi",
      },
    ];

    category[0] = await createCategoryService.execute(categoryData[0]);
    category[1] = await createCategoryService.execute(categoryData[1]);
    category[2] = await createCategoryService.execute(categoryData[2]);
  });

  it("Should be able to update a category.", async () => {
    const categoryData = {
      name: "Aventura",
    };

    await updateCategoryService.execute({
      id: category[0].id,
      ...categoryData,
    });

    expect(category[0].name).toBe("Aventura");

    expect(category[1].name).toBe("Romance");
  });

  it("Should not be able to update a category name that already exists.", async () => {
    const categoryData = {
      name: "Romance",
    };

    await expect(
      updateCategoryService.execute({ id: category[2].id, ...categoryData })
    ).rejects.toEqual(
      new Error(
        "Já existe uma categoria cadastrada com esse nome! Tente novamente."
      )
    );
  });
});
