import React from "react";

export const Image = ({ name, ...props }) => (
  <img
    src={`/img/${name}.png`}
    srcSet={`/img/${name}.png, /img/${name}@2x.png 2x, /img/${name}@3x.png 3x`}
    alt={name}
    {...props}
  />
);
