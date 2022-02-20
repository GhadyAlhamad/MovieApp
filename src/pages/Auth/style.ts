import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  Container: {
    backgroundImage: "url('images/background.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    padding: "0px",
    height: "100vh",
    width: "100vw",
    "& a": {
      fontSize: "12px !important",
      fontWeight: 400,
      color: "#707070",
      fontFamily: "'Poppins', sans-serif"
    }
  },
  SubContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  Card: {
    boxShadow: "20px 30px 80px #00000029 !important",
     minWidth: "418px"
  },
  CardContent: {
    textAlign: "center"
  },
  CardTitle: {
    color: "#454b54 !important",
    fontSize: "28px !important",
    fontWeight: "bolder !important",
    fontFamily: "'Poppins',sans-serif !important"
  },
  Label: {
    fontSize: "13px !important",
    fontWeight: "400",
    color: "#454b54",
    fontFamily: "'Poppins', sans-serif"
  },
  TextField: {
    opacity: "1",
    color: "#fff !important",
    "& .MuiOutlinedInput-root": {
      fontSize: "12px !important",
      borderRadius: "12px !important",
      "& fieldset": {
        border: "1px solid #DEDEDF !important",
      },
      "&.Mui-focused": {
        borderRadius: "12px !important",
        "& fieldset": {
        border: "1px solid #DEDEDF !important",
      } }
    }
  },
  Button: {
    backgroundColor: "#0066cc !important",
    color: "#fff !important",
    borderRadius: "12px !important",
    textTransform: "none",
    fontFamily: "'Poppins', sans-serif ",
    "&:disabled": {
      background: "silver 0% 0% no-repeat padding-box !important",
      color: "#707070 !important"
    }
  }
});

export default useStyle;
