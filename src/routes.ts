import express from "express";
import categoriesController from "./controller/categoriesController.js";
import { coursesController } from "./controller/coursesController.js";
import { episodesController } from "./controller/episodesController.js";
import { authController } from "./controller/authController.js";
import { ensureAuth, ensureAuthViaQuery } from "./middlewares/auth.js";
import { favoritesController } from "./controller/favoritesController.js";

const router = express.Router();

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.get("/categories",ensureAuth, categoriesController.index);
router.get("/categories/:id",ensureAuth, categoriesController.show);

router.get("/courses/featured",ensureAuth, coursesController.featured);
router.get("/courses/newest", coursesController.newest);
router.get("/courses/search",ensureAuth, coursesController.search);
router.get("/courses/:id",ensureAuth, coursesController.show);

router.get("/episodes/stream",ensureAuthViaQuery, episodesController.stream);

router.post("/favorites", ensureAuth, favoritesController.save);

export { router };
