import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  appData: {},
  selectedApp: -1,
};

export const appSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    setSelectedApp: (state, action) => {
      if (action.payload == -1) {
        state.appData = {};
      }
      state.selectedApp = action.payload;
      state.appData = state.list[action.payload];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAppData: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setLoading, setAppData, setSelectedApp } = appSlice.actions;

export default appSlice.reducer;
