import { IAnimesRepositories } from "../../repositories/interfaces/IAnimesRepositories";
import { ICategoriesRepositories } from "../../repositories/interfaces/ICategoriesRepositories";
import { IAnimesCategoriesRepositories } from "../../repositories/interfaces/IAnimesCategoriesRepositories";
import { AnimesRepositoriesInMemory } from "../../repositories/in-memory/AnimesRepositoriesInMemory";
import { CategoriesRepositoriesInMemory } from "../../repositories/in-memory/CategoriesRepositoriesInMemory";
import { AnimesCategoriesRepositoriesInMemory } from "../../repositories/in-memory/AnimesCategoriesRepositoriesInMemory";
import { CreateAnimeService } from "../../services/CreateAnimeService";
import { CreateCategoryService } from "../../services/CreateCategoryService";
import { RemoveAnimeService } from "../../services/RemoveAnimeService";
import { Anime } from "../../entities/Anime";

describe("Remove a anime", () => {
  let animeRepository: IAnimesRepositories;
  let categoryReposository: ICategoriesRepositories;
  let animeCategoryRepository: IAnimesCategoriesRepositories;
  let createAnimeService: CreateAnimeService;
  let createCategoryService: CreateCategoryService;
  let removeAnimeService: RemoveAnimeService;
  const categoriesIds: string[] = [];
  let animes: Anime[] = [];

  beforeAll(async () => {
    animeRepository = new AnimesRepositoriesInMemory();
    categoryReposository = new CategoriesRepositoriesInMemory();
    animeCategoryRepository = new AnimesCategoriesRepositoriesInMemory();
    createAnimeService = new CreateAnimeService(
      animeRepository,
      categoryReposository,
      animeCategoryRepository
    );
    createCategoryService = new CreateCategoryService(categoryReposository);
    removeAnimeService = new RemoveAnimeService(animeRepository);

    const c0 = (await createCategoryService.execute({ name: "category0" })).id;
    const c1 = (await createCategoryService.execute({ name: "category1" })).id;
    const c2 = (await createCategoryService.execute({ name: "category2" })).id;

    categoriesIds.push(c0);
    categoriesIds.push(c1);
    categoriesIds.push(c2);

    const animesData = [
      {
        name: "Test0",
        image: "https://images.com/animes/0",
        url: "https://myanime.com/anime/0",
        description: "Here is a simple description",
        categories: categoriesIds,
      },
      {
        name: "Test1",
        image: "https://images.com/animes/1",
        url: "https://myanime.com/anime/1",
        categories: [c1, c2],
      },
      {
        name: "Test2",
        image: "https://images.com/animes/1",
        url: "https://myanime.com/anime/1",
        categories: [c2],
      },
    ];

    animes[0] = await createAnimeService.execute(animesData[0]);
    animes[1] = await createAnimeService.execute(animesData[1]);
    animes[2] = await createAnimeService.execute(animesData[2]);
  });

  it("Should be able to remove a anime.", async () => {
    await expect(removeAnimeService.execute({ id: animes[0].id })).toBeTruthy();
  });

  it("Should not be able to remove a non-existent anime.", async () => {
    await removeAnimeService.execute({ id: animes[1].id });

    await expect(
      removeAnimeService.execute({ id: animes[1].id })
    ).rejects.toEqual(new Error("Anime inválido! Tente novamente."));
  });
});
