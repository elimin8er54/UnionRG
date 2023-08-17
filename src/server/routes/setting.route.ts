const { verifyToken } = require("../middleware/authJwt");
const setting = require("../controllers/setting.controller");
const { photoFeatured, photoSlides } = require('../helpers/photoengine')
const { adminCheck, passedAdminCheck } = require("../middleware/adminCheck");
const featured = photoFeatured();
const slides = photoSlides();

import type { MongoClient } from 'mongodb';
import type { Application } from 'express';


module.exports = function (app: Application, client: MongoClient) {


  app.post("/api/addslide", verifyToken, adminCheck(client), slides.single('src'), setting.updateslide(client));
  //No need to auth getting slides since the client will see them anyways
  app.post("/api/getallslides", setting.getallslides(client));
  app.post("/api/deleteslide", verifyToken, adminCheck(client), setting.deleteslide(client));

  app.post("/api/updatefeatured", verifyToken, adminCheck(client), featured.single('src'), setting.updatefeatured(client));
  app.post("/api/getfeatured", verifyToken, adminCheck(client), setting.getfeatured(client));
  app.post("/api/getmanyfeatured", setting.getmanyfeatured(client));


};

