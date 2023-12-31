import { Router } from "express";
import quiz from "./quiz";
import quizv2 from "./quiz-v2";

const router = Router();

router.use("/v1", quiz);
router.use("/v2", quizv2);

export default router;
