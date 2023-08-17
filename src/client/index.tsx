import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";

const Header = React.lazy(() => import("./components/Header"));
const Footer = React.lazy(() => import("./components/Footer"));
const Body = React.lazy(() => import("./components/Body"));
const BodyAdmin = React.lazy(() => import("./components/admin/Body"));
const Login = React.lazy(() => import("./components/admin/Login"));
const ScrollToTop = React.lazy(() => import("./components/ScrollToTop"));
const TokenCheck = React.lazy(() => import("./components/TokenCheck"));

import "./App.css";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div></div>}>
      <Router>
        <ScrollToTop>
          <Switch>
            {/* <Route exact path="/" component={Landing} /> */}
            <Route exact path="/login/">
              {localStorage.getItem("token") ? (
                <Redirect to="/admin/deallist" />
              ) : (
                <Login />
              )}
            </Route>

            <Route exact path="/admin*">
              <TokenCheck>
                {!localStorage.getItem("token") ? (
                  <Redirect to="/login" />
                ) : (
                  <>
                    <Header isBackend={true} />
                    <div className="container">
                      <BodyAdmin />
                    </div>
                    <Footer />
                  </>
                )}
              </TokenCheck>
            </Route>

            <Route exact path="/*">
              <Header isBackend={false} />

              <div className="container">
                <Body />
              </div>

              <Footer />
            </Route>
          </Switch>
        </ScrollToTop>
      </Router>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
