// eslint-disable-next-line import/no-import-module-exports
import type { MongoClient } from 'mongodb';
// eslint-disable-next-line import/no-import-module-exports
import type { Application } from 'express';

const { verifyToken, passedCheck } = require('../middleware/authJwt.ts');
const { adminCheck, passedAdminCheck } = require('../middleware/adminCheck.ts');
const user = require('../controllers/user.controller.ts');
const { photoHeadshot } = require('../helpers/photoengine.ts');

const headshot = photoHeadshot();

module.exports = (app: Application, client: MongoClient) => {
  app.post('/api/signin', user.signin(client));
  app.post('/api/deleteagent', verifyToken, adminCheck(client), user.deleteagents(client));
  app.get('/api/getaboutagents', user.getaboutagents(client));
  app.post('/api/getagents', verifyToken, adminCheck(client), user.getagents(client));
  app.post('/api/getagentfull', verifyToken, adminCheck(client), user.getagentfull(client));
  app.post('/api/updateagentfull', verifyToken, adminCheck(client), headshot.single('src'), user.updateagent(client));
  app.post('/api/jwtauth', verifyToken, passedCheck);
  app.post('/api/admincheck', verifyToken, adminCheck(client), passedAdminCheck);
  app.post('/api/getcurrentuser', verifyToken, user.getcurrentuser(client));
};
