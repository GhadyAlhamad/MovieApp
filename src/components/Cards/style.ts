import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  MovieCard: {
    position: "relative",
    height: "285px !important",
    textAlign: "center",
    paddingBottom: "5px",
    boxShadow: "none !important",
    "&:hover": {
      cursor: "pointer",
    },
  },
  MovieCardTitle: {
    fontFamily: "'Roboto Condensed', sans-serif",
    fontSize: "15px",
    textAlign: "left",
    textTransform: "capitalize",
    fontWeight: "700",
    margin: "6px 6px 2px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    "&:hover": {
      color: "#fe7900",
    },
  },
  MovieCardSubTitle: {
    fontFamily: "'Roboto Condensed', sans-serif",
    marginLeft: "6px",
    fontSize: "12px",
    textAlign: "left",
    color: "#999999",
  },
  MovieCardImage: {
    marginBottom: "5px",
  },
  Rate: {
    position: "absolute",
    right: "10px",
    borderRadius: "50%",
    backgroundColor: "#fe7900",
    color: "#fff",
    textAlign: "center",
    width: "40px",
    height: "40px",
    display: "inline-block",
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: "bold",
    fontSize: "15px",
    lineHeight: "40px",
    textTransform: "uppercase",
  },
  DivHover: {
    position: "absolute",
    boxShadow: "0px 3px 6px #00000029 !important",
    border: "none",
    top: "40px",
    right: "0px",
    paddingLeft: "5px",
    backgroundColor: "#fff",
    opacity: "0.9",
    color: "#fff",
    textAlign: "center",
    width: "90%",
    height: "35px",
    display: "flex",
    flexDirection: "row",
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: "bold",
    lineHeight: "40px",
    textTransform: "uppercase",
  },
});

export default useStyle;
