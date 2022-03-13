import { Application } from "express";
import expressBasicAuth from "express-basic-auth";

export class Security {
  public static setup(app: Application) {
    const pwd = process.env.ADMIN_PASSWORD || "admin";
    app.use(
      expressBasicAuth({
        challenge: true,
        users: { admin: pwd },
      })
    );
  }
}
