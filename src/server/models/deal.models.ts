const bcrypt = require("bcryptjs");
const auth = require("../config/auth.config");
const jwt = require("jsonwebtoken");
import { Request } from "express"
import type { MongoClient, UpdateWriteOpResult, InsertOneWriteOpResult, Db } from 'mongodb';
const ObjectID = require('mongodb').ObjectID;
const { getcurrentuser } = require('./users.models');


export const updatedealstatus = async (req: Request, client: MongoClient, result: any) => {
  try {
    const database = client.db();


    let status = "Active";

    if (req.body.dealStatus === "Active") {
      status = "Active";
    } else if (req.body.dealStatus === "Inactive") {
      status = "Inactive";
    } else if (req.body.dealStatus === "Closed") {
      status = "Closed";
    }


    const values: any = await database.collection("deals").updateOne({ _id: { $eq: ObjectID(req.body.dealID) } },
      {

        $set: { dealStatus: status },
      })


    if (
      values.length > 0
    ) {

      result({ values, success: true });
    } else {
      result({ values, success: false });
    }
  } catch (err) {
    console.log(err)
  }
}

export const getlandlords = async (req: Request, client: MongoClient, result: any) => {
  try {
    const database = client.db();
    const values = await database.collection("landlords").find(
      { isRemoved: { $not: { $eq: true } } }
    ).project({ _id: 1, name: 1, address: 1, csz: 1, phone: 1 }).toArray();
    if (
      values.length
    ) {
      result({ values, success: true });
    } else {
      result({ success: false });
    }
  } catch (err) {
    result({ success: false, message: "Could not get landlords" });
  }
}

export const deletedeal = async (req: Request, client: MongoClient, result: any) => {
  try {
    const database = client.db();

    const values1: any = await database.collection("deals").find({ _id: { $eq: ObjectID(req.body.dealID) } },

    ).project({ _id: 0, isRemoved: 1 }).toArray()




    const values: any = await database.collection("deals").updateOne({ _id: { $eq: ObjectID(req.body.dealID) } },
      {
        $set: { isRemoved: !values1[0].isRemoved },
      })


    if (
      values.deletedCount > 0
    ) {
      result({ values, success: true });
    } else {
      result({ values, success: false });
    }
  } catch (err) {
  }
}

export const getdeallist = async (req: Request, client: MongoClient, result: any) => {
  // console.log(req.body.status)
  const database = client.db();

  // await database.collection("users").deleteOne({ name: { $eq: "d" } })

  let values: any = await database.collection("deals").find({
    dealUserID: ObjectID(req.body.agentID),
    dealType: req.body.type,
    dealStatus: req.body.status,
    isRemoved: req.body.showRemoved === 'true',

  }).toArray();

  const theUser = await database.collection("users").find(
    { _id: ObjectID(req.body.agentID) }
  ).toArray();
  if (values.length > 0) {
    const ll = await database.collection("landlords").aggregate(
      [{
        $project: {
          _id: 0,
          "lid": "$_id",
          name: 1
        }
      }]
    ).toArray();


    const $or = values.map((element: any) => {
      // console.log(typeof element._id)
      return {
        inboundDealID: { $eq: element._id }
      }
    });

    const inBoundDeals = await database.collection("inbound").find(
      { $or }
    ).toArray();

    values = values.map((x: any) => {

      return {
        ...x, inboundTotal: inBoundDeals.reduce((result: number, y: any) => {
          let val = result;
          if (y.inboundDealID.toString() === x._id.toString()) {
            val = result + parseFloat(y.inboundAmount);
          }
          return val;
        }, 0)
      }
    })

    values = values.map((x: any) => ({ ...x, ...ll.find((y: any) => y.lid.toString() === x.landlordID) }))
  }

  if (
    values.length
  ) {
    result({ values, success: true, theUser });
  } else {
    result({ values, success: false });
  }
}

export const getonedeal = async (req: Request, client: MongoClient, result: any) => {

  const database = client.db();
  let values: any = await database.collection("deals").find({
    _id: ObjectID(req.body.dealID)

  }).toArray();


  const theUser = await database.collection("users").find(
    { _id: ObjectID(values[0].dealUserID) }
  ).toArray();

  if (
    values.length
  ) {
    result({ values, success: true, theUser });
  } else {
    result({ values, success: false });
  }
}

