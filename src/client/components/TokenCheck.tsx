import React, { useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { checkToken } from "../javascript/JWTAuth";

//Check if token is valid on componenet load/each click/ and timer

//IF YOU CHANGE THIS MAKE SURE TO CHANGE THE SERVER CHECK TOO. authJwt.ts
const QUARTER_HOUR = 1000 * 60 * 15;
function TokenCheck({ children }: any) {
  checkToken();
  useEffect(() => {
    const unlisten = setInterval(function () {
      checkToken();
    }, QUARTER_HOUR);
    const unlisten2 = (document.body.onclick = () => {
      checkToken();
    });
    return () => {
      unlisten2;
      clearInterval(unlisten);
    };
  }, []);

  return <Fragment>{children}</Fragment>;
}

export default withRouter(TokenCheck);
