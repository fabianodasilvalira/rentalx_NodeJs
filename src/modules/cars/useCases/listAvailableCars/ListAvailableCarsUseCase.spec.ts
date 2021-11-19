import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    })

    it("should be able to list all available cars", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Audi_1",
            description: "carro bonito Audi_1",
            daily_rate: 240,
            license_plate: "DDD555",
            fine_amount: 200,
            brand: "Audi1",
            category_id: "category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);

    });

    it("should be able to list all available cars by NAME", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Audi_2",
            description: "carro bonito Audi_1",
            daily_rate: 240,
            license_plate: "DDD555",
            fine_amount: 200,
            brand: "Audi2",
            category_id: "category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Audi_2",
        });

        expect(cars).toEqual([car]);

    })

    it("should be able to list all available cars by BRAND", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Audi_3",
            description: "carro bonito Audi_1",
            daily_rate: 240,
            license_plate: "DDD555",
            fine_amount: 200,
            brand: "Audi2",
            category_id: "category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Audy2",
        });

        expect(cars).toEqual([car]);

    })

    it("should be able to list all available cars by CATEGORY_ID", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Audi_4",
            description: "carro bonito Audi_1",
            daily_rate: 240,
            license_plate: "DDD555",
            fine_amount: 200,
            brand: "Audi2",
            category_id: "category_id1"
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "category_id1",
        });

        expect(cars).toEqual([car]);

    })
})