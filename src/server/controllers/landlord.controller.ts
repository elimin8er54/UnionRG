const { deletelandlords,getlandlords,getlandlordfull,updatelandlords } = require('../models/landlord.models');
import { Request, Response } from "express"
import type { MongoClient } from 'mongodb';





exports.getlandlord = (client: MongoClient) => {

  // Validate Request
  return (req: Request, res: Response): void => {

    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    getlandlords(req, client, ( data: any) => {

      if (!data.success) {
       
        res.status(500).send({
        data
        });
      } else 

      res.json(data);
    });
  };
}



exports.getlandlordfull = (client: MongoClient) => {

  // Validate Request
  return (req: Request, res: Response): void => {

    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    getlandlordfull(req, client, ( data: any) => {

      if (!data.success) {
       
        res.status(500).send({
        data
        });
      } else 

      res.json(data);
    });
  };
}


exports.updatelandlord = (client: MongoClient) => {

  // Validate Request
  return (req: Request, res: Response): void => {

    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    // Check database and sign in
    updatelandlords(req, client, ( data: any) => {

      if (!data.success) {
       
        res.status(500).send({
        data
        });
      } else 

      res.json(data);
    });
  };
}




exports.deletelandlord = (client: MongoClient) => {

  // Validate Request
  return (req: Request, res: Response): void => {

    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    // Check database and sign in
    deletelandlords(req, client, ( data: any) => {

      if (!data.success) {
       
        res.status(500).send({
        data
        });
      } else 

      res.json(data);
    });
  };
}