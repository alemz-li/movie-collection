import { Router } from "express";
import * as collectionController from "../controllers/collection.controller.js";

const router = Router();

/* Public */
router.get("/", collectionController.getMovieHandler);
router.get("/:id", collectionController.getMovieByIdHandler);
router.get("/recent", collectionController.recentlyAddedHandler);
router.get("/info", collectionController.collectionInfoHandler);

/* Protected */
// # TODO: Protecte routes with access and refresh tokens
router.post("/", collectionController.addMovieHandler);
router.put("/:id", collectionController.updateMovieHandler);
router.delete("/:id", collectionController.deleteMovieHandler);

export default router;
