// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";

import { app, sequelize } from "../../../express";

describe("List product controller e2e test", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should list all products", async () => {
    const product1 = {
      name: "Product name 1",
      price: 10,
    };
    const product2 = {
      name: "Product name 2",
      price: 30,
    };
    await request(app).post("/products").send(product1);
    await request(app).post("/products").send(product2);

    const response = await request(app).get("/products").send();

    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(2);
    expect(response.body.products[0].id).toBeDefined();
    expect(response.body.products[0].name).toBe(product1.name);
    expect(response.body.products[0].price).toBe(product1.price);
    expect(response.body.products[1].id).toBeDefined();
    expect(response.body.products[1].name).toBe(product2.name);
    expect(response.body.products[1].price).toBe(product2.price);
  });
});
