import { IAnimesRepositories } from "../../repositories/interfaces/IAnimesRepositories";
import { ICategoriesRepositories } from "../../repositories/interfaces/ICategoriesRepositories";
import { IAnimesCategoriesRepositories } from "../../repositories/interfaces/IAnimesCategoriesRepositories";
import { UpdateAnimeService } from "../../services/UpdateAnimeService";
import { AnimesRepositoriesInMemory } from "../../repositories/in-memory/AnimesRepositoriesInMemory";
import { CategoriesRepositoriesInMemory } from "../../repositories/in-memory/CategoriesRepositoriesInMemory";
import { AnimesCategoriesRepositoriesInMemory } from "../../repositories/in-memory/AnimesCategoriesRepositoriesInMemory";
import { CreateAnimeService } from "../../services/CreateAnimeService";
import { CreateCategoryService } from "../../services/CreateCategoryService";
import { Anime } from "../../entities/Anime";

describe("Update anime", () => {
  let animeRepository: IAnimesRepositories;
  let categoryRepository: ICategoriesRepositories;
  let animeCategoryRepository: IAnimesCategoriesRepositories;
  let updateAnimeService: UpdateAnimeService;
  let createAnimeService: CreateAnimeService;
  let createCategoryService: CreateCategoryService;
  let categoriesIds: string[] = [];
  let c0, c1, c2;
  let anime: Anime[] = [];

  beforeAll(async () => {
    animeRepository = new AnimesRepositoriesInMemory();
    categoryRepository = new CategoriesRepositoriesInMemory();
    animeCategoryRepository = new AnimesCategoriesRepositoriesInMemory();
    updateAnimeService = new UpdateAnimeService(
      animeRepository,
      categoryRepository,
      animeCategoryRepository
    );
    createAnimeService = new CreateAnimeService(
      animeRepository,
      categoryRepository,
      animeCategoryRepository
    );
    createCategoryService = new CreateCategoryService(categoryRepository);

    c0 = (await createCategoryService.execute({ name: "category0" })).id;
    c1 = (await createCategoryService.execute({ name: "category1" })).id;
    c2 = (await createCategoryService.execute({ name: "category2" })).id;

    categoriesIds.push(c0);
    categoriesIds.push(c1);
    categoriesIds.push(c2);

    const anime0Data = {
      name: "Test0",
      image: "https://images.com/animes/0",
      url: "https://myanime.com/anime/0",
      description: "Here is a simple description",
      categories: categoriesIds,
    };

    const anime1Data = {
      name: "Test1",
      image: "https://images.com/animes/1",
      url: "https://myanime.com/anime/1",
      categories: [c1, c2],
    };

    anime[0] = await createAnimeService.execute(anime0Data);
    anime[1] = await createAnimeService.execute(anime1Data);
  });

  it("Should be able to update an anime", async () => {
    const animeData = {
      name: "Test New Name",
      image: null,
      url: "https://newimage.com/anime/0",
      description: null,
    };

    await updateAnimeService.execute({
      id: anime[0].id,
      ...animeData,
      categories: [c0],
    });

    expect(anime[0].name).toBe("Test New Name");

    expect(anime[0].image).toBeNull();

    expect(anime[0].url).toBe("https://newimage.com/anime/0");

    expect(anime[0].description).toBeNull();
  });

  it("Should not be able to update an anime name that already exists", async () => {
    const animeData = {
      name: "Test1",
      image: null,
      url: "https://newimage.com/anime/0",
      description: null,
    };

    await expect(
      updateAnimeService.execute({
        id: anime[0].id,
        ...animeData,
        categories: [c0],
      })
    ).rejects.toEqual(
      new Error("Já existe um anime cadastrado com esse nome! Tente novamente.")
    );
  });

  it("Should not be able to update an anime with empty categories", async () => {
    const animeData = {
      name: "New Name",
      image: null,
      url: "https://newimage.com/anime/1",
      description: null,
    };

    await expect(
      updateAnimeService.execute({
        id: anime[1].id,
        ...animeData,
        categories: [],
      })
    ).rejects.toEqual(
      new Error(
        "Para a atualização de um anime é necessário uma ou mais categorias."
      )
    );
  });

  it("Should not be able to update an anime with invalid categories", async () => {
    const animeData = {
      name: "New Name",
      image: null,
      url: "https://newimage.com/anime/1",
      description: null,
    };

    await expect(
      updateAnimeService.execute({
        id: anime[1].id,
        ...animeData,
        categories: [
          "9b954b24-fc5e-4927-8b45-4859c5b2b859",
          "e92dd749-a7c8-42c9-b56b-1dfda7920233",
        ],
      })
    ).rejects.toEqual(new Error("Categoria(s) inválida(s)! Tente novamente."));
  });
});
