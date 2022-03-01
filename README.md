<h1>Movie tutorial app </h1> 
 
It's just tutorial with React/Typecript/Firebase - Interview test - Ghady Alhamad
Implemented in 2022, Feb.

![Movie1](https://raw.githubusercontent.com/GhadyAlhamad/MovieApp/main/samples/home4.PNG)

![Movie2](https://raw.githubusercontent.com/GhadyAlhamad/MovieApp/main/samples/genreMovies.PNG?raw=true)

![Movie3](https://raw.githubusercontent.com/GhadyAlhamad/MovieApp/main/samples/movies1.PNG?raw=true)

![Movie4](https://raw.githubusercontent.com/GhadyAlhamad/MovieApp/main/samples/movies5.PNG?raw=true)

![Movie5](https://raw.githubusercontent.com/GhadyAlhamad/MovieApp/main/samples/movies6.PNG?raw=true)

![Movie6](https://raw.githubusercontent.com/GhadyAlhamad/MovieApp/main/samples/movies3.PNG?raw=true)

![Movie7](https://raw.githubusercontent.com/GhadyAlhamad/MovieApp/main/samples/movies4.PNG?raw=true)

![Movie8](https://raw.githubusercontent.com/GhadyAlhamad/MovieApp/main/samples/watchlist.PNG?raw=true)

![Movie9](https://raw.githubusercontent.com/GhadyAlhamad/MovieApp/main/samples/login.PNG?raw=true)

### Tasks

- Implement assignment using:
  - Language: **TypeScript**
  - Framework: **React**
- Build out the project to the designs inside the `/Designs` folder
- Connect your application to our Firebase app **(configuration provided in constants folder)**
- Register an account using Firebase Auth (Email & Password provider).
- Login with your account details in order to view the app protected routes.
- Fetch movies data from Cloud Firestore `movies` collection.
- Group `movies` list in Homepage by `genere`.
- Create `genere` route to display only movies from this specific `genere`
- In `genre` route you can search by movie `title` field and you can sort movies ascending and descending by `year`
- Create `/movies/{id}` route to display movie full details.
- A movie can be added to your watchlist
- Create a Firestore document in `watchlist` collection with document id equals to your account `uid`
- Your watchlist should contain an array of movies you've previously added to your watchlist.
- Create `/watchlist/{id}` route where you can check the list of the movies you've previously added.
- Implement logout flow
