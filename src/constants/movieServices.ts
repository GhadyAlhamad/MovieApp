import {
  collection,
  query,
  onSnapshot,
  limit,
  orderBy,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { IMovie } from "../interfaces/page.interface";
import firebase from "firebase/compat/app";
import { db } from "./firebase";
import Notiflix from "notiflix";

const moviesRef = collection(db, "movies");
const watchlistRef = collection(db, "watchlist");

export const readMoviesByGenre = (
  genreName: string,
  setMovies: any,
  setLoading: any
) => {
  // create movies array
  let movies: IMovie[] = [];
  // create query to retreive movie by genre
  const moviesquery = query(
    moviesRef,
    where("genres", "array-contains", genreName)
  );

  // read movies
  onSnapshot(moviesquery, (querySnapshot) => {
    // push movies into array
    for (const doc of querySnapshot.docs) {
      movies.push({ id: doc.id, movie: doc.data() });
    }

    // set movies
    setMovies(movies);
    // set loading true to finish
    setLoading(true);
  });
};

export const readMovieById = (
  movieID: string,
  setMovie: any,
  setRelatedMovies: any,
  setWatchlistMovies: any,
  setAddedToWatchlist: any,
  setLoading: any
) => {
  // create generes array
  let genres: any[] = [];

  // create query to retreive movie by genre
  const moviesquery = query(
    moviesRef,
    where(firebase.firestore.FieldPath.documentId(), "==", movieID)
  );

  // read unique genres
  onSnapshot(moviesquery, async (querySnapshot) => {
    // set movie
    setMovie(querySnapshot?.docs[0]?.data());
    // read movie genres
    genres = querySnapshot?.docs[0]?.get("genres");

    // create array for promises
    const promises: any[] = [];

    // read user
    const currentUser =
      localStorage.getItem("user") != null
        ? JSON.parse(localStorage.getItem("user") as string)
        : null;

    // create query to retreive movie movie
    const watchlistRefMoviesquery = query(
      watchlistRef,
      where(firebase.firestore.FieldPath.documentId(), "==", currentUser.uid)
    );

    // push new doc into promises array
    promises.push(getDocs(watchlistRefMoviesquery));

    // read related movies
    genres?.forEach((genre) => {
      // create query to retreive movie by genre
      const moviesquery = query(
        moviesRef,
        where("genres", "array-contains", genre),
        where(firebase.firestore.FieldPath.documentId(), "!=", movieID),
        limit(2)
      );

      // push new doc into promises array
      promises.push(getDocs(moviesquery));
    });

    // collect all the query results together into a single list
    const relatedMoviesSnapshots = await Promise.all(promises);

    // create some important variable
    let counter = 0;
    let watchlistMovies: IMovie[] = [];
    let relatedMovies: any = [];

    for (const snap of relatedMoviesSnapshots) {
      if (counter > 0) {
        // push new related movies
        for (const doc of snap.docs)
          if (
            relatedMovies.filter((movie: any) => movie.id == doc.id).length == 0
          )
            relatedMovies.push({ id: doc.id, movie: doc.data() });
      } else if (counter == 0) {
        // push new watchlist movie
        if (snap.docs[0] && snap.docs[0].data())
          for (const movieInfo of snap.docs[0].data().movies)
            watchlistMovies.push({ id: movieInfo.id, movie: movieInfo.movie });

        if (watchlistMovies.filter((movie) => movie.id == movieID).length > 0)
          setAddedToWatchlist(true);
        else setAddedToWatchlist(false);
      }
      // increment counter
      counter++;
    }

    // set related movies
    setRelatedMovies(relatedMovies);
    // set watchlist movies
    setWatchlistMovies(watchlistMovies);

    // set loading true to finish
    setLoading(true);
  });
};

export const readMovies = async (
  setGenreMovies: any,
  setTopMovies: any,
  setLatestMovies: any,
  setLoading: any
) => {
  // create generes array
  let genres: any[] = [];
  // create query for genres
  const genresquery = query(moviesRef);

  // read unique genres
  onSnapshot(genresquery, async (querySnapshot) => {
    querySnapshot.forEach(async (doc) => {
      // merge new genres
      genres = Array.from(new Set<any>([...genres, ...doc.get("genres")]));
    });

    // create array for promises
    const promises: any[] = [];

    // create query to retreive top movies
    const topmoviesquery = query(moviesRef, where("imdbRating", ">", 8.6));
    // push new doc into promises array
    promises.push(getDocs(topmoviesquery));

    // create query to retreive latest movies
    const latestmoviesquery = query(
      moviesRef,
      orderBy("year", "desc"),
      limit(2)
    );
    // push new doc into promises array
    promises.push(getDocs(latestmoviesquery));

    genres.forEach((genre) => {
      // create query to retreive movie by genre
      const moviesquery = query(
        moviesRef,
        where("genres", "array-contains", genre),
        limit(5)
      );

      // push new doc into promises array
      promises.push(getDocs(moviesquery));
    });

    // collect all the query results together into a single list
    const snapshots = await Promise.all(promises);

    // create some important variable
    let counter = 0;
    let genreMovies = [];
    let topMovies: IMovie[] = [];
    let latestMovies: IMovie[] = [];
    let movies: IMovie[] = [];

    for (const snap of snapshots) {
      // reset array
      movies = [];

      // push movies into array
      for (const doc of snap.docs) {
        movies.push({ id: doc.id, movie: doc.data() });
      }

      if (counter > 1) {
        // create genre movies
        let genreMovie = { name: genres[counter - 2], movies: movies };
        // push new genre movie
        genreMovies.push(genreMovie);
      } else if (counter == 0) {
        // assign to top movie
        topMovies = movies;
      } else if (counter == 1) {
        // assign to latest movie
        latestMovies = movies;
      }

      // increment counter
      counter++;
    }
    // set genre movies
    setGenreMovies(genreMovies);
    // set top movie
    setTopMovies(topMovies);
    // set latest movie
    setLatestMovies(latestMovies);
    // set loading true to finish
    setLoading(true);
  });
};

export const readWatchlistMovies = (
  uid: any,
  setMovies: any,
  setLoading: any
) => {
  // create movies array
  let movies: IMovie[] = [];
  // create query to retreive movie movie
  const watchlistRefMoviesquery = query(
    watchlistRef,
    where(firebase.firestore.FieldPath.documentId(), "==", uid)
  );

  // read watch list movies
  onSnapshot(watchlistRefMoviesquery, (querySnapshot) => {
    // push movies into array
    for (const movieInfo of querySnapshot.docs[0].data().movies) {
      movies.push({ id: movieInfo.id, movie: movieInfo.movie });
    }
    // set movies
    setMovies(movies);
    // set loading true to finish
    setLoading(true);
  });
};

export const createWatchlistMovie = async (uid: any) => {
  console.log(uid);
  // create document for user under watch list collection
  await setDoc(doc(db, "watchlist", uid), {
    movies: [],
  });
  console.log("created");
};

export const updateWatchlistMovies = async (
  movie: any,
  watchlistMovies: any[],
  setWatchlistMovies: any,
  setAddedToWatchlist: any,
  addedToWatchlist: boolean,
  setLoading: any
) => {
  // set loading true to start
  setLoading(false);

  // read user
  const currentUser =
    localStorage.getItem("user") != null
      ? JSON.parse(localStorage.getItem("user") as string)
      : null;

  // create query to retreive movie
  const watchlistRefMoviesquery = doc(db, "watchlist", currentUser.uid);

  if (addedToWatchlist) {
    // set watch list after remove
    setWatchlistMovies(
      watchlistMovies.filter((mov) => {
        return mov.id !== movie.id;
      })
    );
  } else {
    // add to watch list
    watchlistMovies.push(movie);
    // set watch list
    setWatchlistMovies(watchlistMovies);
  }

  // already added, need to remove
  if (addedToWatchlist) {
    // update document
    await updateDoc(watchlistRefMoviesquery, {
      movies: arrayRemove(movie),
    });
    // notify user with movie removing message
    Notiflix.Notify.success("The movie has been removed successfully", {
      timeout: 6000,
    });
  } else {
    // update document
    await updateDoc(watchlistRefMoviesquery, {
      movies: arrayUnion(movie),
    });
    // notify user with movie adding message
    Notiflix.Notify.success("The movie has been added successfully", {
      timeout: 6000,
    });
  }

  // update flag
  setAddedToWatchlist(!addedToWatchlist);

  // set loading true to finish
  setLoading(true);
};
