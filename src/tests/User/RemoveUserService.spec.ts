import { IUsersRepositories } from "../../repositories/interfaces/IUsersRepositories";
import { UsersRepositoriesInMemory } from "../../repositories/in-memory/UsersRepositoriesInMemory";
import { CreateUserService } from "../../services/CreateUserService";
import { RemoveUserService } from "../../services/RemoveUserService";
import { User } from "../../entities/User";

describe("Remove a user", () => {
  let userRepository: IUsersRepositories;
  let createUserService: CreateUserService;
  let removeUserService: RemoveUserService;
  let users: User[] = [];

  beforeAll(async () => {
    userRepository = new UsersRepositoriesInMemory();
    createUserService = new CreateUserService(userRepository);
    removeUserService = new RemoveUserService(userRepository);

    const userData = [
      {
        name: "First User",
        email: "first@user.com",
        password: "12345678",
        avatar: "https://google.com/images/user",
      },
      {
        name: "Second User",
        email: "second@user.com",
        password: "789456123",
      },
      {
        name: "Third User",
        email: "third@user.com",
        password: "password456",
      },
    ];

    users[0] = await createUserService.execute(userData[0]);
    users[1] = await createUserService.execute(userData[1]);
    users[2] = await createUserService.execute(userData[2]);
  });

  it("Should be able to remove a user", async () => {
    await expect(removeUserService.execute({ id: users[1].id })).toBeTruthy();
  });

  it("Should not be able to remove a non-existent user", async () => {
    await removeUserService.execute({ id: users[0].id });

    await expect(
      removeUserService.execute({ id: users[0].id })
    ).rejects.toEqual(new Error("Usuário inválido! Tente novamente."));
  });
});
