const { signin, getagents,
  getcurrentuser, updateagent, deleteagents, getagentfull, getaboutagents } = require('../models/users.models');
import { Request, Response } from "express"
import type { MongoClient } from 'mongodb';


exports.signin = (client: MongoClient) => {

  // Validate Request
  return (req: Request, res: Response): void => {

    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    // Check database and sign in
    signin(req.body, client, (err: null | { [k: string]: { message: string } }, data: any) => {

      if (err) {
        res.status(500).send({
          message: err.message || 'Something went wrong',
        });
      }

      res.json(data);
    });
  };
}

exports.getcurrentuser = (client: MongoClient) => {

  // Validate Request
  return (req: Request, res: Response): void => {



    getcurrentuser(req, client, (data: any) => {

      if (!data.success) {

        res.status(500).send({
          data
        });
      } else

        res.json(data);
    });
  };
}


exports.updateagent = (client: MongoClient) => {

  // Validate Request
  return (req: Request, res: Response): void => {

    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    updateagent(req, client, (data: any) => {

      if (!data.success) {

        res.status(500).send({
          data
        });
      } else

        res.json(data);
    });
  };
}

exports.getaboutagents = (client: MongoClient) => {

  // Validate Request
  return (req: Request, res: Response): void => {

    getaboutagents(req, client, (data: any) => {

      if (!data.success) {

        res.status(500).send({
          data
        });
      } else

        res.json(data);
    });
  };
}


exports.getagents = (client: MongoClient) => {

  // Validate Request
  return (req: Request, res: Response): void => {

    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    getagents(req, client, (data: any) => {

      if (!data.success) {

        res.status(500).send({
          data
        });
      } else

        res.json(data);
    });
  };
}


exports.getagentfull = (client: MongoClient) => {

  // Validate Request
  return (req: Request, res: Response): void => {

    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    // Check database and sign in
    getagentfull(req, client, (data: any) => {

      if (!data.success) {

        res.status(500).send({
          data
        });
      } else

        res.json(data);
    });
  };
}


exports.deleteagents = (client: MongoClient) => {

  // Validate Request
  return (req: Request, res: Response): void => {

    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    // Check database and sign in
    deleteagents(req, client, (data: any) => {

      if (!data.success) {

        res.status(500).send({
          data
        });
      } else

        res.json(data);
    });
  };
}
