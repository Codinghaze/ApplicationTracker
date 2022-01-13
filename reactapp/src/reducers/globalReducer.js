import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  expanded: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setExpanded: (state, action) => {
      state.expanded = action.payload;
    },
  },
});

export const { setLoading, setExpanded } = globalSlice.actions;

export default globalSlice.reducer;
