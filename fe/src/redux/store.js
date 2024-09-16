import { loader } from "./loaderReducer";
import { configureStore } from "@reduxjs/toolkit";
import { user } from "./userReducer";
import { search } from "./searchReducer";

const store = configureStore({
  reducer: {
    loaders: loader.reducer,
    users: user.reducer,
    searches: search.reducer,
  },
});

export default store;