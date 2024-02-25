import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginSlice from '../pages/auth/Login/redux/loginSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tokenSlice from './slices/tokenSlice';
import signUpSlice from '../pages/auth/signUp/redux/signUpSlice';
import siteSlice from './slices/siteSlice';

// ...
const rootReducer = combineReducers({
  login: loginSlice,
  signUp: signUpSlice,
  token: tokenSlice,
  sites: siteSlice,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
