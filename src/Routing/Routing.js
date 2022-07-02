import React, { useEffect } from "react";
import { Route } from "react-router-dom";

export function PrivateRoute({ component: Component, ...rest }) {
  useEffect(() => {
    if (!localStorage.getItem("auth_id1")) {
      window.location = "/";
    }
  }, []);

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
