import { createSlice, configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

// export default store;
export const shareDataSlice = createSlice({
  name: 'UPDATE_SHARED_DATA',
  initialState: {
    data: {}
  },
  reducers: {
    updateSharedData: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log('UPDATE_SHARED_DATA', action.payload.data)
      state = {...action.payload.data};
      console.log('UPDATE_SHARED_DATA_STATE', state)
      return {...action.payload.data}
    },
  }
})

export const makeStore = () => configureStore({
  reducer: {
    UPDATE_SHARED_DATA: shareDataSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);

export const selectSharedData = (state: any) => state.UPDATE_SHARED_DATA.data;

export const {  updateSharedData } = shareDataSlice.actions

export default shareDataSlice.reducer