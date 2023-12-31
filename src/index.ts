import app from "./app";
import * as Mongo from "./database/mongo";

const SERVER_PORT = parseInt(process.env.PORT || "") || 3001;

export const runServer = async () => {
    await Mongo.connect();

    app.listen(SERVER_PORT, "::", () => {
        console.log(`API http server running http://localhost:${SERVER_PORT}/`);
    });
};

runServer();
