import dayjs from "dayjs";

import { AppError } from '@shared/errors/AppError';
import { DaysDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CreateRentalUseCase } from "./createRentalUseCase";
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DaysDateProvider;

describe("Create Rentals", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DaysDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory, 
            dayjsDateProvider,
            carsRepositoryInMemory);
    });

    it(" should be able to create a new rental", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car Test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "1234",
            brand: "brand",
        });

        const rental =  await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");

    });

    it(" should NOT be able to create a new rental if there is another open to the same USER", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "1111",
            expected_return_date: dayAdd24Hours,
            user_id: "12345"   
        })
       
        await expect(createRentalUseCase.execute({
                user_id: "12345",
                car_id: "12121",
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppError(" Car is unavailable!"));
    });

    it(" should NOT be able to create a new rental if there is another open to the same CAR", async () => {
        
        await rentalsRepositoryInMemory.create({
            car_id: "test",
            expected_return_date: dayAdd24Hours,
            user_id: "12345"   
        })

        await expect(createRentalUseCase.execute({
                user_id: "321",
                car_id: "test",
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppError(" Car is unavailable!"));
    });
});