export const createleaserenewal = async (req: Request, client: MongoClient, result: any) => {
  getcurrentuser(req, client, async (datau: any) => {
    const database = client.db();
    let values: any = await database.collection("deals").find({
      _id: ObjectID(req.body.dealID)
    }).project({ _id: 0 }).toArray();

    const userID = datau.values[0]._id;


    const count = await getnewDealCount(userID, database);
    //console.log(count)
    //Replace count
    values[0].dealCount = count;
    values[0].dealType = "Renewal";

    let leaserenewal: InsertOneWriteOpResult<any> = await database.collection("deals").insertOne(
      values[0]
    );

    const id = leaserenewal.insertedId;


    const valuest: any = await database.collection("clients").find({ clientDealID: ObjectID(req.body.dealID) }).toArray();

    valuest.forEach(async (elem: any) => {

      let idCheck = {
        clientName: elem.clientName,
        clientPhone: elem.clientPhone,
        clientEmail: elem.clientEmail,
        clientDealID: id

      };
      const asd = await database.collection("clients").insertOne(
        {
          ...idCheck,
        }
      );
    });

    if (
      values.length
    ) {
      result({ values, success: true });
    } else {
      result({ values, success: false });
    }

  });
}

function isNumeric(str: any) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export const updatedealbalance = async (req: Request, client: MongoClient, result: any) => {
  try {
    const database = client.db();
    const inputs = req.body;
    let valCheck: any = "";
    let val = req.body.value;


    //This is to make sure the user does not add there own fields to the database.
    //So event though we are using the same names. IF the user changed them client sided
    //It wouldnt add a custom field they tried to malicously add
    switch (inputs.valueType) {
      case "FirstMonthFee":
        valCheck = 'firstMonthFee'
        if (!isNumeric(val)) val = 0.00;
        break;
      case "LastMonthFee":
        valCheck = 'lastMonthFee'
        if (!isNumeric(val)) val = 0.00;
        break;
      case "SecurityFee":
        valCheck = 'securityFee'
        if (!isNumeric(val)) val = 0.00;
        break;
      case "AppFee":
        valCheck = 'appFee'
        if (!isNumeric(val)) val = 0.00;
        break;
      case "TenatFee":
        valCheck = 'tenantFee'
        if (!isNumeric(val)) val = 0.00;
        break;
      case "LandlordFee":
        valCheck = 'landlordFee'
        if (!isNumeric(val)) val = 0.00;
        break;
      case "KeyFee":
        valCheck = 'keyFee'
        if (!isNumeric(val)) val = 0.00;
        break;
      case "CleaningFee":
        valCheck = 'cleaningFee'
        if (!isNumeric(val)) val = 0.00;
        break;
      case "CoBrokeFee":
        valCheck = 'coBrokeFee'
        if (!isNumeric(val)) val = 0.00;
        break;
      case "FirstMonthFeeDate":
        valCheck = 'firstMonthFeeDate'
        if (val !== null)
          val = new Date(val);
        break;
      case "LastMonthFeeDate":
        valCheck = 'lastMonthFeeDate'
        if (val !== null)
          val = new Date(val);
        break;
      case "SecurityFeeDate":
        valCheck = 'securityFeeDate'
        if (val !== null)
          val = new Date(val);
        break;
      case "AppFeeDate":
        valCheck = 'appFeeDate'
        if (val !== null)
          val = new Date(val);
        break;
      case "TenatFeeDate":
        valCheck = 'tenantFeeDate'
        if (val !== null)
          val = new Date(val);
        break;
      case "LandlordFeeDate":
        valCheck = 'landlordFeeDate'
        if (val !== null)
          val = new Date(val);
        break;
      case "KeyFeeDate":
        valCheck = 'keyFeeDate'
        if (val !== null)
          val = new Date(val);
        break;
      case "CleaningFeeDate":
        valCheck = 'cleaningFeeDate'
        if (val !== null)
          val = new Date(val);
        break;
      case "CoBrokeFeeDate":
        valCheck = 'coBrokeFeeDate'
        if (val !== null)
          val = new Date(val);
        break;
      case "DealNotes":
        valCheck = 'dealNotes'

        break;

      default:
      // code block
    }
    let $set: any = {};

    $set[valCheck] = val;


    const values: any = await database.collection("deals").updateOne({ _id: { $eq: ObjectID(req.body.dealID) } },
      {
        $set,
      })



    if (
      values.modifiedCount > 0
    ) {

      result({ values, success: true });
    } else {
      result({ values, success: false });
    }
  } catch (err) {
    console.log(err)
  }
}

