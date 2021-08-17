import { IAnimesRepositories } from "../../repositories/interfaces/IAnimesRepositories";
import { ICategoriesRepositories } from "../../repositories/interfaces/ICategoriesRepositories";
import { IAnimesCategoriesRepositories } from "../../repositories/interfaces/IAnimesCategoriesRepositories";
import { AnimesRepositoriesInMemory } from "../../repositories/in-memory/AnimesRepositoriesInMemory";
import { CategoriesRepositoriesInMemory } from "../../repositories/in-memory/CategoriesRepositoriesInMemory";
import { AnimesCategoriesRepositoriesInMemory } from "../../repositories/in-memory/AnimesCategoriesRepositoriesInMemory";
import { CreateAnimeService } from "../../services/CreateAnimeService";
import { CreateCategoryService } from "../../services/CreateCategoryService";

describe("Create anime", () => {
  let animeRepository: IAnimesRepositories;
  let categoryReposository: ICategoriesRepositories;
  let animeCategoryRepository: IAnimesCategoriesRepositories;
  let createAnimeService: CreateAnimeService;
  let createCategoryService: CreateCategoryService;
  const categoriesIds: string[] = [];

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

    const c0 = (await createCategoryService.execute({ name: "category0" })).id;
    const c1 = (await createCategoryService.execute({ name: "category1" })).id;
    const c2 = (await createCategoryService.execute({ name: "category2" })).id;

    categoriesIds.push(c0);
    categoriesIds.push(c1);
    categoriesIds.push(c2);
  });

  it("Should be able to create a new anime.", async () => {
    const animeData = {
      name: "Anime0",
      image: "https://google.com/images/sample-image.png",
      url: "https://animeweb.com/anime/anime0",
      description: null,
      categories: categoriesIds,
    };

    const anime = await createAnimeService.execute(animeData);

    expect(anime).toHaveProperty("id");

    expect(anime.name).toBe("Anime0");

    expect(anime.image).toBe("https://google.com/images/sample-image.png");

    expect(anime.url).toBe("https://animeweb.com/anime/anime0");

    expect(anime.description).toBeNull();
  });

  it("Should not be able to create an existing anime.", async () => {
    const animeData = {
      name: "Anime1",
      image: "https://google.com/images/sample-image.png",
      url: "https://animeweb.com/anime/anime1",
      description: null,
      categories: categoriesIds,
    };

    /**
     * A primeira chamada é somente para a criação, não sendo necessário guardar
     * o retorno.
     */
    await createAnimeService.execute(animeData);

    await expect(createAnimeService.execute(animeData)).rejects.toEqual(
      new Error("Anime já cadastrado! Tente novamente.")
    );
  });

  it("Should not be able to create an anime with no categories.", async () => {
    const animeData = {
      name: "Anime2",
      image: "https://google.com/images/sample-image.png",
      url: "https://animeweb.com/anime/anime2",
      description: null,
      categories: [],
    };

    await expect(createAnimeService.execute(animeData)).rejects.toEqual(
      new Error(
        "Para o cadastro de um anime é necessário uma ou mais categorias."
      )
    );
  });

  it("Should not be able to create an anime with invalids categories IDs.", async () => {
    const invalidsCategoriesIDs = [
      "e92dd736-a7c8-42c9-b56b-1dfda7920233",
      "14d43cae-3965-4e2a-be24-38d126185368",
      "9b954b24-fc5e-4927-8b45-4859c5b2b855",
    ];

    const animeData = {
      name: "Anime3",
      image: "https://google.com/images/sample-image.png",
      url: "https://animeweb.com/anime/anime3",
      description: null,
      categories: invalidsCategoriesIDs,
    };

    await expect(createAnimeService.execute(animeData)).rejects.toEqual(
      new Error("Categoria(s) inválida(s)! Tente novamente.")
    );
  });
});
