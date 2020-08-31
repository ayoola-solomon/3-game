import React from "react";

import { LayoutWrapper, Main } from "./Layout.styles";

export const Layout = ({ children }) => (
  <LayoutWrapper>
    <Main>{children}</Main>
  </LayoutWrapper>
);
