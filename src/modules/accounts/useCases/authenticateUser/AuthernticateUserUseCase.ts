
import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";



interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {name: string; email: String, },
    token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) {}

    async execute({email, password}: IRequest):Promise<IResponse>{
        // se usuario existe
        const user = await this.usersRepository.findByEmail(email);
        if(!user){
            throw new AppError("Email or password incorrect!");
        }

        // se a senha esta correta
        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch){
            throw new AppError("Email or password incorrect!");
        }

        // gerar jsonwebtoken
        const token = sign({}, "fe02f5eccec2bc201d39b5121d1d84c6", {
            subject: user.id, 
            expiresIn: "1d"
        });

        const rokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            }
        }

        return rokenReturn;

    }
}

export {AuthenticateUserUseCase};