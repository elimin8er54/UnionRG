const bcrypt = require("bcryptjs");
const auth = require("../config/auth.config");
const jwt = require("jsonwebtoken");
import { Request, Response } from "express"
import type { MongoClient } from 'mongodb';
const ObjectID = require('mongodb').ObjectID;
const PDFDocument = require('pdfkit');
const fs = require("fs");

interface Deal {
  dealID: string
}
export const pdflease = async (req: Request, client: MongoClient, result: any) => {
  const deal: Deal = req.body;

  const doc = new PDFDocument({ bufferPages: true });

  let buffers: any = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {

    let pdfData = Buffer.concat(buffers);

    const values = {
      'Content-Length': Buffer.byteLength(pdfData),
      'Content-Type': 'application/pdf',
      'Content-disposition': 'attachment;filename=test.pdf',
    }
    // console.log(pdfData);

    // var data = fs.readFileSync(pdfData);
    // console.log(data)
    result({ success: true, values: values, pdfData: pdfData, size: Buffer.byteLength(pdfData) })

  });


  // Embed a font, set the font size, and render some text

  const BOLD: string = "Helvetica-Bold";
  const MAIN_FONT_SIZE = 10;


  doc.addPage({
    margin: 40,
    continued: true
  })
  doc.fontSize(12).font(BOLD).text("RESIDENTIAL LEASE AGREEMENT ", {

    align: "center"
  }
  )

  doc.moveDown();
  doc
    .fontSize(MAIN_FONT_SIZE)
    .text(
      "THIS LEASE AGREEMENT (hereinafter referred to as the “Agreement”) made and entered on _____________ "
      + " by and between ____________________________________________________________, whose address is "
      + " _________________________________________________________ (hereinafter referred to as “Landlord”) and "
      + " _________________________________________________________________________________ (Jointly and Severally) "
      + " (hereinafter referred to as “Tenant(s)”). "
      + "WHEREAS, Landlord is the fee owner of certain real property being, lying and situated in _____________, Massachusetts, such "
      + "real property having a mailing address of ___________________________________________________________________ "
      + "(hereinafter referred to as the “Premises”). "
      + " WHEREAS, Landlord desires to lease the Premises to Tenant upon the terms and conditions as contained herein; and "
      + " WHEREAS, Tenant desires to lease the Premises from Landlord on the terms and conditions as contained herein; "
      + " NOW, THEREFORE, for and in consideration of the covenants and obligations contained herein and other good and valuable "
      + "consideration, the receipt and sufficiency of which is hereby acknowledged, the parties hereto hereby agree as follows: ", { align: "left" })

  doc.text("\n")
  doc.fontSize(MAIN_FONT_SIZE).text("1. ", { continued: true })

  doc.fontSize(MAIN_FONT_SIZE).font(BOLD).text("TERM. ", { continued: true })

  doc.fontSize(MAIN_FONT_SIZE).text("Landlord leases to Tenant, and Tenant leases from Landlord, the above described Premises together with any and all"
    + "appurtenances thereto, for a term of months, such term beginning on , and ending at 12 o’clock midnight on"
    + "___________________________.")

  doc.text("\n")

  doc.fontSize(MAIN_FONT_SIZE).text("2. ", { continued: true })

  doc.fontSize(MAIN_FONT_SIZE).font(BOLD).text("RENT. ", { continued: true })

  doc.fontSize(MAIN_FONT_SIZE).text(
    "The term rent shall be ____________, payable, except as herein otherwise provided, in installments of _________ on the "
    + " __________ day of every month, in advance, so long as this lease is in force and effect. All such payments shall be made to "
    + "Landlord at Landlord’s address as set forth in the preamble to this Agreement on or before the due date and without demand. "
    + "Tenants and guarantors understand that any failure to pay rent will be reported to all three national credit bureaus.")

  doc.text("\n")

  doc.fontSize(MAIN_FONT_SIZE).text("3. ", { continued: true })

  doc.fontSize(MAIN_FONT_SIZE).font(BOLD).text("SECURITY DEPOSIT. ", { continued: true })

  doc.fontSize(MAIN_FONT_SIZE).text(
    +"Upon the due execution of this Agreement, Landlord acknowledges that Tenant has deposited with "
    + "Landlord the sum of ($ .00), as security deposit. Such deposit is "
    + "being held in the event there is damage to the premises, in the event damages exceed the amount of the deposit being held, Tenant "
    + "will be responsible for the remaining amount. "
  )

  doc.text("\n")

  doc.fontSize(MAIN_FONT_SIZE).text("4. ", { continued: true })

  doc.fontSize(MAIN_FONT_SIZE).font(BOLD).text("LAST MONTH'S. ", { continued: true })

  doc.fontSize(MAIN_FONT_SIZE).text("Upon the due execution of this Agreement, Landlord acknowledges that Tenant has deposited with "
    + "Landlord the sum of ($ .00), as security deposit. Such deposit shall "
    + "be used as last month's rent. ")





  doc.text("\n")

  doc.fontSize(MAIN_FONT_SIZE).text("5. ", { continued: true })

  doc.fontSize(MAIN_FONT_SIZE).font(BOLD).text("USE OF PREMISES. ", { continued: true })

  doc.fontSize(MAIN_FONT_SIZE).text(
    "The Premises shall be used and occupied by Tenant and Tenant’s immediate family, consisting of "
    + "ALL ROOMS THEREIN, exclusively, as a private home in a multifamily dwelling, and no part of the Premises shall be "
    + "used at any time during the term of this Agreement by Tenant for the purpose of carrying on any business, profession, or trade of "
    + "any kind, or for any purpose other than as a private multi family dwelling. Tenant shall not allow any other person, other than "
    + "Tenant’s immediate family or transient relatives and friends who are guests of Tenant, to use or occupy the Premises without first "
    + "obtaining Landlord’s written consent to such use. Tenant shall comply with any and all laws, ordinances, rules and orders of any "
    + "and all governmental or quasi-governmental authorities affecting the cleanliness, use, occupancy and preservation of the "
    + "Premises.")

  doc.text("\n")

  doc.fontSize(MAIN_FONT_SIZE).text("6. ", { continued: true })

  doc.fontSize(MAIN_FONT_SIZE).font(BOLD).text("CONDITION OF PREMISES.", { continued: true })

  doc.fontSize(MAIN_FONT_SIZE).text(

    "Tenant stipulates, represents and warrants that Tenant has examined the Premises, and that they "
    + "are at the time of this Lease in good order, repair, and in a safe, clean and tenantable condition.")

  doc.text("\n")


  doc.fontSize(MAIN_FONT_SIZE).text("7. ", { continued: true })

  doc.fontSize(MAIN_FONT_SIZE).font(BOLD).text("ASSIGNMENT AND SUBLETTING.", { continued: true })

  doc.fontSize(MAIN_FONT_SIZE).text(

    " Tenant shall not assign this Agreement, or sub-let or grant any license to use the "
    + "Premises or any part thereof without the prior written consent of the Landlord. A consent by Landlord to one such assignment, "
    + "sub-letting or license shall not be deemed to be a consent to any subsequent assignment, sub-letting or license. An assignment, "
    + "sub-letting or license without the prior written consent of Landlord or an assignment or subletting by operation of law shall be "
    + "absolutely null and void and shall, at Landlord’s option, terminate this Agreement. Absolutely no Airbnb or any type of short "
    + "term rental allowed for this apartment.")



  doc.addPage({
    margin: 40,
    continued: true
  })


  doc.fontSize(MAIN_FONT_SIZE).text("7. ", { continued: true })

  doc.fontSize(MAIN_FONT_SIZE).font(BOLD).text("ASSIGNMENT AND SUBLETTING.", { continued: true })

  doc.fontSize(MAIN_FONT_SIZE).text(

    " Tenant shall not assign this Agreement, or sub-let or grant any license to use the "
    + "Premises or any part thereof without the prior written consent of the Landlord. A consent by Landlord to one such assignment, "
    + "sub-letting or license shall not be deemed to be a consent to any subsequent assignment, sub-letting or license. An assignment, "
    + "sub-letting or license without the prior written consent of Landlord or an assignment or subletting by operation of law shall be "
    + "absolutely null and void and shall, at Landlord’s option, terminate this Agreement. Absolutely no Airbnb or any type of short "
    + "term rental allowed for this apartment.")
  // Add an image, constrain it to a given size, and center it vertically and horizontally
  /*doc.image('path/to/image.png', {
    fit: [250, 300],
    align: 'center',
    valign: 'center'
  });*/

  // Add another page
  doc.addPage()
    .fontSize(25)
    .text('Here is some vector graphics...', 100, 100);

  // Draw a triangle
  doc.save()
    .moveTo(100, 150)
    .lineTo(100, 250)
    .lineTo(200, 250)
    .fill("#FF3300");

  // Apply some transforms and render an SVG path with the 'even-odd' fill rule
  doc.scale(0.6)
    .translate(470, -380)
    .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
    .fill('red', 'even-odd')
    .restore();

  // Add some text with annotations
  doc.addPage()
    .fillColor("blue")
    .text('Here is a link!', 100, 100)
    .underline(100, 100, 160, 27, { color: "#0000FF" })
    .link(100, 100, 160, 27, 'http://google.com/');

  // Finalize PDF file
  doc.end();

}

