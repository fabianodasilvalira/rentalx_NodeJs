import dayjs from "dayjs";

import { AppError } from '@shared/errors/AppError';
import { RentalsRepositoryInMemory } from "../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./createRental.UseCase"

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rentals", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
    });

    it(" should be able to create a new rental", async () => {
        const rental =  await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "12121",
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");

    });

    it(" should NOT be able to create a new rental if there is another open to the same user", async () => {
        
        expect(async ()=>{
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "12121",
                expected_return_date: dayAdd24Hours,
            });
            
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "12121",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it(" should NOT be able to create a new rental if there is another open to the same car", async () => {
        
        expect(async ()=>{
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "test",
                expected_return_date: dayAdd24Hours,
            });
            
            await createRentalUseCase.execute({
                user_id: "321",
                car_id: "test",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});