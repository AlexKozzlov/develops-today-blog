import { configureStore, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { Action } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { blogReduser } from "../redux/reducers/blogReducer";

export const postSlice = createSlice({
  name: "blogReduser",

  initialState: [] as any,

  reducers: {
    setEnt(state, action) {
      return action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.subject,
      };
    },
  },
});

const makeStore = () =>
  configureStore({
    reducer: {
      blogReduser,
    },

    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const fetchSubject =
  (id: any): AppThunk =>
  async (dispatch) => {
    const timeoutPromise = (timeout: number) =>
      new Promise((resolve) => setTimeout(resolve, timeout));

    await timeoutPromise(200);
    dispatch(
      postSlice.actions.setEnt({
        [id]: {
          id,
          name: `Subject ${id}`,
        },
      })
    );
  };

export const wrapper = createWrapper<AppStore>(makeStore);

export const selectSubject = (id: any) => (state: AppState) =>
  state?.[postSlice.name]?.[id];
