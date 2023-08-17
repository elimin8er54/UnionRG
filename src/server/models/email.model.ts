const nodeMailer = require('nodemailer');

type RequestInfo = {
  mlsID?: string,
  customSubject: string,
  phone: string,
  name: string,
  text: string,
  email: string
}

export const emailContact = (emailInfo: RequestInfo, result: any) => {

  //Optional prop from React
  let mlsInfo = ""
  if (emailInfo.mlsID) {
    mlsInfo = "\n\n MLS ID: " + emailInfo.mlsID;
  } else {
    mlsInfo = "";
  }

  //Optional prop from React
  let customSubject = ""
  if (emailInfo.customSubject) {
    customSubject = emailInfo.customSubject;
  } else {
    customSubject = 'New Contact - ' + emailInfo.name;

  }

  var transporter = nodeMailer.createTransport({
    host: 'smtp.privateemail.com',
    port: 587,

    auth: {
      user: 'info@unionrg.com',
      pass: '@BLACKbox'
    }
  });

  var mailOptions = {
    from: 'info@unionrg.com',
    to: 'info@unionrg.com',
    subject: customSubject,
    text: "Phone: " + emailInfo.phone + '\nEmail: ' + emailInfo.email + '\n\nBody: ' + emailInfo.text + mlsInfo
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      result({ success: false }, null);
    } else {
      result(null, { success: true });

    }
  });


}

