import express from "express";
import categoriesController from "./controller/categoriesController.js";
import { coursesController } from "./controller/coursesController.js";

const router = express.Router();

router.get("/categories", categoriesController.index);
router.get("/categories/:id", categoriesController.show);

router.get("/courses/featured", coursesController.featured);
router.get("/courses/newest", coursesController.newest);
router.get("/courses/search", coursesController.search);
router.get('/courses/:id', coursesController.show)

export { router };
