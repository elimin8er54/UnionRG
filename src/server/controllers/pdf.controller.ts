const { pdflease, pdfmoveinclient, pdfmoveinlandlord, pdflandlordinvoice } = require('../models/pdf.models');
import { Request, Response } from "express"
import type { MongoClient } from 'mongodb';





exports.pdflease = (client: MongoClient) => {

  // Validate Request
  return (req: Request, res: Response): void => {

    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    pdflease(req, client, (data: any) => {

      if (!data.success) {

        res.status(500).send({
          data
        });
      } else
        res.writeHead(200, data.values).end(data.pdfData);
    });
  };
}



exports.pdfmoveinclient = (client: MongoClient) => {

  // Validate Request
  return (req: Request, res: Response): void => {

    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    pdfmoveinclient(req, client, (data: any) => {

      if (!data.success) {

        res.status(500).send({
          data
        });
      } else

        res.json(data);
    });
  };
}


exports.pdfmoveinlandlord = (client: MongoClient) => {

  // Validate Request
  return (req: Request, res: Response): void => {

    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    // Check database and sign in
    pdfmoveinlandlord(req, client, (data: any) => {

      if (!data.success) {

        res.status(500).send({
          data
        });
      } else

        res.json(data);
    });
  };
}




exports.pdflandlordinvoice = (client: MongoClient) => {

  // Validate Request
  return (req: Request, res: Response): void => {

    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    // Check database and sign in
    pdflandlordinvoice(req, client, (data: any) => {

      if (!data.success) {

        res.status(500).send({
          data
        });
      } else

        res.json(data);
    });
  };
}