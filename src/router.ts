import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/index";
import Movie from "./pages/Movie/index";
import Aboutus from "./pages/Aboutus/index";
import Genre from "./pages/Genre/index";
import IRoute from "./interfaces/page.interface";
import Watchlist from "./pages/Watchlist";
import Movies from "./pages/Movies";

const routes: IRoute[] = [
  {
    link: "/login",
    component: Login,
    name: "Login",
    exact: true,
    hidden: false,
    protected: false,
  },
  {
    link: "/signup",
    component: SignUp,
    name: "SignUp",
    exact: true,
    hidden: false,
    protected: false,
  },
  {
    link: "/",
    component: Home,
    name: "Home",
    exact: true,
    hidden: true,
    protected: true,
  },
  {
    link: "/aboutus",
    component: Aboutus,
    name: "About us",
    exact: true,
    hidden: true,
    protected: true,
  },
  {
    link: "/movies/:id",
    component: Movie,
    name: "Movie details",
    exact: true,
    hidden: true,
    protected: true,
  },
  {
    link: "/genre/:genrename",
    component: Genre,
    name: "Genre Movies",
    exact: true,
    hidden: true,
    protected: true,
  },
  {
    link: "/watchlist/:uid",
    component: Watchlist,
    name: "User watch list",
    exact: true,
    hidden: true,
    protected: true,
  },
  {
    link: "/movieslist",
    component: Movies,
    name: "Movie list",
    exact: true,
    hidden: true,
    protected: true,
  },
];
export default routes;
