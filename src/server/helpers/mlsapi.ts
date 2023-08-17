//This file downloads MLS text files from the MLS api. 
//Then it reads the files and inserts them into the database.
//There are 2 collections. properties and towns.


import * as  fs from 'fs';
import { ReadStream } from 'fs';
import { IncomingMessage } from 'http';
import * as https from 'https';
import type { MongoClient } from 'mongodb';
const readline = require('readline');

type MLSFiles = {
  [key: string]: string;
  fileStream: string;
  urlGet: string;
  collection: string;
}
const timeout_wrapper = function (req: any) {
  return function () {
    // do some logging, cleaning, etc. depending on req
    req.abort();
  };
};

export const updateMLS = async (client: MongoClient) => {
  //We dont want to tell it which db cause it knows by the url we used



  const file = fs.createWriteStream("./src/server/mls.files/checker.txt");
  https.get("https://idx.mlspin.com/idx.asp?user=2KzB9t1MntTtFaBNDt7rndWjyY2LttYzUhtNtuNt5K2PrZh2FoET227cvZRD29xItaOLfDTqoDPxDy9&proptype=CC", { timeout: 10000 }, function (res: IncomingMessage) {


    let countNumberOfBuffers = 0;
    res.on('data', function (data: Buffer) {
      file.write(data);
      countNumberOfBuffers++;
    }).on('end', function () {
      // Since MLS is unstable and outdated this was the best way to make sure we got a good file without parsing it first
      //This downloades checker.txt to make sure that the file exists/is not empty before renewing all documents.
      if (countNumberOfBuffers > 50) {
        startAPITransfer(client);
      }
      file.end();
    }).on('error', function (err) {

      console.log("Got error: " + err.message);

    });


  }).on('timeout', () => { console.log("Timeout..."); })

}


//Never call this before checking to see that the api is up and giving a correct file.
const startAPITransfer = async (client: MongoClient) => {
  const database = client.db();

  await database.collection("properties").deleteMany({});
  await database.collection("towns").deleteMany({});


  await readMLSFiles(client, { fileStream: './src/server/mls.files/mlscc.txt', urlGet: 'https://idx.mlspin.com/idx.asp?user=2KzB9t1MntTtFaBNDt7rndWjyY2LttYzUhtNtuNt5K2PrZh2FoET227cvZRD29xItaOLfDTqoDPxDy9&proptype=CC', collection: "properties" });
  await readMLSFiles(client, { fileStream: './src/server/mls.files/mlssf.txt', urlGet: 'https://idx.mlspin.com/idx.asp?user=2KzB9t1MntTtFaBNDt7rndWjyY2LttYzUhtNtuNt5K2PrZh2FoET227cvZRD29xItaOLfDTqoDPxDy9&proptype=SF', collection: "properties" });
  await readMLSFiles(client, { fileStream: './src/server/mls.files/mlsmf.txt', urlGet: 'https://idx.mlspin.com/idx.asp?user=2KzB9t1MntTtFaBNDt7rndWjyY2LttYzUhtNtuNt5K2PrZh2FoET227cvZRD29xItaOLfDTqoDPxDy9&proptype=MF', collection: "properties" });
  await readMLSFiles(client, { fileStream: './src/server/mls.files/towns.txt', urlGet: 'https://idx.mlspin.com/towns.asp', collection: "towns" });
  await readMLSFiles(client, { fileStream: './src/server/mls.files/field_reference.txt', urlGet: 'https://idx.mlspin.com/field_reference.asp', collection: "field" });

}

async function readMLSFiles(client: MongoClient, options: MLSFiles) {
  const file = fs.createWriteStream(options.fileStream);
  https.get(options.urlGet, (res: IncomingMessage) => {
    res.setEncoding('ascii');
    let stream = res.pipe(file);
    stream.on("finish", async () => {
      const fileStream = fs.createReadStream(options.fileStream);
      const mlsVal = await processLineByLine(fileStream);
      //Database entry code goes here.
      await insertMLS(client, mlsVal, options.collection);
    });

  });
}

async function processLineByLine(fileStream: ReadStream) {
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let mlsArray: {}[] = [];
  let keyArray: string[] = [];
  let lineCount = 0;
  for await (const line of rl) {
    let tempMLS: any = {};
    if (lineCount === 0) {
      keyArray = line.split('|');
    } else {
      line.split('|').forEach((key: string | number, i: number) => {

        if (key) {
          //THESE ARE CONVERTING MLS MF DATABASE TO BE THE SAME AS THEIR SF AND CC PROPERTIES>
          //MLS HAS THE WORST API I HAVE EVER WORKED WITH
          if (keyArray[i] === "TOTAL_BRS") {
            keyArray[i] = "NO_BEDROOMS";
          }
          if (keyArray[i] === "TOTAL_FULL_BATHS") {
            keyArray[i] = "NO_FULL_BATHS";
          }
          if (keyArray[i] === "TOTAL_HALF_BATHS") {
            keyArray[i] = "NO_HALF_BATHS";
          }
          //This is going through any values that do not start with leading 0
          //as well as making sure the entire string is in number format and converts it to a number.
          //Should move this to a helper function/class

          if (typeof key === 'string') { if ((key.charAt(0) !== '0' && /^\d+$/.test(key)) || key.length === 1 && key.charAt(0) === '0') { key = parseInt(key, 10) } }
          tempMLS[keyArray[i]] = key;
        } else {
          tempMLS[keyArray[i]] = undefined;
        }
      });
      mlsArray.push(tempMLS);
    }
    lineCount++;
  }
  return mlsArray;
};


async function insertMLS(client: MongoClient, data: any, collections: string) {
  try {
    if (data) {
      const database = client.db();
      await database.collection(collections).insertMany(data);
    }
  } catch {
    //I don't actually want to close the connection every query so this is empty.
  }
}



