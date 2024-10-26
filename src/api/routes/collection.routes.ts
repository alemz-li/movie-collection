import { Router } from "express";
import * as collectionController from "../controllers/collection.controller";
import { validateRequest } from "../middlewares";
import {
  collectionQuerySchema,
  createMovieSchema,
} from "../schemas/collection.schema";

const router = Router();

/* Public */
router.get(
  "/",
  validateRequest({
    query: collectionQuerySchema,
  }),
  collectionController.getMovieHandler,
);
router.get("/recent", collectionController.recentlyAddedHandler);
router.get("/info", collectionController.collectionInfoHandler);
router.get("/:id", collectionController.getMovieByIdHandler);

/* Protected */
// # TODO: Protecte routes with access and refresh tokens
router.post(
  "/",
  validateRequest({
    body: createMovieSchema,
  }),
  collectionController.addMovieHandler,
);
router.put("/:id", collectionController.updateMovieHandler);
router.delete("/:id", collectionController.deleteMovieHandler);

export default router;
