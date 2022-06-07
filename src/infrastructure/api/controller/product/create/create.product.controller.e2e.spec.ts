// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";

import { app, sequelize } from "../../../express";

describe("Create product controller e2e test", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/products").send({
      name: "Product name",
      price: 10,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Product name");
    expect(response.body.price).toBe(10);
  });

  it("should not create a product", async () => {
    const response = await request(app)
      .post("/products")
      .send({ name: "Product name" });

    expect(response.status).toBe(500);
  });
});
