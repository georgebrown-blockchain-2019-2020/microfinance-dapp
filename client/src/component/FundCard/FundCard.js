import React from "react";
import "./FundCard.scss";
import ExpandIcon from "../../assets/image/expand.svg";
function FundCard(props) {
  return (
    <div className="fund_item">
      <div className="fund_item_title">
        <span>{props.name}</span>
        <img src={ExpandIcon} alt="expand" onClick={props.openModel} />
      </div>
      <div className="fund_item_reason">
        <span>Reason: </span>
        <p>{props.reason}</p>
      </div>
      <div className="fund_item_money">
        <span>{props.value} Ether</span>
      </div>
      <button
        className="fund_item_btn"
        onClick={() => props.lend(props.id, props.value)}
      >
        <span>lend</span>
      </button>
    </div>
  );
}

export default FundCard;
