const supertest = require("supertest");
// app is supposed to point to the app.js file
const app = require("../app");

describe("Test spaceX APIs", () => {
  describe("Testing GET spaceX/getSpaceXData?category=... endpoint", () => {

    it("Should test for valid category param", (done) => {
      // Making GET Request
      supertest(app)
        .get("/spaceX/getSpaceXData?category=crew")
        .then((response) => {
          // Compare response with expectations
          expect(response.status).toBe(200);
          expect(response.body.result.data.length).toBeGreaterThan(0);
          done();
        });
    });

    it("Should test for valid category, id params", (done) => {
      // Making GET Request
      supertest(app)
        .get("/spaceX/getSpaceXData?category=crew&id=607b48da5a906a44023e08b9")
        .then((response) => {
          // Compare response with expectations
          expect(response.status).toBe(200);
          expect(response.body.result.data.length).toBeGreaterThan(0);
          done();
        });
    });

    it("Should test for valid category, limit params", (done) => {
      // Making GET Request
      supertest(app)
        .get("/spaceX/getSpaceXData?category=crew&limit=10")
        .then((response) => {
          // Compare response with expectations
          expect(response.status).toBe(200);
          expect(response.body.result.data.length).toBeGreaterThan(0);
          done();
        });
    });

    it("Should test for valid category, limit, pageNum params", (done) => {
      // Making GET Request
      supertest(app)
        .get("/spaceX/getSpaceXData?category=crew&limit=10&pageNum=2")
        .then((response) => {
          // Compare response with expectations
          expect(response.status).toBe(200);
          expect(response.body.result.data.length).toBeGreaterThan(0);
          done();
        });
    });

    it("Should test for valid category, limit, pageNum, sort key params", (done) => {
      // Making GET Request
      supertest(app)
        .get("/spaceX/getSpaceXData?category=crew&limit=10&pageNum=2&sortBy=name")
        .then((response) => {
          // Compare response with expectations
          expect(response.status).toBe(200);
          expect(response.body.result.data.length).toBeGreaterThan(0);
          done();
        });
    });

    it("Should test for valid category, limit, sort key, sort order params", (done) => {
      // Making GET Request
      supertest(app)
        .get("/spaceX/getSpaceXData?category=crew&limit=10&pageNum=2&sortBy=name&order=desc")
        .then((response) => {
          // Compare response with expectations
          expect(response.status).toBe(200);
          expect(response.body.result.data.length).toBeGreaterThan(0);
          done();
        });
    });

    it("Should respond with error HTTP status code and description and message for invalid query params", (done) => {
      // Making GET Request
      supertest(app)
        .get("/spaceX/getSpaceXData?category=crews")
        .then((response) => {
          // Compare response with expectations
          expect(response.status).toBe(500);
          expect(response.body).toHaveProperty("message");
          expect(response.body).toHaveProperty("description");
          done();
        });
    });

    it("Should respond with error HTTP status code and description and message for not passing query params", (done) => {
      // Making GET Request
      supertest(app)
        .get("/spaceX/getSpaceXData")
        .then((response) => {
          // Compare response with expectations
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("message");
          expect(response.body).toHaveProperty("description");
          done();
        });
    });
  });
});
