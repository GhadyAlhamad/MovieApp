import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  Footer: {
    backgroundColor: "#000",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#bdbdbd",
    fontSize: "13px",
    padding: "15px",
    position: "relative",
    width: "100%",
  },
});

export const Footer = () => {
  // call use style
  const classes = useStyle();

  return (
    <Grid container className={classes.Footer}>
      <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "left" }}>
        ©copyright 2022 ghady alhamad
      </Grid>
      <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "right" }}></Grid>
    </Grid>
  );
};
