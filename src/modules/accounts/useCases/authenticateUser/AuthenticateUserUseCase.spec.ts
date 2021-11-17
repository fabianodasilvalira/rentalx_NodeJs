import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUsersDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthernticateUserUseCase';




describe("Authenticate User", () => {

    let authenticateUserUseCase: AuthenticateUserUseCase;
    let usersRepositoryInMemory: UsersRepositoryInMemory;
    let createUserUseCase: CreateUserUseCase;

    beforeEach(() => {

        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

    });

    it("should be able to authenticate an user", async () => {

        const user: ICreateUserDTO = {
            driver_licence: "00123",
            email: "user@test.com",
            password: "1234",
            name: "User Test",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "1234",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate witch incorrect PASSWORD", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_licence: "12345",
                email: "user@test.com",
                password: "1234",
                name: "User Test Error",
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: "user@test.com",
                password: "incorrectPassword",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});