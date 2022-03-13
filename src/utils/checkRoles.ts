import { NextFunction, Request, Response } from "express";


const checkRole = (req: Request, res: Response, next: NextFunction) => {
  const test: any = req.authInfo;
  if (test.checkScope("immune!t126872.Mentee")) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
};

export { checkRole };
