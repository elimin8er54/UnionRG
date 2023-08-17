const { updateslide, updatefeatured,getfeatured,getmanyfeatured,deleteslide,getallslides } = require('../models/setting.models');
import { Request, Response } from "express"
import type { MongoClient } from 'mongodb';


exports.deleteslide = (client: MongoClient) => {

  // Validate Request
  return (req: Request, res: Response): void => {

    if (!req.body) {
      res.status(400).send({ message: 'Error empty body' });
    }

    // Check database and sign in
    deleteslide(req, client, ( data: any) => {

      if (!data.success) {
       
        res.status(500).send({
        data
        });
      } else 

      res.json(data);
    });
  };
}

exports.getallslides = (client: MongoClient) => {

  // Validate Request
  return (req: Request, res: Response): void => {

    if (!req.body) {
      res.status(400).send({ message: 'Error empty body' });
    }

    // Check database and sign in
    getallslides(req, client, ( data: any) => {

      if (!data.success) {
       
        res.status(500).send({
        data
        });
      } else 

      res.json(data);
    });
  };
}


exports.updateslide = (client: MongoClient) => {

  // Validate Request
  return (req: Request, res: Response): void => {

    if (!req.body) {
      res.status(400).send({ message: 'Could not upload' });
    }

    // Check database and sign in
    updateslide(req, client, ( data: any) => {

      if (!data.success) {
       
        res.status(500).send({
        data
        });
      } else 

      res.json(data);
    });
  };
}


exports.updatefeatured = (client: MongoClient) => {

  // Validate Request
  return (req: Request, res: Response): void => {

    if (!req.body) {
      res.status(400).send({ message: 'Could not upload' });
    }

    // Check database and sign in
    updatefeatured(req, client, ( data: any) => {

      if (!data.success) {
        res.status(500).send(data);
      } else {

      res.json(data);
      }
    });
  };
}
exports.getfeatured = (client: MongoClient) => {

  // Validate Request
  return (req: Request, res: Response): void => {

    if (!req.body) {
      res.status(400).send({ message: 'Error empty body' });
    }

    // Check database and sign in
    getfeatured(req, client, ( data: any) => {

      if (!data.success) {
       
        res.status(500).send({
        data
        });
      } else 

      res.json(data);
    });
  };
}

exports.getmanyfeatured = (client: MongoClient) => {

  // Validate Request
  return (req: Request, res: Response): void => {

    if (!req.body) {
      res.status(400).send({ message: 'Error empty body' });
    }

    // Check database and sign in
    getmanyfeatured(req, client, ( data: any) => {

      if (!data.success) {
       
        res.status(500).send({
        data
        });
      } else 

      res.json(data);
    });
  };
}