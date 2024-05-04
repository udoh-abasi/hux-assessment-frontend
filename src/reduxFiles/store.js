import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers";

// Here, we set up a redux store
const store = configureStore({
  reducer: { user: userReducer },
});

export default store;
