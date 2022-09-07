import { ICreateUserDTO } from './../createUser/ICreateUserDTO';
import { CreateUserUseCase } from './../createUser/CreateUserUseCase';
import { InMemoryUsersRepository } from './../../repositories/in-memory/InMemoryUsersRepository';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate  user", async () => {
    const user: ICreateUserDTO = {
        name: "marcoteste",
        email: "marcotestezin@gmail.com",
        password: "1234567"
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({email : user.email, password: user.password});
    expect(result).toHaveProperty("token")
  })
})
