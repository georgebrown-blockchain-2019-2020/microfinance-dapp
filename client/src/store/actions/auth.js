import * as actionTypes from "./actionTypes";
import Web3 from "web3";
export const auth = () => {
  return async dispatch => {
    dispatch(authStart());
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      dispatch(authSuccess(accounts[0]));
      // dispatch(getInforSuccess("Leo"));
    } catch (error) {
      dispatch(authFail(error.message));
    }
  };
};
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};
export const authSuccess = contractAddr => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    contractAddr: contractAddr
  };
};
export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};
export const getInfor = infor => {
  return async dispatch => {
    console.log(infor);
    dispatch(getInforStart());
    setTimeout(() => {
      dispatch(getInforSuccess(infor));
      dispatch(setDirectPath("/"));
    }, 1000);
  };
};
export const getInforStart = () => {
  return {
    type: actionTypes.GET_INFORMATION_START
  };
};

export const getInforSuccess = infor => {
  return {
    type: actionTypes.GET_INFORMATION_SUCCESS,
    infor: infor
  };
};

export const getInforFail = error => {
  return {
    type: actionTypes.GET_INFORMATION_FAIL,
    error: error
  };
};

export const setDirectPath = path => {
  return {
    type: actionTypes.SET_DIRECT_PATH,
    path: path
  };
};
