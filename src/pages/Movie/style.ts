import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  Container: {
    width: "100%",
  },
  Background: {
    height: 600,
    backgroundSize: "100% 100% !important",
    backgroundRepeat: "no-repeat !important",
  },
  Title: {
    fontSize: "30px !important",
    fontWeight: "bolder !important",
    padding: "0.5rem",
  },
  WatchlistButton: {
    backgroundColor: "#fff !important",
    color: "#000 !important",
    width: "185px !important",
    height: "40px !important",
  },
  MovieInfo: {
    paddingTop: "70px",
    backgroundColor: "#eeee",
    borderBottom: "1px dotted #d4d4d4",
    paddingBottom: "30px",
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    justifyContent: "center",
  },
  MovieInfoTitle: {
    color: "#666 !important",
    marginBottom: "25px",
    fontSize: "24px !important",
    textAlign: "left",
    fontFamily: "'Roboto Condensed', Arial, sans-serif !important",
    fontStyle: "normal",
    fontWeight: "800",
  },
  MovieInfoRow: {
    display: "flex",
    flexDirection: "row",
  },
  MovieInfoLabel: {
    fontFamily: "'Roboto Condensed', Arial, sans-serif !important",
    color: "#202020 !important",
    marginBottom: "5px",
    marginRight: "10px",
    fontWeight: "400 !important",
    fontSize: "14px !important",
  },
  MovieInfoValue: {
    fontFamily: "'Roboto Condensed', Arial, sans-serif !important",
    color: "#666 !important",
    marginBottom: "5px",
    fontSize: "14px !important",
  },
  StoryLine: {
    paddingTop: "20px",
    borderBottom: "1px dotted #d4d4d4",
    paddingBottom: "30px",
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    justifyContent: "center",
  },
  StoryLineTitle: {
    color: "#fe7900 !important",
    fontSize: "20px !important",
    textAlign: "left",
    fontFamily: "'Roboto Condensed', Arial, sans-serif !important",
    fontStyle: "normal",
    fontWeight: "800",
    marginBottom: "10px",
    textTransform: "uppercase",
  },
  StoryLineText: {
    fontFamily: "'Roboto Condensed', Arial, sans-serif !important",
    color: "#666 !important",
    fontSize: "16px !important",
    marginLeft: "25px",
  },
  RelatedMoviesTitle: {
    marginBottom: "15px",
    color: "#fe7900 !important",
    fontSize: "20px !important",
    textAlign: "left",
    fontFamily: "'Roboto Condensed', Arial, sans-serif !important",
    fontStyle: "normal",
    fontWeight: "800",
    textTransform: "uppercase",
  },
  Slider: {
    height: "200px !important",
  },
  HorizontalContainer: {
    display: "flex",
    flexDirection: "row",
    justifyItems: "center",
    justifyContent: "center",
  },
});

export default useStyle;
