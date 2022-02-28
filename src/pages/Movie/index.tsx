import { Grid, Typography, Button, Skeleton } from "@mui/material";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  readMovieById,
  updateWatchlistMovies,
} from "../../constants/movieServices";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IMovie } from "../../interfaces/page.interface";
import MovieCard from "../../components/Cards/MovieCard";
import CircularProgress from "@mui/material/CircularProgress";
import { Parallax, Background } from "react-parallax";
import StarRatings from "react-star-ratings";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { PreviousArrow, NextArrow } from "../../components/Arrows";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import useStyle from "./style";

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

const Movie = () => {
  // call use style
  const classes = useStyle();
  // call use navigate
  const navigate = useNavigate();

  // create loading state
  const [loading, setLoading] = useState<boolean>(false);
  // create loading state for add to watch list
  const [loadingWatchButton, setLoadingWatchButton] = useState<boolean>(true);
  // create movie state
  const [movie, setMovie] = useState<any>({});
  // create related movies state
  const [relatedMovies, setRelatedMovies] = useState<IMovie[]>([]);
  // create watch list movies state
  const [watchlistMovies, setWatchlistMovies] = useState<IMovie[]>([]);
  // create addedToWatchlist state
  const [addedToWatchlist, setAddedToWatchlist] = useState<boolean>(false);

  // read movie id
  const { id } = useParams();
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
    // read movie by id
    readMovieById(
      id || "",
      setMovie,
      setRelatedMovies,
      setWatchlistMovies,
      setAddedToWatchlist,
      setLoading
    );
  }, [id]);

  // get rating average
  const getRatingAvg = (rates: any) => {
    let rateAvg: number = 0.0;

    rates?.map((rate: any, key: any) => {
      rateAvg = rateAvg + rate;
      return rateAvg;
    });
    // return average
    return Math.round((rateAvg / rates?.length / 2) * 100) / 100;
  };

  // add /remove from watch list
  const UpdateWatchlistClick = () => {
    // call add to watch list
    updateWatchlistMovies(
      { id: id, movie: movie },
      watchlistMovies,
      setWatchlistMovies,
      setAddedToWatchlist,
      addedToWatchlist,
      setLoadingWatchButton
    );
  };

  // create date option
  const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Parallax strength={450}>
            <Background>
              <div
                className={classes.Background}
                style={{
                  width: width,
                  background: `linear-gradient(
                  rgba(0, 0, 0, 0.5),
                  rgba(0, 0, 0, 0.5)
                ), url(${movie?.posterurl}), url(${
                    window.location.origin + "/images/no-poster-available.jpg"
                  } )`,
                }}
              />
            </Background>
            <div
              style={{
                height: 600,
                width: width,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "1%",
                  height: 700,
                  width: "99%",
                }}
              >
                <ArrowBackIcon
                  onClick={() => navigate(-1)}
                  sx={{
                    cursor: "pointer",
                    color: "#fff",
                    mt: 2.7,
                    mr: 2,
                    height: 50,
                    width: 50,
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 500,
                  left: "4%",
                  height: 700,
                  width: "93%",
                  color: "#fff",
                }}
              >
                <Grid container>
                  <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "left" }}>
                    <Typography className={classes.Title} component="div">
                      {movie?.originalTitle
                        ? movie?.originalTitle
                        : movie?.title}
                    </Typography>
                    <div
                      style={{
                        marginLeft: "15px",
                      }}
                    >
                      {movie?.ratings && (
                        <StarRatings
                          rating={getRatingAvg(movie?.ratings)}
                          starRatedColor="#ffe270"
                          numberOfStars={5}
                          name="rating"
                          starDimension="18"
                          starSpacing="5"
                        />
                      )}
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    pt={5}
                    sx={{ textAlign: "right" }}
                  >
                    {loading && (
                      <Button
                        sx={{ textTransform: "capitalize" }}
                        variant="contained"
                        size="medium"
                        disabled={!loadingWatchButton}
                        className={classes.WatchlistButton}
                        onClick={() => UpdateWatchlistClick()}
                      >
                        {loadingWatchButton ? (
                          addedToWatchlist ? (
                            <div className={classes.MovieInfoRow}>
                              <DoneIcon color="success" /> Added to watchlist
                            </div>
                          ) : (
                            <div className={classes.MovieInfoRow}>
                              <AddIcon /> Add to watchlist
                            </div>
                          )
                        ) : (
                          <CircularProgress size="15px" />
                        )}
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </div>
            </div>
          </Parallax>
        </Grid>
      </Grid>
      <Grid container className={classes.MovieInfo}>
        <Grid item xs={11} sm={10} md={9}>
          <div className={classes.MovieInfoTitle}>Movie Info</div>
          <div className={classes.MovieInfoRow}>
            <div className={classes.MovieInfoLabel}>Actor:</div>
            <div className={classes.MovieInfoValue}>
              {Array.isArray(movie?.actors) ? (
                [...movie?.actors].join(", ")
              ) : (
                <Skeleton variant="text" width={210} />
              )}
            </div>
          </div>
          <div className={classes.MovieInfoRow}>
            <div className={classes.MovieInfoLabel}>Genre:</div>
            <div className={classes.MovieInfoValue}>
              {Array.isArray(movie?.genres) ? (
                [...movie?.genres].join(", ")
              ) : (
                <Skeleton variant="text" width={250} />
              )}
            </div>
          </div>
          <div className={classes.MovieInfoRow}>
            <div className={classes.MovieInfoLabel}>Release:</div>
            <div className={classes.MovieInfoValue}>
              {loading ? (
                new Date(movie?.releaseDate).toLocaleDateString(
                  "en-US",
                  DATE_OPTIONS
                )
              ) : (
                <Skeleton variant="text" width={150} />
              )}
            </div>
          </div>
          <div className={classes.MovieInfoRow}>
            <div className={classes.MovieInfoLabel}>IMDB Rating:</div>
            <div className={classes.MovieInfoValue}>
              {loading ? (
                movie?.imdbRating
              ) : (
                <Skeleton variant="text" width={50} />
              )}
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container className={classes.StoryLine}>
        <Grid item xs={11} sm={10} md={9}>
          <div className={classes.StoryLineTitle}>Story Line</div>
          {loading ? (
            <div className={classes.StoryLineText}>{movie?.storyline}</div>
          ) : (
            <div className={classes.StoryLineText}>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="50%" />
            </div>
          )}
        </Grid>
      </Grid>
      <Grid container className={classes.StoryLine}>
        <Grid item xs={11} sm={10} md={9}>
          <div className={classes.RelatedMoviesTitle}>Related Movies</div>
        </Grid>
        {loading ? (
          <Grid item xs={11} sm={10} md={10}>
            {relatedMovies?.length > 7 ? (
              <Slider className={classes.Slider} {...settings}>
                {relatedMovies?.map((movieInfo, movieKey) => (
                  <MovieCard
                    key={movieKey}
                    isTop={true}
                    movieId={movieInfo.id}
                    movie={movieInfo.movie}
                    width={width}
                  />
                ))}
              </Slider>
            ) : (
              <div className={classes.HorizontalContainer}>
                {relatedMovies?.map((movieInfo, moviekey) => (
                  <MovieCard
                    key={moviekey}
                    isTop={false}
                    movieId={movieInfo.id}
                    movie={movieInfo.movie}
                    width={width}
                  />
                ))}
              </div>
            )}
          </Grid>
        ) : (
          <Grid item xs={11} sm={10} md={10}>
            <div className={classes.HorizontalContainer}>
              <Skeleton
                variant="rectangular"
                width={210}
                height={118}
                sx={{ marginRight: "10px" }}
              />
              <Skeleton
                variant="rectangular"
                width={160}
                height={100}
                sx={{ marginRight: "10px" }}
              />
              <Skeleton
                variant="rectangular"
                width={160}
                height={100}
                sx={{ marginRight: "10px" }}
              />
              <Skeleton
                variant="rectangular"
                width={160}
                height={100}
                sx={{ marginRight: "10px" }}
              />
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
export default Movie;
