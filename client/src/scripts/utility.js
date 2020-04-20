import web3 from "web3";
import Decimal from "decimal.js";
import React from "react";
import NumberFormat from "react-number-format";
export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues
  };
};

export const convertWeiToEther = amount => {
  return amount === 0 ? 0 : web3.utils.fromWei(amount, "ether");
};

export const convertWeiToUSD = (amount, rate) => {
  const ether = convertWeiToEther(amount);
  console.log(ether);
  console.log(rate);
  const usdAmount = new Decimal(ether).mul(new Decimal(rate));
  return usdAmount.toString();
};

export const convertEtherToWei = amount => {
  console.log(amount);
  return !amount ? 0 : web3.utils.toWei(amount, "ether");
};

export function USDFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}
export function ETHFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}

export function PhoneFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
      format="+1 (###) ###-####"
      mask="_"
    />
  );
}
