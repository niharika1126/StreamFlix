const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".moviecontainer");
const inputBox = document.querySelector(".inputbox");

// Function to fetch movie details using OMDB API
const getMovieInfo = async (movie) => {
    try {
        const apiKey = "321cc6c1";
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movie)}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch movie data.");
        }

        const data = await response.json();

        if (data.Response === "False") {
            throw new Error("Movie not found.");
        }

        showMovieData(data);
    } catch (error) {
        showErrorMessage(error.message);
    }
};

// Function to display movie data
const showMovieData = (data) => {
    movieContainer.innerHTML = "";

    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-info");
    movieElement.innerHTML = `
        <h2>${Title}</h2>
        <p><strong>Rating: &#11088;</strong> ${imdbRating}</p>
    `;

    const movieGenreElement = document.createElement("div");
    movieGenreElement.classList.add("movie-genre");
    Genre.split(",").forEach((genre) => {
        const p = document.createElement("p");
        p.innerText = genre.trim();
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);
    movieElement.innerHTML += `
        <p><strong>Released Date:</strong> ${Released}</p>
        <p><strong>Duration:</strong> ${Runtime}</p>
        <p><strong>Cast:</strong> ${Actors}</p>
        <p><strong>Plot:</strong> ${Plot}</p>
    `;

    const moviePosterElement = document.createElement("div");
    moviePosterElement.classList.add("movie-poster");
    moviePosterElement.innerHTML = `<img src="${Poster}" alt="Movie Poster"/>`;

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
};

// Function to display error message
const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`;
};

// Adding event listener to the form
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName) {
        getMovieInfo(movieName);
    } else {
        showErrorMessage("Enter a movie name to get movie info.");
    }
});

