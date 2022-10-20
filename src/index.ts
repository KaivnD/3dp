import {
  DisplayPortal,
  DisplayPortalInstance,
} from "./components/DisplayPortal";
import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./store";
import { clear, addMeshes, addWires } from "./store/app";
import { Provider } from "react-redux";

export default function render(
  el: HTMLDivElement,
  meshbuffers: MeshBuffer[],
  wirebuffers: WireBuffer[],
  option?: DisplayPortalOption
) {
  const e = React.createElement;

  store.dispatch(addMeshes(meshbuffers));
  store.dispatch(addWires(wirebuffers));

  ReactDOM.createRoot(el).render(
    e(
      React.StrictMode,
      null,
      e(Provider, {
        store,
        children: [e(DisplayPortal, { option })],
      })
    )
  );

  return {
    clear() {
      store.dispatch(clear());
    },
    addMeshes(buffer: MeshBuffer[]) {
      store.dispatch(addMeshes(buffer));
    },
    addWires(buffer: WireBuffer[]) {
      store.dispatch(addWires(buffer));
    },
  };
}

export { DisplayPortal };
