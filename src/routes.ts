import { Router } from "express";
import { accessControlMiddleware } from "./middlewares/access-control-middleware";
import ok from "./routes/ok";
import quiz from "./routes/quiz/";
import user from "./routes/user/";

const apiRouter = Router();

apiRouter.use(accessControlMiddleware);
apiRouter.use(ok);
apiRouter.use("/quiz", quiz);
apiRouter.use("/user", user);

export default apiRouter;
