import app from "./app";

const DBConfig = () => {
    return {
        connect: async () => {}
    }
}

const SERVER_PORT = 3001;

export const runServer = async () => {
    const dbConfig = DBConfig();
    await dbConfig.connect();

    app.listen(SERVER_PORT, "::", () => {
        if (process.env.NODE_ENV !== "production") {
            console.log(`API http server running on port ${SERVER_PORT}`);
        }
    });

};

runServer();