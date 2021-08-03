import { IUsersRepositories } from "../../repositories/interfaces/IUsersRepositories";
import { UsersRepositoriesInMemory } from "../../repositories/in-memory/UsersRepositoriesInMemory";
import { AuthenticateUserService } from "../../services/AuthenticateUserService";
import { CreateUserService } from "../../services/CreateUserService";

describe("Authenticate user", () => {
  let userRepository: IUsersRepositories;
  let authenticateUserService: AuthenticateUserService;
  let createUserService: CreateUserService;

  beforeAll(async () => {
    userRepository = new UsersRepositoriesInMemory();
    authenticateUserService = new AuthenticateUserService(userRepository);
    createUserService = new CreateUserService(userRepository);

    const user0ToCreate = {
      name: "user0",
      email: "user_0@test.com",
      password: "password123",
      avatar: "https://github.com/user0.png",
    };

    const user1ToCreate = {
      name: "user1",
      email: "user_1@test.com",
      password: "password123",
      avatar: null,
    };

    await createUserService.execute(user0ToCreate);
    await createUserService.execute(user1ToCreate);
  });

  it("Should be able to authenticate user", async () => {
    const user0Data = {
      email: "user_0@test.com",
      password: "password123",
    };

    const user1Data = {
      email: "user_1@test.com",
      password: "password123",
    };

    const token0 = await authenticateUserService.execute(user0Data);
    const token1 = await authenticateUserService.execute(user1Data);

    expect(token0).not.toEqual("Email/Senha incorretos! Tente Novamente.");

    expect(token1).not.toEqual("Email/Senha incorretos! Tente Novamente.");
  });

  it("Should not be able to authenticate a user with an invalid email address", async () => {
    const user0Data = [
      {
        email: "user_0test.com",
        password: "password123",
      },
      {
        email: "user_0@testcom",
        password: "password123",
      },
      {
        email: "user_0@test",
        password: "password123",
      },
    ];

    await expect(authenticateUserService.execute(user0Data[0])).rejects.toEqual(
      new Error("Email inválido! Tente novamente.")
    );

    await expect(authenticateUserService.execute(user0Data[1])).rejects.toEqual(
      new Error("Email inválido! Tente novamente.")
    );

    await expect(authenticateUserService.execute(user0Data[2])).rejects.toEqual(
      new Error("Email inválido! Tente novamente.")
    );
  });

  it("Should not be able to authenticate a user with invalid credentials", async () => {
    /**
     * Invalid email.
     */
    const user0Data = {
      email: "user_1337@test.com",
      password: "password123",
    };

    /**
     * Invalid password.
     */
    const user1Data = {
      email: "user_1@test.com",
      password: "password456",
    };

    await expect(authenticateUserService.execute(user0Data)).rejects.toEqual(
      new Error("Email/Senha incorretos! Tente Novamente.")
    );

    await expect(authenticateUserService.execute(user1Data)).rejects.toEqual(
      new Error("Email/Senha incorretos! Tente Novamente.")
    );
  });
});
