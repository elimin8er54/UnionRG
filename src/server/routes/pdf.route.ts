const { verifyToken, passedCheck } = require("../middleware/authJwt");
const pdf = require("../controllers/pdf.controller");
import type { MongoClient } from 'mongodb';
import type { Application } from 'express';


module.exports = function (app: Application, client: MongoClient) {

  app.post("/api/pdflease", verifyToken, pdf.pdflease(client));
  app.post("/api/pdfmoveinclient", verifyToken, pdf.pdfmoveinclient(client));
  app.post("/api/pdfmoveinlandlord", verifyToken, pdf.pdfmoveinlandlord(client));
  app.post("/api/pdflandlordinvoice", verifyToken, pdf.pdflandlordinvoice(client));

};

