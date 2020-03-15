import React from "react";
import "./FundCard.scss";
function FundCard(props) {
  return (
    <div className="fund">
      <div className="fund_title">{props.name}</div>
      <div className="fund_reason">
        <span>Reason: </span>
        <p>{props.reason}</p>
      </div>
      <div className="fund_money">
        <span>{props.value} Ether</span>
      </div>
      <button className="fund_btn" onClick={() => props.lend(props)}>
        <span>lend</span>
      </button>
    </div>
  );
}

export default FundCard;
