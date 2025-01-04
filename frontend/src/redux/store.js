// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import userReducer from "./userSlice";
// import jobsReducer from "./jobSlice"; // Import the jobs reducer

// // Persist config
// const persistConfig = {
//   key: "root",
//   storage,
// };

// // Persist user reducer
// const persistedUserReducer = persistReducer(persistConfig, userReducer);

// const store = configureStore({
//   reducer: {
//     user: persistedUserReducer, // Persisted user reducer
//     jobs: jobsReducer, // Non-persisted jobs reducer
//   },
// });

// const persistor = persistStore(store);

// export { store, persistor };






import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import jobsReducer from "./jobSlice"; // Import the jobs reducer

// Persist config
const persistConfig = {
  key: "userToken", // Unique key for the persisted state
  storage,
  whitelist: ["mpsp"], // Only persist the 'token' field from the user state
};

// Persist user reducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer, // Persisted user reducer
    jobs: jobsReducer, // Non-persisted jobs reducer
  },
});

const persistor = persistStore(store);

export { store, persistor };