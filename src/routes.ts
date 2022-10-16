import { Router } from "express";
import { accessControlMiddleware } from "./middlewares/access-control-middleware";
import healthz from "./routes/healthz";

const apiRouter = Router();

apiRouter.use(accessControlMiddleware);
apiRouter.use(healthz);

export default apiRouter;
