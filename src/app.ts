import compression from "compression";
import express from "express";
import http from "http";
import morgan from "morgan";
import errorHandler from "./middlewares/error-handler";
import routes from "./routes";

const app = express();

// Set Morgan Logger
if (process.env.NODE_ENV === "development") {
    app.use(
        morgan(
            "[INFO] - :method - :url :remote-addr [:date[clf]] - STATUS :status - :response-time ms"
        )
    );
}

app.disable("x-powered-by");

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api", routes);

app.use(errorHandler);

export default http.createServer(app);
