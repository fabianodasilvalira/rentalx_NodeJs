import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { ListCategoriesController } from "./ListCategoriesController";

const categoriesRepository = CategoriesRepository.getInstance();

const listCategoryUseCase = new ListCategoriesUseCase(categoriesRepository);

const listCategoryController = new ListCategoriesController(listCategoryUseCase);

export { listCategoryController }