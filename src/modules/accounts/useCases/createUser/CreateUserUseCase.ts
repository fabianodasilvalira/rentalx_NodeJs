import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import { ICreateUserDTO } from "../../dtos/ICreateUsersDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ 
        name, 
        email, 
        password, 
        driver_licence 
    }: ICreateUserDTO): Promise<void> {

        const userAlreadExists = await this.usersRepository.findByEmail(email);

        if (userAlreadExists){
            throw new Error("User already exists!");
        }
        
        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_licence
        });
    }
}

export { CreateUserUseCase }