import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  Container: {
    padding: "10px 50px",
  },
  GenreName: {
    color: "#0052cc",
    fontSize: "25px !important",
    fontWeight: "900 !important",
    marginBottom: "15px !important",
    marginTop: "15px !important",
  },
  SubTitle: { color: "#a8a4a4 !important" },
  SearchContainer: {
    display: "flex",
    flexDirection: "row",
  },
  SearchText: {
    display: "flex",
    flex: "1",
    marginBottom: "10px !important",
    marginRight: "5px !important",
    borderRadius: "8px !important",
    "& .MuiOutlinedInput-root": {
      height: "45px !important",
      "&:hover fieldset": {
        borderColor: "#fe7900 !important",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fe7900 !important",
      },
    },
  },
  SearchSelect: {
    width: "10% !important",
    minWidth: "100px",
    fontSize: "13px !important",
    borderRadius: "5px !important",
    lineHeight: "5px !important",
    "& .MuiSvgIcon-root": {
      display: "none !important",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {},
    "& .MuiOutlinedInput-root": {
      height: "45px !important",
      "&:hover fieldset": {
        borderColor: "#fe7900 !important",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fe7900 !important",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#fe7900 !important",
      borderColor: "#fe7900 !important",
    },
    "& .MuiInputLabel-root": {
      color: "rgb(133, 133, 133) !important",
      fontSize: "0.8rem",
      borderColor: "#fe7900 !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fe7900 !important",
    },
  },
  Button: {
    backgroundColor: "#fe7900 !important",
    color: "#fff !important",
    fontSize: "14px !important",
    fontWeight: "900 !important",
    "&:hover": {
      backgroundColor: "#000 !important",
    },
  },
});

export default useStyle;
