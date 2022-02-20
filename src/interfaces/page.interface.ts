import { ReactNode } from "react";

export interface IPageProps {
  name: string;
}

export interface IAuthRouteProps {
  children: ReactNode;
}
export default interface IRoute {
  link: string;
  component: any;
  name: string;
  exact: boolean;
  hidden?: boolean;
  protected?: boolean;
}

export interface IMovie {
  id: string;
  movie: any;
}

export interface IMovies {
  name: string;
  movies: IMovie[];
}
export interface ISearchData {
  text: string;
  year?: number;
}
