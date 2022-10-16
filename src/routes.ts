import { Router } from "express";
import { accessControlMiddleware } from "./middlewares/access-control-middleware";
import mainRoute from "./routes/index";

const apiRouter = Router();

apiRouter.use(accessControlMiddleware);
apiRouter.use(mainRoute);

export default apiRouter;
