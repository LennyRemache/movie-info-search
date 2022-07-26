// https://image.tmdb.org/t/p/original/2u1YBNBlSwvBReyvI7i5z5ykQXP.jpg
// https://image.tmdb.org/t/p/original/[poster_path]
// the movie db API -> The Movie Database to retrieve movie searches

const movies = {
  getPopular: async function () {
    return await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1&region=US`,
      { method: "GET" }
    )
      .then((res) => {
        if (res.ok) {
          console.log("Successful Popular Movies API call!");
        } else {
          console.log("Failed Popular Movies API call!");
        }
        return res.json();
      })
      .then((data) => {
        const popMovieOne = data.results[0];
        const popMovieTwo = data.results[1];
        const popMovieThree = data.results[2];
        return [popMovieOne, popMovieTwo, popMovieThree];
      });
  },
  getTrending: async function () {
    return await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`,
      { method: "GET" }
    )
      .then((res) => {
        if (res.ok) {
          console.log("Successful Trending Movies API call!");
        } else {
          console.log("Failed Trending Movies API call!");
        }
        return res.json();
      })
      .then((data) => {
        const trendingMovie = data.results[0];
        return trendingMovie;
      });
  },
  getUpcoming: async function () {
    return await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1&region=US`,
      { method: "GET" }
    )
      .then((res) => {
        if (res.ok) {
          console.log("Successful Upcoming Movies API call!");
        } else {
          console.log("Failed Upcoming Movies API call!");
        }
        return res.json();
      })
      .then((data) => {
        const upcomingMovieOne = data.results[0];
        const upcomingMovieTwo = data.results[1];
        const upcomingMovieThree = data.results[2];
        return [upcomingMovieOne, upcomingMovieTwo, upcomingMovieThree];
      });
  },
  getGenreMovies: async function (genre) {
    return await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}&with_watch_monetization_types=flatrate`,
      { method: "GET" }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const movieOne = data.results[0];
        const movieTwo = data.results[1];
        const movieThree = data.results[2];
        const movieFour = data.results[3];
        return [movieOne, movieTwo, movieThree, movieFour];
      });
  },
};

async function getGenres() {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`,
    { method: "GET" }
  );
  const data = await res.json();
  return data.genres;
}

// window.addEventListener("load", async () => {
//   let genres = [];
//   try {
//     genres = await getGenres();
//   } catch (e) {
//     console.log("Error: ", e);
//   }
//   renderGenres("Action", genres);
//   renderGenres("Romance", genres);
//   renderGenres("Documentary", genres);
//   renderGenres("Animation", genres);
// });

window.addEventListener("load", () => {
  renderTopTrending();
  renderPopMovies();
  renderUpcomingMovies();
});

// renders the #1 Trending Movie at top of the page
async function renderTopTrending() {
  const trendingMovie = await movies.getTrending();
  const movieImage = document.querySelector(".popular-movie-img");
  movieImage.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/original${trendingMovie.backdrop_path}`
  );
  movieImage.setAttribute("name", trendingMovie.id);
  const movieTitle = document.querySelector(".popular-movie-title");
  movieTitle.textContent = trendingMovie.title;
  movieTitle.setAttribute("name", `${trendingMovie.id}`);
  const popMovieContainer = document.querySelector(".popular-movie");
  popMovieContainer.setAttribute("name", `${trendingMovie.id}`);
  getAllMovies();
}

// async function renderGenres(genre_name, genres) {
//   let genre_id;
//   genres.forEach((genre) => {
//     if (genre_name === genre.name) {
//       genre_id = genre.id;
//     }
//   });
//   const [movieOne, movieTwo, movieThree, movieFour] =
//     await movies.getGenreMovies(genre_id);
//   const movieImages = document.querySelectorAll(
//     `.${genre_name.toLowerCase()}-movie-img`
//   );
//   movieImages[0].setAttribute(
//     "src",
//     `https://image.tmdb.org/t/p/original${movieOne.backdrop_path}`
//   );
//   movieImages[0].setAttribute("name", movieOne.id);

//   movieImages[1].setAttribute(
//     "src",
//     `https://image.tmdb.org/t/p/original${movieTwo.backdrop_path}`
//   );
//   movieImages[1].setAttribute("name", movieTwo.id);

//   movieImages[2].setAttribute(
//     "src",
//     `https://image.tmdb.org/t/p/original${movieThree.backdrop_path}`
//   );
//   movieImages[2].setAttribute("name", movieThree.id);

//   movieImages[3].setAttribute(
//     "src",
//     `https://image.tmdb.org/t/p/original${movieFour.backdrop_path}`
//   );
//   movieImages[3].setAttribute("name", movieFour.id);
// }

// renders the 3 most popular movies into thw carousal containing popular movies
async function renderPopMovies() {
  const [popMovieOne, popMovieTwo, popMovieThree] = await movies.getPopular();
  const popularMovieImages = document.querySelectorAll(".popular-movie-image");

  const firstTitle = document.querySelector(".first-pop-title");
  firstTitle.textContent = popMovieOne.title;
  popularMovieImages[0].setAttribute(
    "src",
    `https://image.tmdb.org/t/p/original${popMovieOne.backdrop_path}`
  );
  popularMovieImages[0].setAttribute("name", popMovieOne.id);

  const secondTitle = document.querySelector(".second-pop-title");
  secondTitle.textContent = popMovieTwo.title;
  popularMovieImages[1].setAttribute(
    "src",
    `https://image.tmdb.org/t/p/original${popMovieTwo.backdrop_path}`
  );
  popularMovieImages[1].setAttribute("name", popMovieTwo.id);

  const thirdTitle = document.querySelector(".third-pop-title");
  thirdTitle.textContent = popMovieThree.title;
  popularMovieImages[2].setAttribute(
    "src",
    `https://image.tmdb.org/t/p/original${popMovieThree.backdrop_path}`
  );
  popularMovieImages[2].setAttribute("name", popMovieThree.id);
}

// renders 3 upcoming movies into the carousal containing upcoming movies
async function renderUpcomingMovies() {
  const [upcomingMovieOne, upcomingMovieTwo, upcomingMovieThree] =
    await movies.getUpcoming();
  const upcomingMovieImages = document.querySelectorAll(".upcoming-movie-img");

  const firstTitle = document.querySelector(".first-upcoming-title");
  firstTitle.textContent = upcomingMovieOne.title;
  upcomingMovieImages[0].setAttribute(
    "src",
    `https://image.tmdb.org/t/p/original${upcomingMovieOne.backdrop_path}`
  );
  upcomingMovieImages[0].setAttribute("name", upcomingMovieOne.id);

  const secondTitle = document.querySelector(".second-upcoming-title");
  secondTitle.textContent = upcomingMovieTwo.title;
  upcomingMovieImages[1].setAttribute(
    "src",
    `https://image.tmdb.org/t/p/original${upcomingMovieTwo.backdrop_path}`
  );
  upcomingMovieImages[1].setAttribute("name", upcomingMovieTwo.id);

  const thirdTitle = document.querySelector(".third-upcoming-title");
  thirdTitle.textContent = upcomingMovieThree.title;
  upcomingMovieImages[2].setAttribute(
    "src",
    `https://image.tmdb.org/t/p/original${upcomingMovieThree.backdrop_path}`
  );
  upcomingMovieImages[2].setAttribute("name", upcomingMovieThree.id);
}

getAllMovies();
