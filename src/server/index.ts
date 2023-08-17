import { MongoClient } from 'mongodb';
import type { Request, Response, NextFunction } from 'express';
import { updateMLS } from './helpers/mlsapi';

const express = require('express');
const path = require('path');
const compression = require('compression');
const mls = require('./routes/mls.route.ts');

const DAILY_TIME = 1000 * 60 * 60 * 24;
const app = express();
const uri = 'mongodb://localhost:27017/mls?retryWrites=true&w=majority&authSource=admin&keepAlive=true&poolSize=30&autoReconnect=true&socketTimeoutMS=360000&connectTimeoutMS=360000';

const client = new MongoClient(uri);
// Don't want to do anything before the connection to the database is established.
client.connect().then(() => {
  setInterval(() => { updateMLS(client); }, DAILY_TIME);

  app.use(compression());
  const port = 3001;

  app.use(express.urlencoded());
  app.use(express.json());
  app.use(express.static('dist'));
  app.use(express.static('public'));
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.append('Access-Control-Allow-Origin', ['http://localhost:3000']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
  });

  require('./routes/email.route')(app);
  mls(app, client);
  require("./routes/user.route")(app, client);
  require("./routes/setting.route")(app, client);
  require("./routes/landlord.route")(app, client);
  require("./routes/deal.route")(app, client);
  require("./routes/pdf.route")(app, client);

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(`${__dirname}../../../../dist/`, 'index.html'));
  });

  app.listen(port, () => {
  });
});
