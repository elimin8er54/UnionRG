const bcrypt = require("bcryptjs");
const auth = require("../config/auth.config");
const jwt = require("jsonwebtoken");
import { Request, Response } from "express"
import type { MongoClient } from 'mongodb';
const ObjectID = require('mongodb').ObjectID;
const url = require('url');
interface NewRequest extends Request {
  file: { filename: string }
}
type Featured = {
  url: string,
  src: string,
  price: string,
  sqft: string,
  bed: string,
  bath: string,
  city: string,
  street: string,
  position: string
}

type FeaturedFile = {
  filename: string
}

type Slide = {
  url: string
}

type GetFeatured = {
  position: string;
}

type GetManyFeatured = {
  position: string[];
}

export const updatefeatured = async (req: NewRequest, client: MongoClient, result: any) => {
  const data: Featured = req.body;
  const file: FeaturedFile = req.file;

  const position = parseInt(data.position, 10);
  if (position < 1 || position > 8) {
    result(null, { success: false, error: "Please use a value between 1-8" });
    return;
  }


  try {
    const database = client.db();

    let optionalFile;
    if (file) {
      optionalFile = { src: file.filename };
    } else {
      optionalFile = {};
    }

    await database.collection("featured").updateOne({ position: { $eq: position } },
      {
        $set: {
          position: position,
          url: data.url,
          price: data.price,
          sqft: data.sqft,
          bed: data.bed,
          bath: data.bath,
          city: data.city,
          street: data.street,
          ...optionalFile

        },
      },
      { upsert: true },
      function (err, records) {
        if (err) {
          result({ success: false, message: "Could not update." });
        } else {
          result({ success: true })
        }
      });

  } catch (err) {
    result({ success: false, message: "Something went wrong" });
    console.log(err);
  }
}

export const getmanyfeatured = async (req: Request, client: MongoClient, result: any) => {
  const data: GetManyFeatured = req.body;
  const position = data.position;

  const newPositions = position.map((x: string) => {
    return parseInt(x, 10);
  });

  let posQuerty: { position: { $eq: number } }[] = [];
  newPositions.forEach((element) => {
    posQuerty.push({ position: { $eq: element } });
  });

  try {
    const database = client.db();
    const values = await database.collection("featured").find({ $or: posQuerty }).sort({ "position": 1 }).toArray();

    values[0]['imgPath'] = req.get('Host') + "/images/properties/";
    if (
      values.length
    ) {
      result({ values, success: true });
    } else {
      result({ success: false });
    }
  } catch (err) {
    result({ success: false, message: "There was no image on the server to get." });
  }
}
export const getfeatured = async (req: Request, client: MongoClient, result: any) => {
  const data: GetFeatured = req.body;
  const position = parseInt(data.position, 10);
  try {

    const database = client.db();
    const values = await database.collection("featured").find({ position: { $eq: position } }).limit(1).toArray();
    values[0]['imgPath'] = req.get('Host') + "/images/properties/";
    if (
      values.length
    ) {
      result({ values, success: true });
    } else {
      result({ success: false });

    }
  } catch (err) {
    result({ success: false, message: "There was no image on the server to get." });
  }


}

export const getallslides = async (req: Request, client: MongoClient, result: any) => {
  const data = req.body;
  const dir = data.dir;
  try {

    const database = client.db();
    const values = await database.collection("slides").find({ type: { $eq: dir } }).toArray();

    if (dir === "leasing") {
      values[0]['imgPath'] = req.get('Host') + "/images/slideshow/leasing/";
    } else if (dir === "sales") {
      values[0]['imgPath'] = req.get('Host') + "/images/slideshow/sales/";
    } else if (dir === "careers") {
      values[0]['imgPath'] = req.get('Host') + "/images/slideshow/careers/";
    } else if (dir === "forms") {
      values[0]['imgPath'] = req.get('Host') + "/images/slideshow/forms/";
    } else if (dir === "propman") {
      values[0]['imgPath'] = req.get('Host') + "/images/slideshow/propertymanagement/";
    }

    if (
      values.length
    ) {
      result({ values, success: true });
    } else {
      result({ success: false });

    }
  } catch (err) {
    console.log(err);
    result({ success: false, message: "There was no image on the server to get." });
  }


}

export const updateslide = async (req: NewRequest, client: MongoClient, result: any) => {
  const data = req.body;
  const dir = data.dir;

  const file: FeaturedFile = req.file;
  try {

    const database = client.db();
    await database.collection("slides").insertOne({ type: dir, src: file.filename }, function (err, records) {
      if (err) {
        result({ success: false, message: "Could not Add." });
      } else {
        result({ success: true })
      }
    });


  } catch (err) {
    result({ success: false, message: "Could not Add." });
  }


}


export const deleteslide = async (req: Request, client: MongoClient, result: any) => {
  const id = req.body.id;


  try {

    const database = client.db();
    await database.collection("slides").deleteOne({ _id: { $eq: ObjectID(id) } }, function (err, records) {
      if (err) {
        result({ success: false, message: "Could not Delete." });

      } else {
        result({ success: true });


      }
    });




  } catch (err) {
    result({ success: false, message: "Could not Delete." });
  }


}







