import React, { useState, useEffect, useCallback } from "react";
import FundCard from "../../component/FundCard/FundCard";
import HeartIcon from "../../assets/image/heart-icon.gif";
import { database } from "../../firebase/FireBaseRef";
import {
  getStateofDebt,
  getAmountofDebt,
  lendLoan,
  getBorrowerofDebt
} from "../../blockchain/contractInteract";
import Popup from "../../component/Popup/Popup";
import Loading from "../../component/Loading/Loading";
import { connect } from "react-redux";
import "./FundPage.scss";
import Swal from "sweetalert2";

function FundPage(props) {
  const { address, usdRate } = props;
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const [pageNum, setPageNum] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [inforDetail, setInforDetail] = useState({});
  const maxPage = 8;

  // useEffect(() => {}, [currentPage]);
  const updateDebtList = useCallback(async () => {
    const getDebtDataBase = async () =>
      await database.ref("debt").once("value");
    const getInforDataBase = async borrower =>
      await database
        .ref("infor")
        .orderByChild("userAddr")
        .equalTo(borrower)
        .once("value");
    const tempData = [];
    let debtData = await getDebtDataBase();
    let debtsList = debtData.val();
    for (let key in debtsList) {
      let borrower = await getBorrowerofDebt(debtsList[key].debtNo);
      if (borrower !== address) {
        let item = {
          debtNo: "",
          userAddress: "",
          reason: "",
          value: "",
          name: "",
          address: "",
          phone: ""
        };
        let state = await getStateofDebt(debtsList[key].debtNo);
        if (parseInt(state) === 0) {
          let amount = await getAmountofDebt(debtsList[key].debtNo);
          item.value = amount;
          item.debtNo = debtsList[key].debtNo;
          item.userAddress = borrower;
          item.reason = debtsList[key].reason;
          let userData = await getInforDataBase(borrower);
          for (let userKey in userData.val()) {
            item.name = userData.val()[userKey].name;
            item.address = userData.val()[userKey].address;
            item.phone = userData.val()[userKey].phone;
          }
          tempData.push(item);
        }
      }
    }
    return tempData;
  }, [address]);
  useEffect(() => {
    setLoading(true);
    updateDebtList().then(result => {
      setData(result);
      let numList = [];
      for (let i = 0; i < Math.ceil(result.length / maxPage); i++) {
        numList.push(i);
      }
      setPageNum(numList);
    });
    setLoading(false);
  }, [address, updateDebtList]);
  const changePage = index => {
    setCurrentPage(index);
  };
  const openInforDetail = (name, address, phone) => {
    console.log("hello");
    setInforDetail({ name, address, phone });
    setOpenPopup(true);
  };
  const closeInforDetail = () => {
    setInforDetail({});
    setOpenPopup(false);
  };
  const lendLoanAct = async (debtNo, amount) => {
    setLoading(true);
    await lendLoan(debtNo, amount);
    updateDebtList().then(result => {
      setData(result);
      let numList = [];
      for (let i = 0; i < Math.ceil(result.length / maxPage); i++) {
        numList.push(i);
      }
      setPageNum(numList);
    });
    setLoading(false);
    Swal.fire({
      icon: "success",
      title: "You paid successfully",
      text: "Reward 10 Heart Token"
    });
  };
  return (
    <div className="fund">
      <div className="banner"></div>
      <div className="title">
        <img src={HeartIcon} alt="heart icon" className="title_image" />
        <p>Someone needs your help !!</p>
      </div>
      <div className="fund__content">
        <div className="fund-card">
          {data.length !== 0 &&
            data
              .slice(currentPage * maxPage, (currentPage + 1) * maxPage)
              .map((item, index) => (
                <FundCard
                  name={item.name}
                  reason={item.reason}
                  value={item.value}
                  usdRate={usdRate}
                  openModel={() =>
                    openInforDetail(item.name, item.address, item.phone)
                  }
                  key={item.debtNo}
                  id={item.debtNo}
                  lend={lendLoanAct}
                />
              ))}
        </div>
        {loading && <Loading />}
        {pageNum.length !== 0 && (
          <div className="pagination">
            <span>&laquo;</span>
            {pageNum.map(number => (
              <span
                key={number}
                className={currentPage === number ? "active" : ""}
                onClick={() => changePage(number)}
              >
                {number + 1}
              </span>
            ))}
            <span>&raquo;</span>
          </div>
        )}
        <Popup
          name={inforDetail.name}
          address={inforDetail.address}
          phone={inforDetail.phone}
          show={openPopup}
          closed={closeInforDetail}
        />
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    address: state.address,
    usdRate: state.usdRate
  };
};
export default connect(mapStateToProps)(FundPage);
