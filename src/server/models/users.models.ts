const bcrypt = require("bcryptjs");
const auth = require("../config/auth.config");
const jwt = require("jsonwebtoken");
import { Request, Response } from "express"
import type { MongoClient } from 'mongodb';
const ObjectID = require('mongodb').ObjectID;

type User = {
  username: string,
  password: string,

}

interface GetAgents {
  isRemoved: string;
}

interface NewRequest extends Request {
  file: { filename: string }
}

interface RequestID extends Request {
  user_id: string
}

interface UpdateAgents extends User, GetAgents {
  id: string,
  email: string,
  phone: string,
  name: string,
  bio: string,
  isAdmin: string,
  title: string,
  initial: string,
  isShown: string,
  src: string
}

type UserFile = {
  filename: string
}

export const signin = async (newUser: User, client: MongoClient, result: any) => {

  try {

    //Fill in the query
    const database = client.db();

    database.collection("users").countDocuments(function (err, count) {
      if (!err && count === 0) {
        database.collection("users").insertOne({ username: "Shaunt", password: bcrypt.hashSync("Kesh", 8) })
      }
    });



    let query: {} = { username: { $eq: newUser.username }, isRemoved: { $not: { $eq: true } } };

    const users = await database.collection("users").find(
      query
    ).limit(1).toArray();

    if (
      users.length &&
      bcrypt.compareSync(newUser.password, users[0].password)
    ) {

      const token = jwt.sign({ user_id: users[0]._id }, auth.secret, {
        expiresIn: 60 * 100,
      });


      database.collection("users").updateOne({ _id: { $eq: ObjectID(users[0]._id) } },
        {
          $set: { lastLogin: new Date() },

        },

        function (err, records) {
          if (err) {

          } else {

          }
        });

      result(null, { token: token, success: true });
    } else {
      result(null, { success: false });
    }


  } catch (err) {

  }
}

export const getagents = async (req: Request, client: MongoClient, result: any) => {
  const isRemoved: GetAgents = req.body.isRemoved;


  //This is to also show agents who are set to null incase someone forgot to set it to false or true
  let removeCheck: any = {}

  if (!isRemoved) {

    removeCheck['$or'] = [
      { isRemoved: isRemoved },
      { isRemoved: null }

    ]
  } else {
    { removeCheck['isRemoved'] = { $eq: isRemoved } }
  }


  try {
    const database = client.db();
    const values = await database.collection("users").find({ ...removeCheck }).project({ _id: 1, name: 1, src: 1, lastLogin: 1 }).toArray();


    if (
      values.length
    ) {
      values[0]['imgPath'] = req.get('Host') + "/images/agents/";

      result({ values, success: true });
    } else {
      result({ success: false });
    }
  } catch (err) {
    result({ success: false, message: "There was no image on the server to get." });

  }

}

export const getaboutagents = async (req: Request, client: MongoClient, result: any) => {


  try {
    const database = client.db();
    const values = await database.collection("users").find(
      { $and: [{ isRemoved: { $not: { $eq: true } } }, { isShown: true }] }
    ).project({ name: 1, src: 1, bio: 1, email: 1, phone: 1, title: 1 }).toArray();


    if (
      values.length
    ) {
      values[0]['imgPath'] = req.get('Host') + "/images/agents/";

      result({ values, success: true });
    } else {
      result({ success: false });
    }
  } catch (err) {
    result({ success: false, message: "There was no image on the server to get." });

  }

}

export const getagentfull = async (req: Request, client: MongoClient, result: any) => {
  const id = req.body.id;

  try {
    const database = client.db();
    const values = await database.collection("users").find({ _id: { $eq: ObjectID(id) } }).project({ password: 0 }).limit(1).toArray();


    if (
      values.length
    ) {
      values[0]['imgPath'] = req.get('Host') + "/images/agents/";

      result({ values, success: true });
    } else {
      result({ success: false });
    }
  } catch (err) {

    result({ success: false, message: "There was no image on the server to get." });

  }

}


