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
  const { address } = props;
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
    const data = database.ref("debt");
    const tempData = [];
    data.once("value", async snapshot => {
      console.log(snapshot.val());
      const debtList = snapshot.val();
      let item = {
        debtNo: "",
        userAddress: "",
        reason: "",
        value: "",
        name: "",
        address: "",
        phone: ""
      };
      for (let key in debtList) {
        // for(let key in data.val());
        const borrower = await getBorrowerofDebt(debtList[key].debtNo);
        console.log(borrower);
        if (borrower !== address) {
          const state = await getStateofDebt(debtList[key].debtNo);
          if (parseInt(state) === 0) {
            const amount = await getAmountofDebt(debtList[key].debtNo);
            item.value = amount;
            item.debtNo = debtList[key].debtNo;
            item.userAddress = borrower;
            item.reason = debtList[key].reason;
            const userData = database.ref("infor");
            userData
              .orderByChild("userAddr")
              .equalTo(borrower)
              .on("child_added", async function(snapshot) {
                item.name = snapshot.val().name;
                item.address = snapshot.val().address;
                item.phone = snapshot.val().phone;
                tempData.push(item);
                console.log(tempData);
              });
            console.log(item);
            console.log(tempData);
          }
        }
      }
    });
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
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
    await lendLoan(debtNo, amount);
    updateDebtList().then(result => {
      setData(result);
      let numList = [];
      for (let i = 0; i < Math.ceil(result.length / maxPage); i++) {
        numList.push(i);
      }
      setPageNum(numList);
    });
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
    reduxLoading: state.loading,
    error: state.error
  };
};
export default connect(mapStateToProps)(FundPage);
