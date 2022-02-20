import { Card } from "@mui/material";
import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import useStyle from "./style";

const MovieCard = ({ movieId, movie, width, isTop }: any) => {
  // call use style
  const classes = useStyle();
  // call use navigate
  const navigate = useNavigate();

  // create state for anchor popover
  const [open, setOpen] = useState<boolean>(false);

  // handle open popover
  const handleOpen = () => setOpen(true);
  // handle close popover
  const handleClose = () => setOpen(false);

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

  // create date option
  const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    //   year: "numeric",
  };

  return (
    <Card
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      className={classes.MovieCard}
      sx={{
        width: isTop ? (width < 400 ? width / 2.45 : "163px") : "90%",
        maxWidth: "163px",
        minWidth: "120px",
        marginRight: isTop ? "0" : "20px",
      }}
      onClick={(e: any) => navigate(`/movies/${movieId}`)}
    >
      <img
        src={movie?.posterurl}
        alt="movie"
        width="100%"
        height={isTop ? "250px" : "200px"}
        className={classes.MovieCardImage}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping..
          currentTarget.src =
            window.location.origin + "/images/no-poster-available.jpg";
        }}
      />
      <div className={classes.MovieCardTitle}>
        {movie?.originalTitle ? movie?.originalTitle : movie?.title}
      </div>
      <div className={classes.MovieCardSubTitle}>
        {new Date(movie?.releaseDate).toLocaleDateString("en-US", DATE_OPTIONS)}
        , {movie?.year}{" "}
        {/* release date year does not always match year. Therefore I decided to show the year to avoid cofusing on filtering */}
      </div>
      <div
        className={classes.Rate}
        style={{ bottom: isTop ? "50px" : "100px" }}
      >
        {movie?.imdbRating}
      </div>

      {open && (
        <div className={classes.DivHover}>
          <StarRatings
            rating={getRatingAvg(movie?.ratings)}
            starRatedColor="#ffe270"
            numberOfStars={5}
            name="rating"
            starDimension="18"
            starSpacing="5"
          />
        </div>
      )}
    </Card>
  );
};

export default MovieCard;
