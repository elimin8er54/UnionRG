const bcrypt = require("bcryptjs");
const auth = require("../config/auth.config");
const jwt = require("jsonwebtoken");
import { Request, Response } from "express"
import type { MongoClient } from 'mongodb';
const ObjectID = require('mongodb').ObjectID;



interface GetLandlords {
isRemoved:string;
}


interface UpdateLandlord extends GetLandlords {
  phone:string
  name:string
  address:string
  csz:string
  id:string
}



export const getlandlords = async (req: Request, client: MongoClient, result: any) => {
  const isRemoved:GetLandlords = req.body.isRemoved;
 

  const search = req.body.search;

  let searchOptions:any = {}
  if(search) {
    if(search.searchName !== '') {
      searchOptions['name'] = { $regex : `${search.searchName}`,$options : 'i' } 
    }
    if(search.searchPhone !== '') {
      searchOptions['phone'] = { $regex : `${search.searchPhone}`,$options : 'i'} 
    }

    if(search.searchLocation !== '') {
      searchOptions['$or'] = [
       { address:{ $regex : `${search.searchLocation}`,$options : 'i'}},
       { csz:{ $regex : `${search.searchLocation}`,$options : 'i'}}
      
      ]
    
    }
    

  }

  try {
    const database = client.db();
    const values = await database.collection("landlords").find(
      {isRemoved:{$not:{$eq:true}  },...searchOptions}
      ).project({_id:1,name:1,address:1,csz:1,phone:1}).toArray();
  

    if (
      values.length
    ) {
   
    
      result({ values, success: true });
    } else {
      result({ success: false });
    }
  } catch (err) {
    result({ success: false, message: "Error" });
  
  }

}


export const getlandlordfull = async (req: Request, client: MongoClient, result: any) => {
  const id = req.body.id;

  try {
    const database = client.db();
    const values = await database.collection("landlords").find({_id:{$eq:ObjectID(id)}  }).limit(1).toArray();
  

    if (
      values.length
    ) {

  
      result({ values, success: true });
    } else {
      result({ success: false });
    }
  } catch (err) {

    result({ success: false, message: "Error" });
  
  }

}



export const updatelandlords = async (req: any, client: MongoClient, result: any) => {
  
    const data: UpdateLandlord = req.body;

  
    try {
      const database = client.db();

      

      let idCheck = {          
        phone:data.phone,
        name:data.name,
        address:data.address,
        csz:data.csz,
        isRemoved:data.isRemoved};

        let pushHistory = {
          $push: {"history":{updatedDate:new Date(),updatedBy:req.user_id,type:"Update"}},
        }

        //Hack for switching between insert and update
        let tempId;
        if(data.id === "None") {
          tempId = "0"
        } else {
          tempId = ObjectID(data.id)
        }

        //UPDATE OR INSERT

      if( data.id !== "None" ) {
  
         database.collection("landlords").updateOne({ _id: { $eq: ObjectID(data.id) } },
        {
          $set: {...idCheck},
          ...pushHistory
        },
     
        function (err, records) {
          if (err) { 
            result({ success: false, message: "Could not update." });
          } else {
            result({ success: true })
          }
        });
      } else if(data.id === "None") {
         database.collection("landlords").insertOne(
        {
          ...idCheck,
          "history": [{updatedDate:new Date(),updatedBy:req.user_id,type:"Create"

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

    
  
    
     
  
    } catch (err) {
      result({ success: false, message: "Something went wrong" });
      console.log(err)
    }
}


export const deletelandlords = async (req: Request, client: MongoClient, result: any) => {
  const id = req.body.id;


  try {

    const database = client.db();
    
  await database.collection("landlords").updateOne({ _id: { $eq: ObjectID(id) } },
        {
          $set: {isRemoved:true},
          $push: {"history":{updatedDate:new Date(),updatedBy:id,type:"Delete"}}
        },  function (err, records) {
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



