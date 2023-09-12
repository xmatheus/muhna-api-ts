import { Router } from "express";

const router = Router();

router.get("/_ok", (_, res) => {
    res.send({ msg: "I'm ok" });
});

export default router;
