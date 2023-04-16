import chai from "chai";
import app from "../../app";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

const expect = chai.expect;

describe("GET /_ok", () => {
    it("should return status 200", async () => {
        const response = await chai.request(app).get("/api/_ok");
        const expectedStatus = 200;
        expect(response).to.have.status(expectedStatus);
    });
});
