import React from "react";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  PreviousArrow: {
    display: "block",
    background: "#fff",
    opacity: "0.65",
    border: "none",
    color: "#202020",
    borderRadius: "0",
    width: "35px",
    height: "60px",
    lineHeight: "72px",
    top: "calc(50% - 20px)",
    left: "0px",
    transition: "all 0.2s linear",
    zIndex: "1",
    borderTopRightRadius: "40px",
    borderBottomRightRadius: "40px",
    "&.slick-prev:before": {
      fontFamily: "Arial !important",
    },
    "&.slick-arrow:before": {
      color: "#202020",
    },
    "&.slick-arrow.slick-prev:before": {
      marginRight: "8px",
    },
    "&:hover": {
      display: "block",
      background: "#fff",
      opacity: "1",
      border: "none",
      color: "#202020",
      borderRadius: "0",
      width: "35px",
      height: "60px",
      lineHeight: "72px",
      top: "calc(50% - 20px)",
      left: "0px",
      transition: "all 0.2s linear",
      zIndex: "1",
      borderTopRightRadius: "40px",
      borderBottomRightRadius: "40px",
    },
  },
  NextArrow: {
    display: "block",
    background: "#fff",
    opacity: "0.65",
    border: "none",
    color: "#202020",
    borderRadius: "0",
    width: "35px",
    height: "60px",
    lineHeight: "72px",
    top: "calc(50% - 20px)",
    right: "2px",
    transition: "all 0.2s linear",
    zIndex: "1",
    borderTopLeftRadius: "40px",
    borderBottomLeftRadius: "40px",
    "&.slick-next:before": {
      fontFamily: "Arial !important",
    },
    "&.slick-arrow:before": {
      color: "#202020",
    },
    "&.slick-arrow.slick-next:before": {
      marginLeft: "5px",
    },
    "&:hover": {
      display: "block",
      background: "#fff",
      opacity: "1",
      border: "none",
      color: "#202020",
      borderRadius: "0",
      width: "35px",
      height: "60px",
      lineHeight: "72px",
      top: "calc(50% - 20px)",
      right: "2px",
      transition: "all 0.2s linear",
      zIndex: "1",
      borderTopLeftRadius: "40px",
      borderBottomLeftRadius: "40px",
    },
  },
});

export const PreviousArrow = (props: any) => {
  const { className, style, onClick } = props;
  // call use style
  const classes = useStyle();

  return (
    <div
      className={`${classes.PreviousArrow} ${className}`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};
export const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  // call use style
  const classes = useStyle();

  return (
    <div
      className={`${classes.NextArrow} ${className}`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};
