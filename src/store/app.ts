import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  wirebuffers: WireBuffer[];
  meshbuffers: MeshBuffer[];
}

const initialState: AppState = {
  wirebuffers: [],
  meshbuffers: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    clear: (state) => {
      state.meshbuffers = [];
      state.wirebuffers = [];
    },
    addMeshes(state, action: PayloadAction<MeshBuffer[]>) {
      state.meshbuffers = [...state.meshbuffers, ...action.payload];
    },
    addWires(state, action: PayloadAction<WireBuffer[]>) {
      state.wirebuffers = [...state.wirebuffers, ...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { clear, addMeshes, addWires } = appSlice.actions;

export default appSlice.reducer;
