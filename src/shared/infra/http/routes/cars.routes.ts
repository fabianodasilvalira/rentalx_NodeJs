import  multer from "multer";
import { Router } from "express";

import uploadConfig from "@config/upload";
import { CreateCarsSpecificationController } from "@modules/cars/useCases/createCarsSpecification/CreateCarsSpecificationControllers";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import { CreateCarController } from "@shared/container/CreateCarController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const upload = multer(uploadConfig.upload("./tmp/cars"));

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarsSpecificationController = new CreateCarsSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.post("/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post("/specifications/:id",
    ensureAuthenticated,
    ensureAdmin,
    createCarsSpecificationController.handle);

carsRoutes.post("/images/:id",
    ensureAuthenticated,
    ensureAdmin, 
    upload.array("images"),
    uploadCarImagesController.handle);

export { carsRoutes };