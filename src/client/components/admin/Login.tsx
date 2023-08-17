import React, { useState } from "react";
import "../../App.css";

interface Props {}

const Login: React.FC<Props> = (props: Props): React.ReactElement<Props> => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handleInputPasswordChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setPassword(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    fetch("/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          document.location.href = "/admin/deallist";
        } else {
          setPassword("");
          setNotice("Incorrect login information");
        }
      });
    event.preventDefault();
  }

  return (
    <div className="login">
     <span style = {{color:"red"}}>Login for test site.</span> <p>Username: Shaunt</p>  Password: <span>Kesh</span>
      <h4>Sign-In: </h4>
      <form onSubmit={handleSubmit}>
        <p className="loginerror">{notice}</p>
        Username
        <input
          className="login_username"
          name="username"
          type="text"
          onChange={handleInputChange}
          value={username}
        />
        Password
        <input
          className="login_password"
          name="password"
          type="password"
          onChange={handleInputPasswordChange}
          value={password}
        />
        <input className="login_button" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
