import { Request, Response } from 'express';
import type { MongoClient } from 'mongodb';

const {
  getdealagents,
  getdeallist,
  deletedeal,
  updatedealbalance,
  updatedeallandlord,
  updatedealinbound,
  updatedealoutbound,
  getdealinbound,
  getdealoutbound,
  updatedealclient,
  getdealclient,
  updatedealstatus,
  getonedeal,
  createleaserenewal,
} = require('../models/deal.models.ts');

exports.getdealagents = (client: MongoClient) => (req: Request, res: Response): void => {
  getdealagents(req, client, (data: any) => {
    if (!data.success) {
      res.status(500).send({
        data,
      });
    } else { res.json(data); }
  });
};
exports.createleaserenewal = (client: MongoClient) => (req: Request, res: Response): void => {
  if (!req.body) {
    res.status(400).send({ message: '' });
  }

  createleaserenewal(req, client, (data: any) => {
    if (!data.success) {
      res.status(500).send({
        data,
      });
    } else { res.json(data); }
  });
};
exports.getonedeal = (client: MongoClient) => (req: Request, res: Response): void => {
  if (!req.body) {
    res.status(400).send({ message: '' });
  }

  getonedeal(req, client, (data: any) => {
    if (!data.success) {
      res.status(500).send({
        data,
      });
    } else { res.json(data); }
  });
};
exports.updatedealstatus = (client: MongoClient) =>

  // Validate Request
  (req: Request, res: Response): void => {
    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    updatedealstatus(req, client, (data: any) => {
      if (!data.success) {
        res.status(500).send({
          data,
        });
      } else { res.json(data); }
    });
  };
exports.getdealclient = (client: MongoClient) =>

  // Validate Request
  (req: Request, res: Response): void => {
    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    getdealclient(req, client, (data: any) => {
      if (!data.success) {
        res.status(500).send({
          data,
        });
      } else { res.json(data); }
    });
  };
exports.getdeallist = (client: MongoClient) =>

  // Validate Request
  (req: Request, res: Response): void => {
    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    getdeallist(req, client, (data: any) => {
      if (!data.success) {
        res.status(500).send({
          data,
        });
      } else { res.json(data); }
    });
  };
exports.deletedeal = (client: MongoClient) =>

  // Validate Request
  (req: Request, res: Response): void => {
    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    deletedeal(req, client, (data: any) => {
      if (!data.success) {
        res.status(500).send({
          data,
        });
      } else { res.json(data); }
    });
  };
exports.updatedealbalance = (client: MongoClient) =>

  // Validate Request
  (req: Request, res: Response): void => {
    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    updatedealbalance(req, client, (data: any) => {
      if (!data.success) {
        res.status(500).send({
          data,
        });
      } else { res.json(data); }
    });
  };
exports.updatedeallandlord = (client: MongoClient) =>

  // Validate Request
  (req: Request, res: Response): void => {
    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    updatedeallandlord(req, client, (data: any) => {
      if (!data.success) {
        res.status(500).send({
          data,
        });
      } else { res.json(data); }
    });
  };
exports.updatedealinbound = (client: MongoClient) =>

  // Validate Request
  (req: Request, res: Response): void => {
    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    updatedealinbound(req, client, (data: any) => {
      if (!data.success) {
        res.status(500).send({
          data,
        });
      } else { res.json(data); }
    });
  };
exports.updatedealoutbound = (client: MongoClient) =>

  // Validate Request
  (req: Request, res: Response): void => {
    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    updatedealoutbound(req, client, (data: any) => {
      if (!data.success) {
        res.status(500).send({
          data,
        });
      } else { res.json(data); }
    });
  };
exports.updatedealclient = (client: MongoClient) =>

  // Validate Request
  (req: Request, res: Response): void => {
    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    updatedealclient(req, client, (data: any) => {
      if (!data.success) {
        res.status(500).send({
          data,
        });
      } else { res.json(data); }
    });
  };
exports.getdealinbound = (client: MongoClient) =>

  // Validate Request
  (req: Request, res: Response): void => {
    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    getdealinbound(req, client, (data: any) => {
      if (!data.success) {
        res.status(500).send({
          data,
        });
      } else { res.json(data); }
    });
  };
exports.getdealoutbound = (client: MongoClient) =>

  // Validate Request
  (req: Request, res: Response): void => {
    if (!req.body) {
      res.status(400).send({ message: 'Could not log in' });
    }

    getdealoutbound(req, client, (data: any) => {
      if (!data.success) {
        res.status(500).send({
          data,
        });
      } else { res.json(data); }
    });
  };
