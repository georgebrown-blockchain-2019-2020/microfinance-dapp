import contractInfo from "./contractInfo";

export const isParticipated = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let isParticipated = await contractInfo.methods.checkParticipate().call();
      resolve(isParticipated);
    } catch (error) {
      reject(error);
    }
  });
};
export const getParticipants = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let participants = await contractInfo.methods.checkParticipate().call();
      resolve(participants);
    } catch (error) {
      reject(error);
    }
  });
};
export const register = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await contractInfo.methods
        .register()
        .send()
        .once("receipt", async result => {
          resolve("success");
        });
    } catch (error) {
      reject(error);
    }
  });
};
export const getRequestByAddress = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let request = await contractInfo.methods.getRequestDebt().call();
      resolve(request);
    } catch (error) {
      reject(error);
    }
  });
};
export const getActiveDebt = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let activeDebt = await contractInfo.methods.getActiveDebt().call();
      resolve(activeDebt);
    } catch (error) {
      reject(error);
    }
  });
};
export const getDebtHistory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let debtHistory = await contractInfo.methods.getDebtHistory().call();
      resolve(debtHistory);
    } catch (error) {
      reject(error);
    }
  });
};
export const checkBorrowingStatus = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let isBorrowing = await contractInfo.methods
        .checkBorrowingStatus()
        .call();
      resolve(isBorrowing);
    } catch (error) {
      reject(error);
    }
  });
};
export const checkBorrowingStatus = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let isBorrowing = await contractInfo.methods
        .checkBorrowingStatus()
        .call();
      resolve(isBorrowing);
    } catch (error) {
      reject(error);
    }
  });
};
