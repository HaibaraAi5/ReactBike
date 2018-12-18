/**
 * reducer
 */

// import { combineReducers } from 'redux'
import { type } from "../action";
const bikesData = (state, action) => {
  switch (action.type) {
    case type.SWITCH_MENU:
      return {
        ...state,
        menuName: action.menuName,
        loginFlag: false
      };
    default:
      return { ...state };
  }
};

export default bikesData;
