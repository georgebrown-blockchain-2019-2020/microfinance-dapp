import * as actionTypes from "./actionTypes";
import Web3 from "web3";
import { database } from "../../firebase/FireBaseRef";
export const auth = () => {
  return async dispatch => {
    dispatch(authStart());
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      const data = database.ref("infor");
      await data
        .orderByChild("userAddr")
        .equalTo(accounts[0])
        .on("child_added", function(snapshot) {
          const data = { ...snapshot.val(), key: snapshot.key };
          dispatch(getInforSuccess(data));
          dispatch(setDirectPath("/"));
        });
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
export const authSuccess = address => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    address: address
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
