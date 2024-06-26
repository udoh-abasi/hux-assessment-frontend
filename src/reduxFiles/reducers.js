import { createReducer } from "@reduxjs/toolkit";
import { userAction } from "./actions";

// So, we set the initial value to null
const initialValue = { userEmail: null };

export const userReducer = createReducer(initialValue, (builder) => {
  builder.addCase(userAction, (state, action) => {
    const { payload } = action;
    return { ...state, ...payload };
  });
});
