import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import { Routes } from "./routes";
import { CustomLogger } from "./logger/logger";
import { Security } from "./security/security";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(CustomLogger.http);

if (process.env.ENV === undefined) {
  config();
}

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      host: "localhost:3000",
    },
  },
  apis: ["./src/**/infra/*Controller.ts", "./src/user/domain/userDTO.ts"],
};

Security.setup(app);
Routes.run(app);
const openapiSpecification = swaggerJSDoc(options);
app.use("/api-docs", serve, setup(openapiSpecification));

try {
  app.listen(process.env.PORT, () => {
    CustomLogger.info(`Server is running on port ${process.env.PORT}`);
  });
} catch (error) {
  CustomLogger.error(`Server is not running on port ${process.env.PORT}`);
}
