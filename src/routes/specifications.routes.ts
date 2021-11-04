import { Router } from "express";
import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { CreateEspecificationService } from "../modules/cars/services/CreateEspecificationService";

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (request, response) => {
    const { name, description } = request.body;
    const createEspecificationService = new CreateEspecificationService(specificationsRepository);

    createEspecificationService.execute({name, description});

    return response.status(201).send();
});

export { specificationsRoutes };