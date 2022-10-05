import { DisplayPortal } from "./components/DisplayPortal";
import React from "react";
import ReactDOM from "react-dom/client";

export default function render(
  el: HTMLDivElement,
  meshbuffers: MeshBuffer[],
  wirebuffers: WireBuffer[],
  option?: DisplayPortalOption
) {
  const e = React.createElement;

  ReactDOM.createRoot(el).render(
    e(React.StrictMode, null, e(DisplayPortal, { meshbuffers, wirebuffers, option }))
  );
}

export { DisplayPortal };
