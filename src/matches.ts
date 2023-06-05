import { Request, Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";
import setsRouter from "./sets.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.match.findMany({});
    res.status(200).json({ matches: result});
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newMatch = await prisma.match.create({ data: req.body });
    res.status(200).json({ newMatch, ok: true });
  })
);

export interface RequestWithMatchId extends Request {
  matchId: number;
}
router.use("/:id", async (req: RequestWithMatchId, res, next) => {
  const { id } = req.params;
  req.matchId = Number(id);
  next();
});

router.get(
  "/:id",
  errorChecked(async (req: RequestWithMatchId, res) => {
    const match = await prisma.match.findUniqueOrThrow({
      where: { id: req.matchId },
    });
    res.status(200).json(match);
  })
);

router.put(
  "/:id",
  errorChecked(async (req: RequestWithMatchId, res) => {
    const updatedMatch = await prisma.match.update({
      where: { id: req.matchId },
      data: req.body,
    });
    res.status(200).json(updatedMatch);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req: RequestWithMatchId, res) => {
    const deletedMatch = await prisma.match.delete({
      where: { id: req.matchId },
    });
    res.status(200).json(deletedMatch);
  })
);

router.use("/:id/sets", setsRouter);

export default router;
