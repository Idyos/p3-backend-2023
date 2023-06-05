import { Router } from "express";
import { errorChecked } from "./utils.js";
import prisma from "./prisma-client.js";
import { RequestWithMatchId } from "./matches.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req: RequestWithMatchId, res) => {
    const set = await prisma.set.findMany({
      where: { matchId: req.matchId },
    });
    res.status(200).json(set);
  })
);

router.post(
  "/",
  errorChecked(async (req: RequestWithMatchId, res) => {
    const newSet = await prisma.user.create({
      data: { ...req.body, forumId: req.matchId },
    });
    res.status(200).json(newSet);
  })
);

export default router;
