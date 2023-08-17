const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");
const auth = require("../config/auth.config");
import { Response, Request, NextFunction } from 'express';
const ObjectID = require('mongodb').ObjectID;
import type { MongoClient } from 'mongodb';


exports.adminDealCheck = (client: MongoClient) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    try {
      const database = client.db();
      let query: {} = { _id: { $eq: ObjectID(req.body.user_id) } };

      const users = await database.collection("users").find(
        query
      ).limit(1).toArray();
      let dealVals: any = await database.collection("deals").find({ _id: ObjectID(req.body.dealID) }).toArray();


      if (dealVals.dealUserID === req.body.user_id || users[0].isAdmin || typeof dealVals.dealUserID === "undefined") {

        next();
      }
    } catch (err) {
    }



  }
}

//This is for when we want the client to know if the user is an admin and not just the server
//Example hiding certain menus that a on admin user wouldnt be able to do anything with anyways
//Add after adminCheck

exports.passedAdminDealCheck = (req: Request, res: Response) => {
  res.json({ success: true });
}