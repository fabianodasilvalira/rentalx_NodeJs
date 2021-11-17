
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { Repository, getRepository } from 'typeorm';
import { Specification } from '../entities/Specifications';



interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            description,
            name
        });

        await this.repository.save(specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.findOne({ name });
        return specification;
    }
    
}

export { SpecificationsRepository }