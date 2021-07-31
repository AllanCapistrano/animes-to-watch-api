import { compare } from "bcryptjs";

import { UsersRepositoriesInMemory } from "../../repositories/in-memory/UsersRepositoriesInMemory";
import { IUsersRepositories } from "../../repositories/interfaces/IUsersRepositories";
import { CreateUserService } from "../../services/CreateUserService";

describe("Create user", () => {
  let userRepository: IUsersRepositories;
  let createUserService: CreateUserService;

  beforeAll(() => {
    userRepository = new UsersRepositoriesInMemory();
    createUserService = new CreateUserService(userRepository);
  });

  it("Should be able to create a new user", async () => {
    const userData = {
      name: "Test0",
      email: "test0@example.com",
      password: "password123",
      avatar: null,
    };

    const user = await createUserService.execute(userData);

    expect(user).toHaveProperty("id");

    expect(user.name).toBe("Test0");

    expect(user.email).toBe("test0@example.com");
  });

  it("Should not be able to create a user with an invalid email address", async () => {
    const userData = [
      {
        name: "Test1",
        email: "test1example.com",
        password: "password123",
        avatar: null,
      },
      {
        name: "Test2",
        email: "test2@examplecom",
        password: "password123",
        avatar: null,
      },
      {
        name: "Test3",
        email: "test3@example",
        password: "password123",
        avatar: null,
      },
    ];

    await expect(createUserService.execute(userData[0])).rejects.toEqual(
      new Error("Email inválido! Tente novamente.")
    );

    await expect(createUserService.execute(userData[1])).rejects.toEqual(
      new Error("Email inválido! Tente novamente.")
    );
    
    await expect(createUserService.execute(userData[2])).rejects.toEqual(
      new Error("Email inválido! Tente novamente.")
    );
  });

  it("Should be able to hash the password", async () => {
    const userData = {
      name: "Test4",
      email: "test4@example.com",
      password: "password123",
      avatar: null,
    };

    const user = await createUserService.execute(userData);

    const passwordMatch = await compare("password123", user.password);

    expect(passwordMatch).toBeTruthy();
  });

  it("Should not be able to create an existing user", async () => {
    const userData = {
      name: "Test5",
      email: "test5@example.com",
      password: "password123",
      avatar: null,
    };

    /**
     * A primeira chamada é somente para a criação, não sendo necessário guardar
     * o retorno.
     */
    await createUserService.execute(userData);

    await expect(createUserService.execute(userData)).rejects.toEqual(
      new Error("Usuário já cadastrado!")
    );
  });
});