export const updatedealinbound = async (req: Request, client: MongoClient, result: any) => {

  const data = req.body.values;

  try {
    const database = client.db();


    const dealID = ObjectID(req.body.dealID)


    //ALWAYS DELETE FIRST. IF YOU DONT THEN YOU WILL DELETE THE INFO THAT GETS PUT IN LATER
    let dontDelete: any = { $and: [] };
    data.forEach(async (elem: any) => {
      dontDelete["$and"].push({ _id: { $ne: ObjectID(elem._id) } })
    });

    await database.collection("inbound").deleteMany({ inboundDealID: { $eq: dealID }, ...dontDelete });

    data.forEach(async (elem: any) => {

      let idCheck = {
        inboundPurpose: elem.inboundPurpose,
        inboundAmount: elem.inboundAmount,
        inboundDate: elem.inboundDate,
        inboundPayor: elem.inboundPayor,
        inboundPayorType: elem.inboundPayorType,
        inboundMethod: elem.inboundMethod,
        inboundCheck: elem.inboundCheck,
        inboundNotes: elem.inboundNotes,
        inboundDealID: dealID

      };

      if (!elem.isNew) {

        await database.collection("inbound").updateOne({ _id: { $eq: ObjectID(elem._id) } },
          {
            $set: { ...idCheck },
          }
        );
      } else {

        const asd = await database.collection("inbound").insertOne(
          {
            ...idCheck,
          }
        );
      }
    });

    result({ success: true, dealID: dealID })
  } catch (err) {
    // result({ success: false, message: "Something went wrong" });
    console.log(err)
  }
}

export const updatedealoutbound = async (req: Request, client: MongoClient, result: any) => {
  const data = req.body.values;

  try {
    const database = client.db();
    const dealID = ObjectID(req.body.dealID)


    //ALWAYS DELETE FIRST. IF YOU DONT THEN YOU WILL DELETE THE INFO THAT GETS PUT IN LATER
    let dontDelete: any = { $and: [] };
    data.forEach(async (elem: any) => {
      dontDelete["$and"].push({ _id: { $ne: ObjectID(elem._id) } })
    });

    await database.collection("outbound").deleteMany({ inboundDealID: { $eq: dealID }, ...dontDelete });

    data.forEach(async (elem: any) => {

      let idCheck = {
        inboundPurpose: elem.inboundPurpose,
        inboundAmount: elem.inboundAmount,
        inboundCheck: elem.inboundCheck,
        inboundNotes: elem.inboundNotes,
        inboundDealID: dealID

      };

      if (!elem.isNew) {

        await database.collection("outbound").updateOne({ _id: { $eq: ObjectID(elem._id) } },
          {
            $set: { ...idCheck },
          }
        );
      } else {
        const asd = await database.collection("outbound").insertOne(
          {
            ...idCheck,
          }
        );
      }
    });
    result({ success: true, dealID: dealID })
  } catch (err) {
    // result({ success: false, message: "Something went wrong" });
    console.log(err)
  }
}
export const getdealinbound = async (req: Request, client: MongoClient, result: any) => {

  if (req.body.dealID !== undefined) {
    try {
      const database = client.db();

      let deals: any[] = await database.collection("deals").find({
        _id: ObjectID(req.body.dealID)

      }).toArray();

      let clients: any[] = await database.collection("clients").find({ clientDealID: ObjectID(deals[0]._id) }).toArray();
      let landlords: any[] = await database.collection("landlords").find({ _id: ObjectID(deals[0].landlordID) }).toArray();
      let inbound: any[] = await database.collection("inbound").find({ inboundDealID: ObjectID(deals[0]._id) }).toArray();


      clients = clients.map((element: any) => {
        return { _id: element._id, name: element.clientName, type: "Client" }

      })
      landlords = landlords.map((element: any) => {

        return { _id: element._id, name: element.name, type: "Landlord" }

      })

      const payors = [...clients, ...landlords]
      const values = inbound.map((elem: any) => {

        return { ...elem, isNew: false }
      })
      result({ values, success: true, payors });

    } catch (err) {
      result({ success: false, message: "There was no Clients to get." });
    }
  }
}

