import React from "react";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import { Contacts, Page403, Page404 } from "../pages";
import { BaseLayout } from "../components/layout";

export const Routes = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={() => (
        <BaseLayout>
          <Contacts />
        </BaseLayout>
      )}
    />
    <Route
      exact
      path="/contacts"
      render={() => (
        <BaseLayout>
          <Contacts />
        </BaseLayout>
      )}
    />
    <Route exact path="/403" component={Page403} />
    <Route path="*" component={Page404} />
    <Redirect to="/" />
  </Switch>
);