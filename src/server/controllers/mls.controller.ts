import { getMLS, getMLSTowns, getMLSPropertyInfo } from '../models/mls.model';
import { Request, Response } from "express"
import type { MongoClient } from 'mongodb';
exports.getProperties = (client: MongoClient) => {
    return (req: Request, res: Response): void => {
        if (!req.body) { res.status(400).send({ message: 'Could not get properties' }); }
        getMLS(req.body, client, (err: any, data: any) => {
            if (err) { res.status(500).send({ message: err.message || 'Something went wrong', }); }
            res.json(data);
        });
    };
}

exports.getTowns = (client: MongoClient) => {
    return (req: Request, res: Response): void => {
        if (!req.body) { res.status(400).send({ message: 'Could not get properties' }); }
        getMLSTowns(req.body, client, (err: any, data: any) => {
            if (err) { res.status(500).send({ message: err.message || 'Something went wrong', }); }
            res.json(data);
        });
    };
}

exports.getPropertyInfo = (client: MongoClient) => {
    return (req: Request, res: Response): void => {
        if (!req.body) { res.status(400).send({ message: 'Could not get properties' }); }
        getMLSPropertyInfo(req.body, client, (err: any, data: any) => {
            if (err) { res.status(500).send({ message: err.message || 'Something went wrong', }); }
            res.json(data);
        });
    };
}


