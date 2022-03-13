import { Router } from "express";
import { checkRole } from "../../utils/checkRoles";
import { UserService } from "../application/userService";

export class UserController {
  public routers: Router[];

  constructor() {
    this.routers = [];
    this.routers.push(this.getAllUsersRouter());
  }

  /**
   * @openapi
   * tags:
   *  - name: User
   *    description: User
   * /user:
   *   get:
   *    tags:
   *      - User
   *    description: get all users
   *    responses:
   *       200:
   *         description: return all users from database.
   *         content:
   *          application/json:
   *           schema:
   *            type: array
   *            items:
   *              $ref: '#/components/schemas/User'
   *
   */
  getAllUsersRouter(): Router {
    const router = Router();
    const service = new UserService();
    router.get("/user",checkRole, async (req, res) => {
      const users = await service.findAllUsers();
      res.status(200).send(users);
    });
    return router;
  }
}
