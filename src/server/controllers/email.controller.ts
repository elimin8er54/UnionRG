import { emailContact } from '../models/email.model';
import { Request, Response } from "express"
exports.sendcontactemail = (req: Request, res: Response): void => {
  // Validate Request

  if (!req.body) {
    res.status(400).send({ message: 'Could not send email' });
  }

  // Check database and sign in
  emailContact(req.body, (err: any, data: any) => {

    if (err) {
      res.status(500).send({
        message: err.message || 'Something went wrong',
      });
    }

    res.json(data);
  });
};


