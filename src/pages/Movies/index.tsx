import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Movies = () => {
  // call use navigate
  const navigate = useNavigate();

  return (
    <Grid container sx={{ padding: "10px 50px" }}>
      <Grid item xs={12} sm={12} md={12}>
        <Box mb={0} sx={{ display: "flex" }}>
          <ArrowBackIcon
            onClick={() => navigate(-1)}
            sx={{
              cursor: "pointer",
              color: "#000",
              mt: 2.7,
              mr: 2,
            }}
          />
          <Typography
            sx={{
              color: "#0052cc",
              fontSize: "25px !important",
              fontWeight: "900 !important",
              marginBottom: "15px !important",
              marginTop: "15px !important",
            }}
            component="span"
          >
            Movies
          </Typography>
        </Box>
        <div>Just for Demo</div>
      </Grid>
    </Grid>
  );
};

export default Movies;
