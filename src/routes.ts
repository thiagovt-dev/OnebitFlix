import express from "express";
import categoriesController from "./controller/categoriesController.js";
import { coursesController } from "./controller/coursesController.js";
import { episodesController } from "./controller/episodesController.js";
import { authController } from "./controller/authController.js";
import { ensureAuth, ensureAuthViaQuery } from "./middlewares/auth.js";
import { favoritesController } from "./controller/favoritesController.js";
import { likesController } from "./controller/likesController.js";
import { usersController } from "./controller/usersController.js";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.get("/categories", ensureAuth, categoriesController.index);
router.get("/categories/:id", ensureAuth, categoriesController.show);

router.get("/courses/featured", ensureAuth, coursesController.featured);
router.get("/courses/newest", coursesController.newest);
router.get("/courses/popular", ensureAuth, coursesController.popular)
router.get("/courses/search", ensureAuth, coursesController.search);
router.get("/courses/:id", ensureAuth, coursesController.show);

router.get("/episodes/stream", ensureAuthViaQuery, episodesController.stream);

router.get("/episodes/:id/watchTime", ensureAuth, episodesController.getWatchTime)
router.post("/episodes/:id/watchTime", ensureAuth, episodesController.setWatchTime)

router.get("/favorites", ensureAuth, favoritesController.index);
router.post("/favorites", ensureAuth, favoritesController.save);
router.delete("/favorites", ensureAuth, favoritesController.delete);

router.post("/likes", ensureAuth, likesController.save);
router.delete("/likes", ensureAuth, likesController.delete);

router.get("/users/current/watching", ensureAuth, usersController.watching)
router.get("/users/current/", ensureAuth, usersController.show)
router.put("/users/current/", ensureAuth, usersController.update)
router.put("/users/current/password", ensureAuth, usersController.updatePass)

export { router };