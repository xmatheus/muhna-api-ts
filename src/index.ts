import app from "./app";
import * as Mongo from "./database/mongo";
import { prismaClient } from "./database/prismaClient";

const SERVER_PORT = parseInt(process.env.PORT || "") || 3001;

export const runServer = async () => {
    await Mongo.connect();

    app.listen(SERVER_PORT, "::", () => {
        console.log(`API http server running http://localhost:${SERVER_PORT}/`);
    });
};

runServer();

async function gracefullyShutdown(signal: string) {
    console.log(`=> Received signal to terminate: ${signal}`);

    await Mongo.disconnect();
    await prismaClient.$disconnect();

    app.close(function (err) {
        if (err) {
            console.error("There was an error", err.message);
            process.exit(1);
        } else {
            console.log("http server closed successfully. Exiting!");
            process.exit(0);
        }
    });
}

process.on("SIGINT", gracefullyShutdown);
process.on("SIGTERM", gracefullyShutdown);
