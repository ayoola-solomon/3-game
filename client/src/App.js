import React from "react";

import { Layout } from "components/Layout";
import { Game } from "components/Game";
import { Home } from "components/Home";

export const App = () => (
  <Layout>
    <Home />
    <Game />
  </Layout>
);
