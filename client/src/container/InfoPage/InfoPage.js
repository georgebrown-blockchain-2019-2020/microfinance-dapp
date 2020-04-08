import React, { useState } from "react";
import "./InfoPage.scss";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";
import CircularProgress from "@material-ui/core/CircularProgress";
function InfoPage(props) {
  const { infor, loading, error, authRedirectPath, onSetInfor } = props;
  const [information, setInformation] = useState({
    name: "",
    address: "",
    phone: ""
  });
  const handleChange = input => event => {
    const updatedProfile = { ...information };
    updatedProfile[input] = event.target.value;
    setInformation(updatedProfile);
  };
  const valid =
    !!information.name && !!information.address && !!information.phone;
  const onSubmit = () => {
    onSetInfor(information.name + information.address);
  };
  return (
    <div className="bg-color">
      <div className="info__content">
        {!!infor && <Redirect to={authRedirectPath} />}
        <h2>Add Your Information</h2>
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            className="info__input"
            value={information.name}
            onChange={handleChange("name")}
          />
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            className="info__input"
            value={information.address}
            onChange={handleChange("address")}
          />
          <TextField
            id="outlined-basic"
            label="Phone number"
            variant="outlined"
            className="info__input"
            value={information.phone}
            onChange={handleChange("phone")}
          />
        </form>
        <button
          className="btn btn--blue info__submit"
          disabled={!valid}
          onClick={() => onSubmit()}
        >
          {loading ? <CircularProgress /> : "Submit"}
        </button>

        {!!error && <p>{error}</p>}
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    infor: state.infor,
    loading: state.loading,
    error: state.error,
    authRedirectPath: state.authRedirectPath
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSetInfor: infor => dispatch(actions.getInfor(infor))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InfoPage);