export const getcurrentuser = async (req: RequestID, client: MongoClient, result: any) => {
  const id = req.user_id;

  try {
    const database = client.db();
    const values = await database.collection("users").find({ _id: { $eq: ObjectID(id) } }).project({ password: 0 }).limit(1).toArray();


    if (
      values.length
    ) {
      values[0]['imgPath'] = req.get('Host') + "/images/agents/";

      result({ values, success: true });
    } else {
      result({ success: false });
    }
  } catch (err) {

    result({ success: false, message: "There was no image on the server to get." });

  }

}

export const updateagent = async (req: any, client: MongoClient, result: any) => {

  const data: UpdateAgents = req.body;
  const file: UserFile = req.file;

  try {
    const database = client.db();

    let optionalFile;
    if (file) {
      optionalFile = { src: file.filename };
    } else {
      optionalFile = {};
    }


    let doInsert = true;
    let pwd;

    //Only set default remove when inserting
    let isRemoved: any = {};

    if (data.id === "None") {
      isRemoved["isRemoved"] = data.isRemoved === 'true'
    }

    if (data.password === "") {
      if (data.id === "None" && (data.password.length < 4 || data.username.length < 4)) {
        doInsert = false;
      }
      pwd = {}
    } else {
      pwd = { password: bcrypt.hashSync(data.password, 8) }

    }


    let idCheck = {
      email: data.email,
      phone: data.phone,
      name: data.name,
      bio: data.bio,
      isAdmin: data.isAdmin === 'true',
      title: data.title,
      initial: data.initial,
      isShown: data.isShown === 'true',

      username: data.username,


      ...isRemoved,
      ...pwd,
      ...optionalFile
    };

    let pushHistory = {
      $push: { "history": { updatedDate: new Date(), updatedBy: req.user_id, type: "Update" } },
    }

    let tempId;
    if (data.id === "None") {
      tempId = "0"
    } else {
      tempId = ObjectID(data.id)
    }

    //Check if someone else has taken this username
    const values = await database.collection("users").find(
      {
        $and: [
          { username: data.username },
          { _id: { $not: { $eq: tempId } } },
          { initial: { $not: { $eq: data.initial } } }
        ]

      }).project({ username: 1, _id: 1 }).toArray();


    let allowUsernameChange = true;


    if (values.length > 0) {
      allowUsernameChange = false;

    }

    //UPDATE OR INSERT
    if (allowUsernameChange) {
      if (data.id !== "None") {

        await database.collection("users").updateOne({ _id: { $eq: ObjectID(data.id) } },
          {
            $set: { ...idCheck },
            ...pushHistory
          },

          function (err, records) {
            if (err) {
              result({ success: false, message: "Could not update.", records: records });
            } else {
              result({ success: true })
            }
          });
      } else if (data.id === "None" && doInsert) {
        await database.collection("users").insertOne(
          {
            ...idCheck,
            "history": [{
              updatedDate: new Date(), updatedBy: req.user_id, type: "Create"

            }]
          },

          function (err, records) {
            if (err || records.insertedCount === 0) {
              result({ success: false, message: "Could not insert." });
            } else {
              result({ success: true })
            }
          });
      }

    }




  } catch (err) {
    result({ success: false, message: "Something went wrong" });
    console.log(err)
  }
}


export const deleteagents = async (req: Request, client: MongoClient, result: any) => {
  const id = req.body.id;
  const isRemoved = req.body.isRemoved;

  try {

    const database = client.db();

    database.collection("users").updateOne({ _id: { $eq: ObjectID(id) } },
      {
        $set: { isRemoved: isRemoved },
        $push: { "history": { updatedDate: new Date(), updatedBy: id, type: "Delete" } }
      }, function (err, records) {
        if (err) {
          result({ success: false, message: "Could not Delete." });
        } else {
          result({ success: true })
        }
      });

  } catch (err) {
    result({ success: false, message: "Could not Delete." });
  }


}



