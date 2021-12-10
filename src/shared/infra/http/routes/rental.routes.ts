import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/usesCases/createRental/createRentalController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { DevolutionRentalController } from "@modules/rentals/usesCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/usesCases/listRentalByUser/ListRentalsByUserController";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
    "/devolution/:id", 
    ensureAuthenticated, 
    devolutionRentalController.handle
    );
    
rentalRoutes.get("/user", ensureAuthenticated, listRentalsByUserController.handle);


export { rentalRoutes };

