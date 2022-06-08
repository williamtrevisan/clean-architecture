// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";

import { app, sequelize } from "../../../express";

describe("List customer controller e2e test", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should list all customer", async () => {
    const customer1 = {
      name: "Customer name 1",
      address: {
        street: "Street name 1",
        number: 1,
        zip: "97500-000",
        city: "City name 1",
      },
    };
    const customer2 = {
      name: "Customer name 2",
      address: {
        street: "Street name 2",
        number: 1,
        zip: "97500-000",
        city: "City name 2",
      },
    };
    await request(app).post("/customers").send(customer1);
    await request(app).post("/customers").send(customer2);

    const response = await request(app).get("/customers").send();

    expect(response.status).toBe(200);
    expect(response.body.customers.length).toBe(2);
    expect(response.body.customers[0].id).toBeDefined();
    expect(response.body.customers[0].name).toBe(customer1.name);
    expect(response.body.customers[0].address.street).toBe(
      customer1.address.street
    );
    expect(response.body.customers[1].id).toBeDefined();
    expect(response.body.customers[1].name).toBe(customer2.name);
    expect(response.body.customers[1].address.street).toBe(
      customer2.address.street
    );
  });

  it("should list all customer and receive a xml response", async () => {
    const customer1 = {
      name: "Customer name 1",
      address: {
        street: "Street name 1",
        number: 1,
        zip: "97500-000",
        city: "City name 1",
      },
    };
    const customer2 = {
      name: "Customer name 2",
      address: {
        street: "Street name 2",
        number: 1,
        zip: "97500-000",
        city: "City name 2",
      },
    };
    await request(app).post("/customers").send(customer1);
    await request(app).post("/customers").send(customer2);

    const response = await request(app)
      .get("/customers")
      .set("Accept", "application/xml")
      .send();

    expect(response.status).toBe(200);
    expect(response.text).toContain('<?xml version="1.0" encoding="UTF-8"?>');
  });
});
