import express from "express";
import categoriesController from "./controller/categoriesController.js";
import { coursesController } from "./controller/coursesController.js";
import { episodesController } from "./controller/episodesController.js";
import { authController } from "./controller/authController.js";

const router = express.Router();

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.get("/categories", categoriesController.index);
router.get("/categories/:id", categoriesController.show);

router.get("/courses/featured", coursesController.featured);
router.get("/courses/newest", coursesController.newest);
router.get("/courses/search", coursesController.search);
router.get("/courses/:id", coursesController.show);

router.get("/episodes/stream", episodesController.stream);

export { router };
