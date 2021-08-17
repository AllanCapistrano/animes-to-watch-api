import { IUsersRepositories } from "../../repositories/interfaces/IUsersRepositories";
import { UsersRepositoriesInMemory } from "../../repositories/in-memory/UsersRepositoriesInMemory";
import { ForgotPasswordService } from "../../services/ForgotPasswordService";
import { CreateUserService } from "../../services/CreateUserService";

describe("Forgot password", () => {
  let userRepository: IUsersRepositories;
  let forgotPasswordService: ForgotPasswordService;
  let createUserService: CreateUserService;

  beforeAll(async () => {
    userRepository = new UsersRepositoriesInMemory();
    forgotPasswordService = new ForgotPasswordService(userRepository);
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

  it("Should be able to change user password.", async () => {
    const userData = {
      email: "user_1@test.com",
      newPassword: "789456123",
    };

    const isPasswordUpdated = await forgotPasswordService.execute(userData);

    expect(isPasswordUpdated).toBeTruthy();
  });

  it("Should not be able to change user password with an invalid email address.", async () => {
    const userData = [
      {
        email: "user_0test.com",
        newPassword: "789456123",
      },
      {
        email: "user_0@test",
        newPassword: "789456123",
      },
      {
        email: "user_0@test.",
        newPassword: "789456123",
      },
    ];

    await expect(forgotPasswordService.execute(userData[0])).rejects.toEqual(
      new Error("Email inválido! Tente novamente.")
    );

    await expect(forgotPasswordService.execute(userData[1])).rejects.toEqual(
      new Error("Email inválido! Tente novamente.")
    );

    await expect(forgotPasswordService.execute(userData[2])).rejects.toEqual(
      new Error("Email inválido! Tente novamente.")
    );
  });

  it("Should not be able to change a non-existent user's password.", async () => {
    const userData = {
      email: "not_a_user@example.com",
      newPassword: "password123",
    };

    await expect(forgotPasswordService.execute(userData)).rejects.toEqual(
      new Error("Usuário não encontrado! Verifique o email digitado.")
    );
  });
});
