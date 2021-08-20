import { ICategoriesRepositories } from "../../repositories/interfaces/ICategoriesRepositories";
import { CategoriesRepositoriesInMemory } from "../../repositories/in-memory/CategoriesRepositoriesInMemory";
import { CreateCategoryService } from "../../services/CreateCategoryService";
import { ListCategoriesService } from "../../services/ListCategoriesService";
import { Category } from "../../entities/Category";

describe("List all categories", () => {
  let categoryRepository: ICategoriesRepositories;
  let createCategoryService: CreateCategoryService;
  let listCategoriesService: ListCategoriesService;
  let categories: Category[] = [];

  beforeAll(async () => {
    categoryRepository = new CategoriesRepositoriesInMemory();
    createCategoryService = new CreateCategoryService(categoryRepository);
    listCategoriesService = new ListCategoriesService(categoryRepository);

    const categoriesData = [
      {
        name: "Romance",
      },
      {
        name: "Aventura",
      },
      {
        name: "Terror",
      },
    ];

    categories[0] = await createCategoryService.execute(categoriesData[0]);
    categories[1] = await createCategoryService.execute(categoriesData[1]);
    categories[2] = await createCategoryService.execute(categoriesData[2]);
  });

  it("Should be able to list all created categories", async () => {
    const categoriesReturned = await listCategoriesService.execute();

    expect(categoriesReturned.length).toBe(categories.length);

    for (let i = 0; i < categories.length; i++) {
      expect(categoriesReturned[i].id).toBe(categories[i].id);
      expect(categoriesReturned[i].name).toBe(categories[i].name);

      expect(categoriesReturned[i].id).toBe(categories[i].id);
      expect(categoriesReturned[i].name).toBe(categories[i].name);

      expect(categoriesReturned[i].id).toBe(categories[i].id);
      expect(categoriesReturned[i].name).toBe(categories[i].name);

      expect(categoriesReturned[i]).not.toHaveProperty("created_at");
      expect(categoriesReturned[i]).not.toHaveProperty("updated_at");
    }
  });
});
