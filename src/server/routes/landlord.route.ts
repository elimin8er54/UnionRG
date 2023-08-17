const { verifyToken, passedCheck } = require("../middleware/authJwt");
const { adminCheck, } = require("../middleware/adminCheck");
const landlord = require("../controllers/landlord.controller");
import type { MongoClient } from 'mongodb';
import type { Application } from 'express';


module.exports = function (app: Application, client: MongoClient) {
  
  app.post("/api/deletelandlord",verifyToken, landlord.deletelandlord(client));
  app.post("/api/getlandlords",verifyToken, landlord.getlandlord(client));
  app.post("/api/getlandlordfull",verifyToken, landlord.getlandlordfull(client));
  app.post("/api/updatelandlordfull",verifyToken, landlord.updatelandlord(client));
  
};

