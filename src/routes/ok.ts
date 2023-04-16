import { Router } from "express";

const router = Router();

router.get("/_ok", (_, res) => {
    res.send("I'm ok");
});

export default router;
