import { DaysDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUsersDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthernticateUserUseCase';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';





describe("Authenticate User", () => {

    let authenticateUserUseCase: AuthenticateUserUseCase;
    let usersRepositoryInMemory: UsersRepositoryInMemory;
    let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
    let dateProvider: DaysDateProvider;


    let createUserUseCase: CreateUserUseCase;

    beforeEach(() => {

        usersRepositoryInMemory = new UsersRepositoryInMemory();
        userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DaysDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            userTokensRepositoryInMemory,
            dateProvider);
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

    it("should not be able to authenticate an nonexistent user", async () => {
        await expect(authenticateUserUseCase.execute({
            email: "false@email.com",
            password: "1234",
        })
        ).rejects.toEqual(new AppError("Email or password in correctF"));
    });

    it("should not be able to authenticate witch incorrect PASSWORD", async () => {
        const user: ICreateUserDTO = {
            driver_licence: "9999",
            email: "user@user.com",
            password: "1234",
            name: "User Test Error",
        };

        await createUserUseCase.execute(user);

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: user.password,
            })
        ).rejects.toEqual(new AppError("Email or password in correctF2!"));
    });
});