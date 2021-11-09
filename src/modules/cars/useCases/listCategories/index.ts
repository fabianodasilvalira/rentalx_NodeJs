import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { ListCategoriesController } from "./ListCategoriesController";

const categoriesRepository = null;

const listCategoryUseCase = new ListCategoriesUseCase(categoriesRepository);

const listCategoryController = new ListCategoriesController(listCategoryUseCase);

export { listCategoryController }