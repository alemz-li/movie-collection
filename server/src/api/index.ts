import express from "express";
import { MessageResponse } from "../types/types";

const router = express.Router();

router.get<Record<string, never>, MessageResponse>("/", (_req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

export default router;
