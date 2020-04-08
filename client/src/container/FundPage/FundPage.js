import React, { useState, useEffect } from "react";
import FundCard from "../../component/FundCard/FundCard";
import HeartIcon from "../../assets/image/heart-icon.gif";
import BackDrop from "../../component/BackDrop/BackDrop";
import Loading from "../../assets/image/loading-heart.svg";
import Cloud from "../../assets/image/cloud.svg";
import "./FundPage.scss";
const dummyData = [
  { name: "Tuan", reason: "poor", value: "1.0" },
  { name: "Tuan", reason: "poor", value: "1.0" },
  { name: "Tuan", reason: "poor", value: "1.0" },
  { name: "Tuan", reason: "poor", value: "1.0" },
  { name: "Tuan", reason: "poor", value: "1.0" },
  { name: "Tuan", reason: "poor", value: "1.0" },
  { name: "Tuan", reason: "poor", value: "1.0" },
  { name: "Tuan", reason: "poor", value: "1.0" },
  { name: "Tuan", reason: "poor", value: "1.0" },
  { name: "Tuan", reason: "poor", value: "1.0" },
  { name: "Tuan", reason: "poor", value: "1.0" },
  { name: "Tuan", reason: "poor", value: "2.0" }
];
function FundPage() {
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const [pageNum, setPageNum] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
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
  let content = [];

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
      </div>
    </div>
  );
}

export default FundPage;
