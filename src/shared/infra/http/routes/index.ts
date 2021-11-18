import { Router  } from "express";
import { authenticateRouters } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRouters } from "./users.routes";
import { carsRoutes } from "./cars.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRouters);
router.use("/cars", carsRoutes);
router.use(authenticateRouters);

export { router };

