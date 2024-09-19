import express from "express";
import { MessageResponse } from "../types/types";

import collectionRoutes from "./routes/collection.routes";

const router = express.Router();

router.get<Record<string, never>, MessageResponse>("/", (_req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/collection", collectionRoutes);

export default router;