export const getdealoutbound = async (req: Request, client: MongoClient, result: any) => {
  if (req.body.dealID !== undefined) {
    try {
      const database = client.db();

      let deals: any[] = await database.collection("deals").find({
        _id: ObjectID(req.body.dealID)

      }).toArray();

      let inbound: any[] = await database.collection("outbound").find({ inboundDealID: ObjectID(deals[0]._id) }).toArray();

      const values = inbound.map((elem: any) => {

        return { ...elem, isNew: false }
      })


      result({ values, success: true });

    } catch (err) {
      result({ success: false, message: "There was no Clients to get." });

    }
  }

}

export const updatedeallandlord = async (req: Request, client: MongoClient, result: any) => {
  try {
    const database = client.db();
    const inputs = req.body;
    let valCheck: any = "";
    let val = req.body.value;
    //This is to make sure the user does not add there own fields to the database.
    //So event though we are using the same names. IF the user changed them client sided
    //It wouldnt add a custom field they tried to malicously add
    switch (inputs.valueType) {
      case "LeaseStreetAddress":
        valCheck = 'leaseStreetAddress'
        break;
      case "LeaseCity":
        valCheck = 'leaseCity'
        break;
      case "LeaseUnitNumber":
        valCheck = 'leaseUnitNumber'
        break;
      case "LeaseState":
        valCheck = 'leaseState'
        break;
      case "LeaseZipCode":
        valCheck = 'leaseZipCode'
        break;
      case "CheckPayable":
        valCheck = 'checkPayable'
        break;
      case "MaintenanceName":
        valCheck = 'maintenanceName'
        break;
      case "MaintenancePhone":
        valCheck = 'maintenancePhone'
        break;
      case "MaintenanceAddress":
        valCheck = 'maintenanceAddress'
        break;
      case "MaintenanceCsz":
        valCheck = 'maintenanceCsz'
        break;
      case "AgentName":
        valCheck = 'dealAgentName'
        break;
      case "DealCount":
        valCheck = 'dealCount'
        val = parseInt(val) - 1
        break;
      case "Addendum":
        valCheck = 'addendum'

        break;
      case "W9":
        valCheck = 'w9'

        break;
      case "Days":
        valCheck = 'days'

        break;
      case "Type":
        valCheck = 'dealType'

        break;
      case "Bedrooms":
        valCheck = 'bedrooms'

        break;
      case "MoveInDate":
        valCheck = 'moveInDate'
        if (val !== null)
          val = new Date(val);

        break;
      case "LeaseExpDate":
        valCheck = 'leaseExpDate'
        if (val !== null)
          val = new Date(val);

        break;
      case "MonthyInstallment":
        valCheck = 'monthyInstallment'

        break;
      case "InstallmentDueOn":
        valCheck = 'installmentDueOn'

        break;
      case "IsCoBroke":
        valCheck = 'isCoBroke'

        break;
      case "ParkingDetail":
        valCheck = 'parkingDetail'

        break;
      case "UtilitiesDetail":
        valCheck = 'utilitiesDetail'

        break;
      case "OtherDetail":
        valCheck = 'otherDetail'

        break;
      case "PetDetail":
        valCheck = 'petDetail'
        break;
      case "LandlordID":
        valCheck = 'landlordID'
        break;
      default:
      // code block
    }
    let $set: any = {};

    $set[valCheck] = val;

    const values: UpdateWriteOpResult = await database.collection("deals").updateOne({ _id: { $eq: ObjectID(req.body.dealID) } },
      {
        $set,
      })
    if (
      values.modifiedCount > 0
    ) {

      result({ values, success: true });
    } else {
      result({ values, success: false });
    }
  } catch (err) {
    console.log(err)
  }
}

