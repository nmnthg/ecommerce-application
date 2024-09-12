import { createSlice } from "@reduxjs/toolkit";


export const USER_INITIAL_STATE = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState: USER_INITIAL_STATE,
  reducers: {
    setCurrentUser:(state, action) => { //this creates both the action type setCurrentUser and the action 
      state.currentUser = action.payload; //state is still immutable in the background, this mutable syntax is just redux toolkit
    }
  }
});

export const { setCurrentUser } = userSlice.actions; //destructure off the action, to be dispatched in components
export const userReducer = userSlice.reducer; //


// export const userReducerOld = (state = USER_INITIAL_STATE, action = {}) => {
//   const { type, payload } = action;

//   switch (type) {
//     case USER_ACTION_TYPES.SET_CURRENT_USER:
//       return { ...state, currentUser: payload };
//     default:
//       return state;
//   }
// };