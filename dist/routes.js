"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourses = void 0;
var CreateCoursesService_1 = __importDefault(require("./CreateCoursesService"));
function createCourses(request, response) {
    CreateCoursesService_1.default.execute({
        name: "NodeJS",
        duration: 10,
        educator: "Fab"
    });
    CreateCoursesService_1.default.execute({
        name: "React",
        educator: "Fabiano"
    });
    return response.send();
}
exports.createCourses = createCourses;