export const getdealclient = async (req: Request, client: MongoClient, result: any) => {
  if (req.body.dealID !== undefined) {
    try {
      const database = client.db();

      const valuest: any = await database.collection("clients").find({ clientDealID: ObjectID(req.body.dealID) }).toArray();

      const values = valuest.map((elem: any) => {

        return { ...elem, isNew: false }
      })
      if (
        values.length
      ) {
        result({ values, success: true });
      } else {
        result({ success: false });
      }
    } catch (err) {
      result({ success: false, message: "There was no Clients to get." });

    }
  }
}

async function getnewDealCount(userID: string, database: Db) {
  let all: any = await database.collection("deals").aggregate(
    [{ $match: { dealUserID: ObjectID(userID) } },
    {
      $project:
      {
        dealCreatedDate: { $year: new Date() },

      }
    }]


  ).toArray();



  let count;

  if (all) {
    count = all.length
  } else {
    count = 1;
  }

  return count;
}

export const updatedealclient = async (req: Request, client: MongoClient, result: any) => {
  getcurrentuser(req, client, async (datau: any) => {
    const data = req.body.values;
    const values = datau.values[0];
    try {
      const database = client.db();
      let dealID: any = undefined;

      if (!req.body.dealID) {

        const count = await getnewDealCount(values._id, database);

        const asd = await database.collection("deals").insertOne(
          {
            dealUserID: values._id,
            dealType: "Lease",
            dealStatus: "Active",
            dealCreatedDate: new Date(),
            isRemoved: false,
            dealCount: count,
            dealAgentName: values.name,
            firstMonthFee: "0.00",
            lastMonthFee: "0.00",
            securityFee: "0.00",
            appFee: "0.00",
            tenantFee: "0.00",
            landlordFee: "0.00",
            keyFee: "0.00",
            cleaningFee: "0.00",
            coBrokeFee: "0.00"

          })

        dealID = asd.insertedId

      } else {
        dealID = ObjectID(req.body.dealID)
      }

      //ALWAYS DELETE FIRST. IF YOU DONT THEN YOU WILL DELETE THE INFO THAT GETS PUT IN LATER
      let dontDelete: any = { $and: [] };
      data.forEach(async (elem: any) => {
        dontDelete["$and"].push({ _id: { $ne: ObjectID(elem._id) } })
      });

      await database.collection("clients").deleteMany({ clientDealID: { $eq: dealID }, ...dontDelete });

      data.forEach(async (elem: any) => {

        let idCheck = {
          clientName: elem.clientName,
          clientPhone: elem.clientPhone,
          clientEmail: elem.clientEmail,
          clientDealID: dealID

        };

        if (!elem.isNew) {

          await database.collection("clients").updateOne({ _id: { $eq: ObjectID(elem._id) } },
            {
              $set: { ...idCheck },
            }
          );
        } else {

          const asd = await database.collection("clients").insertOne(
            {
              ...idCheck,
            }

          );

        }

      });


      result({ success: true, dealID: dealID })


    } catch (err) {
      // result({ success: false, message: "Something went wrong" });
      console.log(err)
    }
  });
}

export const getdealagents = async (req: Request, client: MongoClient, result: any) => {
  getcurrentuser(req, client, async (data: any) => {
    const valuesUser = data.values[0];
    let searchOptions: any = { _id: valuesUser._id }
    if (data) {
      if (valuesUser.isAdmin) {
        searchOptions = { $or: [{ isRemoved: { $not: { $eq: true } } }, { isRemoved: null }], }
      }
    }
    try {
      const database = client.db();
      const values = await database.collection("users").find(
        { ...searchOptions }
      ).project({ _id: 1, name: 1 }).toArray();


      if (
        values.length
      ) {


        result({ values, success: true, currentUserID: valuesUser._id });
      } else {
        result({ success: false });
      }
    } catch (err) {
      result({ success: false, message: "." });

    }
  })
}

