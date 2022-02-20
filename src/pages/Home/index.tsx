import React, { useState, useEffect, useLayoutEffect } from "react";
import useStyle from "./style";
import { readMovies } from "../../constants/movieServices";
import { Typography, Grid } from "@mui/material";
import MovieCard from "../../components/Cards/MovieCard";
import CircularProgress from "@mui/material/CircularProgress";
import { IMovie, IMovies } from "../../interfaces/page.interface";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { PreviousArrow, NextArrow } from "../../components/Arrows";
import { Link, useNavigate } from "react-router-dom";

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 7,
  initialSlide: 7,
  slidesToScroll: 3,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PreviousArrow />,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 6,
        initialSlide: 6,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 5,
        initialSlide: 5,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1150,
      settings: {
        slidesToShow: 4,
        initialSlide: 4,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 3,
        initialSlide: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 570,
      settings: {
        slidesToShow: 2,
        initialSlide: 2,
        slidesToScroll: 2,
      },
    },
  ],
  autoplay: true,
  speed: 700,
  autoplaySpeed: 2000,
  cssEase: "linear",
};

const Home = () => {
  // call use style
  const classes = useStyle();
  // call use navigate
  const navigate = useNavigate();

  // create genre movies state
  const [genreMovies, setGenreMovies] = useState<IMovies[]>([]);
  // create top movies state
  const [topMovies, setTopMovies] = useState<IMovie[]>([]);
  // create latest movies state
  const [latestMovies, setLatestMovies] = useState<IMovie[]>([]);
  // create loading state
  const [loading, setLoading] = useState<boolean>(false);
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
    // read movies
    readMovies(setGenreMovies, setTopMovies, setLatestMovies, setLoading);
  }, []);

  return (
    <div className={classes.Page}>
      <img
        src={window.location.origin + "/images/header-movies.png"}
        alt="top header"
        width="100%"
        style={{ maxHeight: "240px" }}
      />
      <Grid
        container
        className={classes.Container}
        sx={{ textAlign: "center" }}
      >
        {loading ? (
          <Grid item xs={12} sm={12} md={10}>
            <Typography className={classes.TopMoviesLabel}>
              <span className={classes.TopLabel}>Top</span>{" "}
              <span className={classes.MoviesLabel}>movies</span>
            </Typography>
            <Typography className={classes.SubTitleTopMovies}>
              newest in week
            </Typography>
            <Slider {...settings}>
              {topMovies?.map((movieInfo, movieKey) => (
                <MovieCard
                  key={movieKey}
                  isTop={true}
                  movieId={movieInfo.id}
                  movie={movieInfo.movie}
                  width={width}
                />
              ))}
            </Slider>
            <div className={classes.Separator}></div>
            <Grid container mt={8}>
              <Grid item xs={12} sm={12} md={8} sx={{ textAlign: "left" }}>
                {genreMovies?.map((genre, key) => (
                  <div key={key}>
                    <div className={classes.GenreHeader}>
                      <div className={classes.GenreLabel}>{genre.name}</div>
                      <div style={{ flex: "1" }}></div>
                      <div
                        style={{
                          marginRight: "20px",
                          marginTop: "15px",
                        }}
                      >
                        <Link
                          className={classes.ViewAllLabel}
                          to={`/genre/${genre.name}`}
                        >
                          View All &gt;&gt;
                        </Link>
                      </div>
                    </div>
                    <div className={classes.HorizontalContainer}>
                      {genre.movies?.map((movieInfo, moviekey) => (
                        <MovieCard
                          key={moviekey}
                          isTop={false}
                          movieId={movieInfo.id}
                          movie={movieInfo.movie}
                          width={width}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </Grid>
              <Grid item xs={12} sm={12} md={4} sx={{ textAlign: "right" }}>
                {latestMovies?.map((movieInfo, latestkey) => (
                  <img
                    key={latestkey}
                    src={movieInfo.movie.posterurl}
                    alt="movie"
                    width="95%"
                    height="540px"
                    onClick={(e: any) => navigate(`/movies/${movieInfo.id}`)}
                    style={{ marginBottom: "10px", cursor: "pointer" }}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src =
                        window.location.origin +
                        "/images/no-poster-available.jpg";
                    }}
                  />
                ))}
              </Grid>
            </Grid>
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
    </div>
  );
};

export default Home;
