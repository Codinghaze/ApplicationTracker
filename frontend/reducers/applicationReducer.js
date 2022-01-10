import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const appSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = appSlice.actions;

export default appSlice.reducer;
