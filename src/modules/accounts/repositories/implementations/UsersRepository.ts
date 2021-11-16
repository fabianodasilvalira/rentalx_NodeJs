import { Repository, getRepository } from 'typeorm';

import { User } from '../../entities/User';
import { ICreateUserDTO } from '../../dtos/ICreateUsersDTO';
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>

    constructor(){
        this.repository = getRepository(User);
    }

    async create({id, name, email, driver_licence, password, avatar}: ICreateUserDTO): Promise<void> {
        
        const user = this.repository.create({
            id,
            name, 
            email, 
            driver_licence, 
            password,
            avatar,
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({ id });
        return user;
    }

}

export { UsersRepository };