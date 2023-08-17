const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");
const auth = require("../config/auth.config");
import { Response, Request, NextFunction } from 'express';



exports.verifyToken = (req: any, res: Response, next: NextFunction): any => {
  //IF YOU CHANGE THIS MAKE SURE TO CHANGE THE CLIENT CHECK TOO. TokenCheck.tsx
const EXPIRE_IN = 60 * 15;
  const header = req.headers["authorization"];
  let token;
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    token = bearer[1];


  } else {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, config.secret, (err: Error, decoded: any) => {
   
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
        success: false,
      });
    } else {
      //Reset the expire timer for the token
    
      const token = jwt.sign({ user_id: decoded.user_id }, auth.secret, {
        expiresIn: EXPIRE_IN,
      });
     
      req.body['token']=token;
      req.body['user_id']=decoded.user_id;
      req['user_id']=decoded.user_id;
      next();
    }
  });
}

exports.passedCheck = (req: Request, res: Response) => {
  res.json({ success: true,token:req.body.token});
}