import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";

import { CustomerModel } from "../customer/db/sequelize/customer.model";

const app: Express = express();
app.use(express.json());

// eslint-disable-next-line import/no-mutable-exports
let sequelize: Sequelize;

async function setupDatabase() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  sequelize.addModels([CustomerModel]);

  await sequelize.sync();
}

setupDatabase();

export { app, sequelize };
