import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  Page: {
    width: "100%",
    textAlign: "center",
  },
  Container: {
    width: "100%",
    display: "flex",
    justifyItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  TopMoviesLabel: {
    fontFamily: "'Roboto Condensed', sans-serif",
    fontSize: "35px !important",
    fontWeight: "900 !important",
    textAlign: "center",
    color: "#202020",
    marginTop: "25px !important",
    marginBottom: "-5px !important",
    position: "relative",
    display: "inline-block",
  },
  MoviesLabel: {
    color: "#fe7900",
  },
  GenreHeader: {
    display: "flex",
    flexDirection: "row",
  },
  GenreLabel: {
    color: "#0066ff",
    fontSize: "25px !important",
    fontWeight: "900 !important",
    marginBottom: "15px !important",
  },
  ViewAllLabel: {
    color: "#666666",
    fontSize: "11px !important",
    textDecoration: "none",
  },
  SubTitleTopMovies: {
    fontSize: "12px !important",
    color: "#333 !important",
    marginBottom: "20px !important",
  },
  Separator: {
    borderBottom: "1px silver solid",
    marginTop: "45px",
    marginBottom: "25px",
  },
  HorizontalContainer: {
    display: "flex",
    flexDirection: "row",
  },
  TopLabel: {
    color: "#000",
  },
  Footer: {
    backgroundColor: "#000",
    color: "#bdbdbd",
    fontSize: "15px",
    width: "100%",
    minHeight: "50px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
});

export default useStyle;
