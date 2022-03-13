import { Application, Router } from "express";
import { HelloController } from "./hello-object/infra/helloController";
import { UserController } from "./user/infra/userController";

export class Routes {
  public static run(app: Application): void {
    app.use(new UserController().routers);
  }
}
