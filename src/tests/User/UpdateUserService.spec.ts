import { compare } from "bcryptjs";

import { IUsersRepositories } from "../../repositories/interfaces/IUsersRepositories";
import { UsersRepositoriesInMemory } from "../../repositories/in-memory/UsersRepositoriesInMemory";
import { UpdateUserService } from "../../services/UpdateUserService";
import { CreateUserService } from "../../services/CreateUserService";
import { User } from "../../entities/User";

describe("Update user", () => {
  let userRepository: IUsersRepositories;
  let updateUserService: UpdateUserService;
  let createUserService: CreateUserService;
  let user: User;

  beforeAll(async () => {
    userRepository = new UsersRepositoriesInMemory();
    updateUserService = new UpdateUserService(userRepository);
    createUserService = new CreateUserService(userRepository);

    const userData = {
      name: "Test",
      email: "test@example.com",
      password: "password123",
      avatar: "https://github.com/testExample.png",
    };

    user = await createUserService.execute(userData);
  });

  it("Should be able to update user information.", async () => {
    const userData = {
      name: "Test new name",
      email: "new_email@example.com",
      password: "newpassword",
    };

    await updateUserService.execute({ ...user, ...userData });

    const passwordMatch = await compare("newpassword", user.password);

    expect(user.name).toBe("Test new name");

    expect(user.email).toBe("new_email@example.com");

    expect(user.avatar).toBe("https://github.com/testExample.png");

    expect(passwordMatch).toBeTruthy();
  });

  it("Should not be able to update user information with an invalid email address.", async () => {
    const userData = [
      {
        email: "new_emailexample.com",
      },
      {
        email: "new_email@examplecom",
      },
      {
        email: "new_email@example",
      },
    ];

    await expect(
      updateUserService.execute({ ...user, ...userData[0] })
    ).rejects.toEqual(new Error("Email inválido! Tente novamente."));

    await expect(
      updateUserService.execute({ ...user, ...userData[1] })
    ).rejects.toEqual(new Error("Email inválido! Tente novamente."));

    await expect(
      updateUserService.execute({ ...user, ...userData[2] })
    ).rejects.toEqual(new Error("Email inválido! Tente novamente."));
  });

  it("Should not be able to change a non-existent user's information.", async () => {
    /**
     * Fake user ID.
     */
    const userId = "cd14c727-727f-4b30-98f4-5858cf5e0727";

    const userData = {
      name: "Test new name",
      email: "new_email@example.com",
      password: "newpassword",
      avatar: null,
    };

    await expect(
      updateUserService.execute({ id: userId, ...userData })
    ).rejects.toEqual(new Error("Usuário não encontrado! Tente novamente."));
  });
});
