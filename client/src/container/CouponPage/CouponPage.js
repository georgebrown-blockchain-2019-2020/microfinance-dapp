import React, { useEffect } from "react";
import "./CouponPage.scss";
import CouponBackground from "../../assets/image/coupon_cover.jpg";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CouponItem from "../../component/CouponItem/CouponItem";
import RedeemedItem from "../../component/RedeemedItem/RedeemedItem";
import CouponList from "../../scripts/couponList.json";
import { getTokenBalance } from "../../blockchain/contractInteract";
import { connect } from "react-redux";
function TabPanel(props) {
  console.log(CouponList);
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));
function CouponPage(props) {
  const { userAddr } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [tokenBalance, setTokenBalance] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    getTokenBalance(userAddr).then(result => setTokenBalance(result));
  }, [userAddr]);
  return (
    <div className="coupon">
      <img
        src={CouponBackground}
        alt="coupon-background"
        className="coupon__banner"
      />
      <div className="coupon__balance">
        <p>
          Balance: <span>{tokenBalance}</span> Heart Token
        </p>
      </div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          className="coupon__tab"
        >
          <Tab label="Coupon" {...a11yProps(0)} />
          <Tab label="Redeemed" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className="coupon__items">
          {CouponList.map(item => (
            <CouponItem
              image={item.image}
              id={item.id}
              amount={item.amount}
              title={item.title}
              enddate={item.enddate}
              key={item.id}
            />
          ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="coupon__items">
          <RedeemedItem
            image={CouponList[0].image}
            id={CouponList[0].id}
            key={CouponList[0].id}
            title={CouponList[0].title}
            code={`${CouponList[0].id}XSHD`}
            enddate={CouponList[0].enddate}
          />
        </div>
      </TabPanel>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    userAddr: state.address
  };
};
export default connect(mapStateToProps)(CouponPage);
