import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Loading from "../../component/Loading/Loading";
import { database } from "../../firebase/FireBaseRef";
import { connect } from "react-redux";
import BN from "bn.js";
import {
  requestLoan,
  getStateofDebt,
  getLenderofDebt,
  getInterestofDebt,
  payLoan,
  getWalletBalance,
  getLendHistory,
  getBorrowerofDebt,
  withDraw
} from "../../blockchain/contractInteract";
import * as actions from "../../store/actions/index";
import Swal from "sweetalert2";
import "./AccountPage.scss";
function AccountPage(props) {
  const { infor, address, onSetInfor, reduxLoading } = props;
  const [information, setInformation] = useState({
    name: "",
    address: "",
    phone: ""
  });
  const [debt, setDebt] = useState({
    amount: "",
    reason: "",
    state: -1,
    lender: ""
  });
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [debtors, setDebtors] = useState([]);
  const handleChangeInfor = input => event => {
    const updatedProfile = { ...information };
    updatedProfile[input] = event.target.value;
    setInformation(updatedProfile);
  };
  const handleChangeDebt = input => event => {
    const updatedProfile = { ...debt };
    updatedProfile[input] = event.target.value;
    setDebt(updatedProfile);
  };
  useEffect(() => {
    const data = database.ref("debt");
    let result;
    data
      .orderByChild("borrower")
      .equalTo(address)
      .on("child_added", async function(snapshot) {
        const state = await getStateofDebt(snapshot.val().debtNo);
        console.log(state);
        if (parseInt(state) === 0) {
          result = {
            amount: snapshot.val().amount,
            reason: snapshot.val().reason,
            state: 0,
            lender: "",
            debtNo: snapshot.val().debtNo
          };
          console.log("hello");
          setDebt(result);
        } else if (parseInt(state) === 1) {
          const lender = await getLenderofDebt(snapshot.val().debtNo);
          const interest = await getInterestofDebt(snapshot.val().debtNo);
          result = {
            amount: snapshot.val().amount,
            reason: snapshot.val().reason,
            lender: lender,
            interest: interest,
            state: 1,
            debtNo: snapshot.val().debtNo
          };
          setDebt(result);
        }
      });
    getWalletBalance(address).then(result => {
      setWalletBalance(result);
    });
    getLendHistory(address).then(async result => {
      let list = [];
      for (let i = 0; i < result.length; i++) {
        let state = await getStateofDebt(result[i]);
        if (parseInt(state) === 1) {
          let borrower = await getBorrowerofDebt(result[i]);
          list.push(borrower);
        }
      }
      setDebtors(list);
    });
  }, [address]);
  useEffect(() => {
    if (infor) {
      setInformation(infor);
    }
  }, [infor]);
  const validUpdateInfo =
    information.name !== infor.name ||
    information.address !== infor.address ||
    information.phone !== infor.phone;
  console.log(validUpdateInfo);
  const updateInfo = () => {
    setLoading(true);
    onSetInfor({ ...information, userAddr: infor.userAddr, key: infor.key });
    database.ref("infor/" + infor.key).set(
      {
        ...information,
        userAddr: infor.userAddr
      },
      function(error) {
        setLoading(false);
        if (error) {
          // The write failed...
        } else {
          // Data saved successfully!
        }
      }
    );
  };
  const requestDebt = async () => {
    setLoading(true);
    try {
      const result = await requestLoan(debt.amount);
      const debtNo = result.events[0].raw.data.slice(0, 66);
      const data = {
        amount: debt.amount,
        reason: debt.reason,
        borrower: address,
        debtNo: debtNo
      };
      database.ref("debt").push(data);
      data.state = 0;
      setDebt(data);
      Swal.fire({
        icon: "success",
        title: "You requested successfully"
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message
      });
    }
    setLoading(false);
  };
  const payDebt = async () => {
    setLoading(true);
    console.log(new BN(debt.amount));
    const amount = new BN(debt.amount).add(new BN(debt.interest));
    console.log(amount.toString());
    console.log(debt.debtNo);
    await payLoan(debt.debtNo, amount.toString());
    Swal.fire({
      icon: "success",
      title: "You paid successfully",
      text: "Reward 10 Heart Token"
    });
    setLoading(false);
    setDebt({ amount: "", reason: "", state: -1, lender: "" });
  };
  const withDrawWallet = async () => {
    setLoading(true);
    await withDraw(walletBalance);
    getWalletBalance(address).then(result => {
      setWalletBalance(result);
    });
    setLoading(false);
  };
  console.log(debt.state);
  return (
    <div className="account">
      {(reduxLoading || loading) && <Loading />}
      <Grid container spacing={3} className="account__container">
        <Grid item lg={6} xs={12}>
          <Paper className="account__infor">
            <h2>Information</h2>
            <TextField
              label="Name"
              variant="outlined"
              className="account__input"
              value={information.name}
              onChange={handleChangeInfor("name")}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              className="account__input"
              value={information.phone}
              onChange={handleChangeInfor("phone")}
            />
            <TextField
              label="Address"
              variant="outlined"
              className="account__input"
              value={information.address}
              onChange={handleChangeInfor("address")}
            />
            <Button
              variant="contained"
              className="account__btn"
              disabled={!validUpdateInfo}
              onClick={updateInfo}
            >
              Update
            </Button>
          </Paper>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Paper className="account__request">
            <h2>{!!debt.lender ? "Request" : "Debt"}</h2>
            <TextField
              label="Eth"
              variant="outlined"
              className="account__input"
              value={debt.amount}
              onChange={handleChangeDebt("amount")}
              disabled={debt.state !== -1}
            />
            <TextField
              label="Reason"
              variant="outlined"
              className="account__input"
              value={debt.reason}
              onChange={handleChangeDebt("reason")}
              disabled={debt.state !== -1}
            />
            {!!debt.lender && (
              <React.Fragment>
                <TextField
                  label="Interest"
                  variant="outlined"
                  className="account__input"
                  value={debt.interest}
                  onChange={handleChangeDebt("interest")}
                  disabled
                />
                <TextField
                  label="Lender"
                  variant="outlined"
                  className="account__input"
                  value={debt.lender}
                  onChange={handleChangeDebt("lender")}
                  disabled
                />
              </React.Fragment>
            )}
            <Button
              variant="contained"
              className="account__btn"
              onClick={debt.state === -1 ? requestDebt : payDebt}
              disabled={debt.state === 0}
            >
              {debt.state === 0
                ? "Requested"
                : debt.state === 1
                ? "Pay"
                : "Submit"}
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className="account">
            <h2>
              Wallet: <span>{walletBalance} ETH</span>
              <Button
                variant="contained"
                className="account__btn--pay"
                disabled={!walletBalance}
                onClick={withDrawWallet}
              >
                Withdraw
              </Button>
            </h2>
            <Divider />
            <h2>
              {debtors.length === 0 ? (
                "No Debtors"
              ) : (
                <div>
                  Debtors:
                  <span>{debtors.join(", ")}</span>
                </div>
              )}
            </h2>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    address: state.address,
    infor: state.infor,
    reduxLoading: state.loading,
    error: state.error,
    authRedirectPath: state.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetInfor: infor => dispatch(actions.getInfor(infor))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
