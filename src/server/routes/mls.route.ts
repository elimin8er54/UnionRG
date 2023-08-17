const mls = require("../controllers/mls.controller");
import type { MongoClient } from 'mongodb';
import type { Application } from 'express';


module.exports = function (app: Application, client: MongoClient) {
    app.post("/mls/getproperties", mls.getProperties(client));
    app.post("/mls/gettowns", mls.getTowns(client));
    app.post("/mls/propertyinfo", mls.getPropertyInfo(client));
};
