import app from "./app";
import * as Mongo from "./database/mongo";

const SERVER_PORT = parseInt(process.env.PORT || "") || 3001;

export const runServer = async () => {
    await Mongo.connect();

    app.listen(SERVER_PORT, "::", () => {
        if (process.env.NODE_ENV !== "production") {
            console.log(
                `API http server running http://localhost:${SERVER_PORT}/`
            );
        }
    });
};

runServer();
