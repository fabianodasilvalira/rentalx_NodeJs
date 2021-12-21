import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ProfileUserController } from "@modules/accounts/useCases/profileUserUseCase/ProfileUserController";

const usersRouters = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController;
const updateUserAvatarController = new UpdateUserAvatarController;
const profileUserController = new ProfileUserController;

usersRouters.post("/", createUserController.handle);

usersRouters.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle);

usersRouters.get("/profile",
    ensureAuthenticated,
    profileUserController.handle);

export { usersRouters };