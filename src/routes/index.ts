import { Router } from "express";

const router = Router();

router.get("/_healthz", (_, res) => {
    res.send("I'm healthy");
});

export default router;
