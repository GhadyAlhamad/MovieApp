import { Grid, TextField, Autocomplete, Typography } from "@mui/material";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { ISearchData } from "../../interfaces/page.interface";
import useStyle from "./style";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../../interfaces/page.interface";
import { readMoviesByGenre } from "../../constants/movieServices";
import MovieCard from "../../components/Cards/MovieCard";
import CircularProgress from "@mui/material/CircularProgress";

const Genre = () => {
  // call use style
  const classes = useStyle();
  // call use navigate
  const navigate = useNavigate();

  // create loading state
  const [loading, setLoading] = useState<boolean>(false);
  // create movies state
  const [movies, setMovies] = useState<IMovie[]>([]);
  // create filtered movies state
  const [filteredMovies, setFilteredMovies] = useState<IMovie[]>([]);
  // create years state
  const [years, setYears] = useState<number[]>([]);

  // read genre name
  const { genrename } = useParams();

  // create state for search data
  const [searchData, setSearchData] = useState<ISearchData>({
    text: "",
    year: undefined,
  });

  // on text change
  const onTextChange = (e: any) => {
    // set search data
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };
  // on year change
  const onYearChange = (e: any, val: any) => {
    // set search data
    setSearchData({
      ...searchData,
      ["year"]: val,
    });
  };
  // create state for screen width
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    // update size
    function updateSize() {
      // set width
      setWidth(window.innerWidth);
    }
    // add listener for resize
    window.addEventListener("resize", updateSize);
    // update size
    updateSize();
    // return result
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    // define years array
    const yearsArr = [];

    for (var year = new Date().getFullYear(); year >= 1930; year--)
      yearsArr.push(year);

    // set years
    setYears(yearsArr);

    // read movies by genre
    readMoviesByGenre(genrename || "", setMovies, setLoading);
  }, [genrename]);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  useEffect(() => {
    // filter movies
    setFilteredMovies(
      movies.filter(
        (m) =>
          (!searchData.text ||
            (m.movie.originalTitle &&
              m.movie.originalTitle
                .toLowerCase()
                .includes(searchData.text.toLowerCase())) ||
            m.movie.title
              .toLowerCase()
              .includes(searchData.text.toLowerCase())) &&
          (!searchData.year || parseInt(m.movie.year) == searchData.year)
      )
    );
  }, [searchData]);

  return (
    <Grid container className={classes.Container}>
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
          <Typography className={classes.GenreName} component="span">
            {genrename}
          </Typography>
        </Box>
        <Box mt={-1} mb={3} ml={5} className={classes.SubTitle}>
          This page for showing genre movies
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        pr={6}
        className={classes.SearchContainer}
      >
        <TextField
          fullWidth
          type="text"
          name="text"
          value={searchData?.text}
          className={classes.SearchText}
          placeholder="Movies search (title)..."
          onChange={(e) => onTextChange(e)}
        />

        <Autocomplete
          disablePortal
          options={years}
          getOptionLabel={(option) => option.toString() || ""}
          className={classes.SearchSelect}
          onChange={(e, v) => onYearChange(e, v)}
          renderInput={(params) => (
            <TextField name="year" {...params} label="Select year" />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "left" }}>
        {loading ? (
          <Grid container mt={4}>
            {filteredMovies?.map((movieInfo, moviekey) => (
              <Grid
                item
                key={moviekey}
                xs={6}
                sm={4}
                md={2}
                sx={{ textAlign: "left" }}
              >
                <MovieCard
                  isTop={false}
                  movieId={movieInfo.id}
                  movie={movieInfo.movie}
                  width={width}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              sx={{ textAlign: "center", marginTop: "50px" }}
            >
              <CircularProgress />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
export default Genre;
