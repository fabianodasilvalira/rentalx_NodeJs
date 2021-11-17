import { ICreateUserDTO } from "../dtos/ICreateUsersDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
    create(data: ICreateUserDTO ): Promise<void>;
    findByEmail(email: string): Promise<User>
    findById(id: string): Promise<User>
}

export { IUsersRepository };