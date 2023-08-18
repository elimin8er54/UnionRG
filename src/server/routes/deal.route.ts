import type { Application } from 'express';
import type { MongoClient } from 'mongodb';

const { verifyToken } = require('../middleware/authJwt');
const { adminDealCheck } = require('../middleware/adminDealCheck');
const deal = require('../controllers/deal.controller');

module.exports = (app: Application, client: MongoClient) => {
  app.post('/api/getdealagents', verifyToken, deal.getdealagents(client));
  app.post('/api/getdeallist', verifyToken, deal.getdeallist(client));
  app.post('/api/deletedeal', verifyToken, adminDealCheck(client), deal.deletedeal(client));
  app.post('/api/updatedealbalance', verifyToken, adminDealCheck(client), deal.updatedealbalance(client));
  app.post('/api/updatedealinbound', verifyToken, adminDealCheck(client), deal.updatedealinbound(client));
  app.post('/api/updatedealoutbound', verifyToken, adminDealCheck(client), deal.updatedealoutbound(client));
  app.post('/api/getdealinbound', verifyToken, adminDealCheck(client), deal.getdealinbound(client));
  app.post('/api/getdealoutbound', verifyToken, adminDealCheck(client), deal.getdealoutbound(client));
  app.post('/api/updatedealclient', verifyToken, adminDealCheck(client), deal.updatedealclient(client));
  app.post('/api/updatedeallandlord', verifyToken, adminDealCheck(client), deal.updatedeallandlord(client));
  app.post('/api/getdealclient', verifyToken, adminDealCheck(client), deal.getdealclient(client));
  app.post('/api/updatedealstatus', verifyToken, adminDealCheck(client), deal.updatedealstatus(client));
  app.post('/api/getonedeal', verifyToken, adminDealCheck(client), deal.getonedeal(client));
  app.post('/api/createleaserenewal', verifyToken, adminDealCheck(client), deal.createleaserenewal(client));
};
