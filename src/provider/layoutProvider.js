import React from "react";
import { UserProvider } from "./userProvider";
import { InsumoProvider } from "./insumoProvider";
import { ZonaProvider } from "./zonaProvider";

const EllayoutProvider = () => {
  return (
    <UserProvider>
      <InsumoProvider>
        <ZonaProvider></ZonaProvider>
      </InsumoProvider>
    </UserProvider>
  );
};

export default EllayoutProvider;
