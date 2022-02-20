import React, { useEffect, useState, useLayoutEffect } from "react";
import "./styles.css";
import { Router, Route, Routes } from "react-router-dom";
import history from "./history";
import routes from "./router";
import AuthRoute from "./utils/AuthRoute";
import UnAuthRoute from "./utils/UnAuthRoute";
import { auth } from "./constants/firebase";

export default function App() {
  // Monitor and Update user state.
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // store user
        localStorage.setItem("user", JSON.stringify(user));

        console.log("User detected.");
      } else {
        console.log("No user detected");
      }
    });
  }, []);
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.link}
            element={
              route.protected ? (
                <AuthRoute path={route.link}>
                  <route.component />
                </AuthRoute>
              ) : (
                <UnAuthRoute>
                  <route.component />
                </UnAuthRoute>
              )
            }
          />
        ))}
      </Routes>
    </Router>
  );
}
