import { Router } from "express";
import { accessControlMiddleware } from "./middlewares/access-control-middleware";
import healthz from "./routes/healthz";
import quiz from "./routes/quiz";

const apiRouter = Router();

apiRouter.use(accessControlMiddleware);
apiRouter.use(healthz);
apiRouter.use("/quiz", quiz);

export default apiRouter;
