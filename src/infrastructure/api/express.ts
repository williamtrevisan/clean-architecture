import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";

import { CustomerModel } from "../customer/db/sequelize/customer.model";
import { ProductModel } from "../product/db/sequelize/product.model";
import { router } from "./routes";

const app: Express = express();
app.use(express.json());
app.use(router);

// eslint-disable-next-line import/no-mutable-exports
let sequelize: Sequelize;

async function setupDatabase() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  sequelize.addModels([CustomerModel, ProductModel]);

  await sequelize.sync();
}

setupDatabase();

export { app, sequelize };
