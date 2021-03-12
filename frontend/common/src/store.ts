import { configureStore, ThunkAction, Action, Middleware, createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export default store;