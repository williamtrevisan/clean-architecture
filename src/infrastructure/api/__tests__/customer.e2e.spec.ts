import request from "supertest";

import { app, sequelize } from "../express";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Customer name",
        address: {
          street: "Street name",
          number: 1,
          zip: "97500-000",
          city: "City name",
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Customer name");
    expect(response.body.address.street).toBe("Street name");
    expect(response.body.address.number).toBe(1);
    expect(response.body.address.zip).toBe("97500-000");
    expect(response.body.address.city).toBe("City name");
  });
});
