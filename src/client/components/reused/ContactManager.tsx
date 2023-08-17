import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";


enum Status {
  SHOWING,
  PENDING,
  SUCCESS,
  FAILURE
}

type Props = {
  textGhost: string;
  mlsID?: string;
  customSubject?: string;
}

const ContactManager = (props: Props) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [body, setBody] = useState("");
  const [canSubmit, setCanSubmit] = useState(null);
  const [showingStatus, setShowingStatus] = useState(Status.SHOWING);
  const [buttonClicked, setButtonClicked] = useState(false);


  function sendEmail() {
    setButtonClicked(true);

    if (!name && (!email || !phone)) {
      setCanSubmit(false);


    } else {
      setCanSubmit(true);

      setShowingStatus(Status.PENDING);
      //If the body is blank the just send the placeholder text
      let bodyText = props.textGhost;
      if (body) {
        bodyText = body;
      }
      fetch("/email/contactus", {
        method: 'post',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "name": name,
          "phone": phone,
          "email": email,
          "text": bodyText,
          "mlsID": props.mlsID,
          "customSubject": props.customSubject
        })
      })
        .then(res => res.json())
        .then(
          (result) => {
            if (result.success) {
              setShowingStatus(Status.SUCCESS);
            }
            else {
              setShowingStatus(Status.FAILURE);
            }
          },

          (error) => {

          }
        )
    }
  }

  function changeName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }
  function changePhone(event: React.ChangeEvent<HTMLInputElement>) {
    setPhone(event.target.value);
  }
  function changeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }
  function changeBody(event: React.ChangeEvent<HTMLInputElement>) {
    setBody(event.target.value);
  }

  let contactBody;

  if (showingStatus === Status.SHOWING) {
    contactBody = <>


      <h1 className="contact-header">CONTACT US</h1>
      <p>Fill in the form below and we will get back to you.</p>
      <div className="contact-container">
        <TextField
          onChange={changeName}
          className="contact-text"
          name="name"
          label="Name"
          type="text"
          value={name}
          variant="outlined"
        />

        <TextField
          onChange={changeEmail}
          className="contact-text"
          name="email"
          label="Email"
          type="text"
          value={email}
          variant="outlined"
        />

        <TextField
          onChange={changePhone}
          className="contact-text"
          name="phone"
          label="Phone"
          type="text"
          value={phone}
          variant="outlined"
        />

        <br />
        <TextField
          onChange={changeBody}
          multiline
          label={props.textGhost}
          rows={4}
          rowsMax={4}
          type="text"
          variant="outlined"
          value={body}
          style={{ width: "100%", marginTop: "20px" }}
        />
        <br />
        <button onClick={sendEmail}>Submit</button>
        {!canSubmit && buttonClicked ?
          <div style={{ color: "red" }}>Please fill in a name as well as an (email or phone).</div> : <></>
        }
      </div></>
  } else if (showingStatus === Status.SUCCESS) {
    contactBody = <span className="contact-header-span">THANK YOU! WE WILL GET BACK TO YOU SHORTLY!</span>;
  } else if (showingStatus === Status.PENDING) {
    contactBody = <span className="contact-header-span">SENDING...</span>;
  } else if (showingStatus === Status.FAILURE) {
    contactBody = <span className="contact-header-span">I'M SORRY. SOMETHING WENT WRONG WHEN SENDING THIS EMAIL.</span>;
  }


  return (

    <React.Fragment>
      {contactBody}
    </React.Fragment>
  );
};

export default ContactManager;
