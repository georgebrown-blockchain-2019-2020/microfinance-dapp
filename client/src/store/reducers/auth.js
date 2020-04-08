import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../scripts/utility";
const initialState = {
  contractAddr: null,
  infor: null,
  error: null,
  loading: false,
  authRedirectPath: "/"
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
const authSuccess = (state, action) => {
  return updateObject(state, {
    contractAddr: action.contractAddr,
    loading: false
  });
};
const authFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const getInforSuccess = (state, action) => {
  return updateObject(state, {
    infor: action.infor,
    loading: false
  });
};
const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
    case actionTypes.GET_INFORMATION_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
    case actionTypes.GET_INFORMATION_FAIL:
      return authFail(state, action);
    case actionTypes.GET_INFORMATION_SUCCESS:
      return getInforSuccess(state, action);
    case actionTypes.SET_DIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};
