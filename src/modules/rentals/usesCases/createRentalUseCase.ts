import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IDateProvide } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import { inject, injectable } from 'tsyringe';

import { Rental } from '../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../repositories/IRentalsRepository';

dayjs.extend(utc);

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvide,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,

    ) { }

    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const minimumHour = 24;

        // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuario
        const carUnavailable = await this.rentalsRepository.findByOpenRentalByCar(car_id);

        if (carUnavailable) {
            throw new AppError(" Car is unavailable!");
        }

        // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo Carro
        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppError(" There´s a rental in progress for user!");
        }

        // O aluguel deve ter duração mínima de 24 hora

        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date
        );

        if (compare < minimumHour) {
            throw new AppError("Invalid return time!");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        await this.carsRepository.updateAvailable(car_id, false);
        
        return rental;

    }

}

export { CreateRentalUseCase };