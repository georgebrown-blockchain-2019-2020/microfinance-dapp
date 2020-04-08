import React, { useState, useEffect } from "react";
import FundCard from "../../component/FundCard/FundCard";
import HeartIcon from "../../assets/image/heart-icon.gif";
import BackDrop from "../../component/BackDrop/BackDrop";
import Loading from "../../assets/image/loading-heart.svg";
import Popup from "../../component/Popup/Popup";

import "./FundPage.scss";
const dummyData = [
  {
    name: "Tuan",
    address: "King Street,Downtown",
    phone: "439-928-1293",
    reason: "poor",
    value: "1.0"
  },
  {
    name: "Leo",
    address: "Queen Street,Downtown",
    phone: "439-928-1293",
    reason: "poor",
    value: "1.0"
  },
  {
    name: "Tuan",
    address: "King Street,Downtown",
    phone: "439-928-1293",
    reason: "poor",
    value: "1.0"
  },
  {
    name: "Tuan",
    address: "King Street,Downtown",
    phone: "439-928-1293",
    reason: "poor",
    value: "1.0"
  },
  {
    name: "Tuan",
    address: "King Street,Downtown",
    phone: "439-928-1293",
    reason: "poor",
    value: "1.0"
  },
  {
    name: "Tuan",
    address: "King Street,Downtown",
    phone: "439-928-1293",
    reason: "poor",
    value: "1.0"
  },
  {
    name: "Tuan",
    address: "King Street,Downtown",
    phone: "439-928-1293",
    reason: "poor",
    value: "1.0"
  },
  {
    name: "Tuan",
    address: "King Street,Downtown",
    phone: "439-928-1293",
    reason: "poor",
    value: "1.0"
  },
  {
    name: "Tuan",
    address: "King Street,Downtown",
    phone: "439-928-1293",
    reason: "poor",
    value: "1.0"
  },
  {
    name: "Tuan",
    address: "King Street,Downtown",
    phone: "439-928-1293",
    reason: "poor",
    value: "1.0"
  },
  {
    name: "Tuan",
    address: "King Street,Downtown",
    phone: "439-928-1293",
    reason: "poor",
    value: "1.0"
  },
  {
    name: "Tuan",
    address: "King Street,Downtown",
    phone: "439-928-1293",
    reason: "poor",
    value: "2.0"
  }
];
function FundPage() {
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const [pageNum, setPageNum] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [inforDetail, setInforDetail] = useState({});
  const maxPage = 8;
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(dummyData);
      let numList = [];
      for (let i = 0; i < Math.ceil(dummyData.length / maxPage); i++) {
        numList.push(i);
      }
      setPageNum(numList);
      setLoading(false);
    }, 1000);
  }, []);
  // useEffect(() => {}, [currentPage]);
  const changePage = index => {
    setCurrentPage(index);
  };
  let popupContent;
  const openInforDetail = (name, address, phone) => {
    console.log("hello");
    setInforDetail({ name, address, phone });
    setOpenPopup(true);
  };
  const closeInforDetail = () => {
    popupContent = null;
    setInforDetail({});
    setOpenPopup(false);
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
                  key={index}
                />
              ))}
        </div>
        {loading && (
          <BackDrop show="true">
            <img src={Loading} alt="spinner" className="spinner" />
          </BackDrop>
        )}
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

export default FundPage;
