import { createAction } from "@reduxjs/toolkit";

// NOTE: The user passed in to here will be an object of the format { userEmail: "udoh@gmail.com" }
export const userAction = createAction("USER_ACTION", (user) => {
  return { payload: user };
});
