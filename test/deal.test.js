const Deal = require("../util/deal");
const request = require("supertest");
const app = require("../app");

test("should get deal item", async () => {
  await request(app)
    .get("/api/deals/:deal_id/:deal_name")
    .expect("Content-Type", /json/)
    .expect(200)
});
