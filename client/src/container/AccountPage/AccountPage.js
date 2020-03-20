import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import "./AccountPage.scss";
function AccountPage() {
  return (
    <div className="account">
      <Grid container spacing={3} className="account__container">
        <Grid item lg={6} xs={12}>
          <Paper className="account__infor">
            <h2>Information</h2>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              className="account__input"
            />
            <TextField
              id="outlined-basic"
              label="Number"
              variant="outlined"
              className="account__input"
            />
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              className="account__input"
            />
            <Button variant="contained" className="account__btn">
              Submit
            </Button>
          </Paper>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Paper className="account__request">
            <h2>Request</h2>
            <TextField
              id="outlined-basic"
              label="Eth"
              variant="outlined"
              className="account__input"
            />
            <TextField
              id="outlined-basic"
              label="Reason"
              variant="outlined"
              className="account__input"
            />
            <Button variant="contained" className="account__btn">
              Submit
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className="account">
            <h2>
              Wallet: <span>5 ETH</span>
              <Button variant="contained" className="account__btn--pay">
                Withdraw
              </Button>
            </h2>
            <Divider />
            <h2>
              Lender: <span>0x9d89b590218A45B43B7be1e58F7Bcc16EC45537A</span>
            </h2>
            <Button variant="contained" className="account__btn--pay">
              Pay
            </Button>
            <h2>
              Debtors:{" "}
              <span>
                0x9d89b590218A45B43B7be1e58F7Bcc16EC45537A,
                0x9d89b590218A45B43B7be1e58F7Bcc16EC45537A
              </span>
            </h2>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default AccountPage;
