const email = require("../controllers/email.controller");
import type { Application } from 'express';
module.exports = function (app: Application) {
  app.post("/email/contactus", email.sendcontactemail);
};

