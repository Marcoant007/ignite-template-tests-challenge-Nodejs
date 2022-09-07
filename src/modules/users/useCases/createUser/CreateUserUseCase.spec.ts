import { CreateUserUseCase } from './CreateUserUseCase';
import { InMemoryUsersRepository } from './../../repositories/in-memory/InMemoryUsersRepository';
import { create } from 'domain';

let userRepositoryInMemory : InMemoryUsersRepository;
let createUserUseCase : CreateUserUseCase;;

describe("Create user", ()=> {

  beforeEach(()=> {
    userRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should be able to create a new user", async () => {
    const user = {
      name: "Marco Testezin",
      email: "marcoantnovo@testezin.com",
      password: "987645312"
    }

    await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password
    })

    const userCreated = await userRepositoryInMemory.findByEmail(user.email);
    expect(userCreated).toHaveProperty("id");
  })

})
