import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState();
  const [isLoading, setIsLoadnig] = useState(false);
  const [error, setError] = useState(null);

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://react-http-129a6-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();
    console.log(data);
  };

  const fetchMovieHandler = useCallback(async () => {
    setIsLoadnig(true);
    setError(null);
    try {
      const res = await fetch(
        "https://react-http-129a6-default-rtdb.firebaseio.com/movies.json",
      );

      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const data = await res.json();

      let loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }

    setIsLoadnig(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  let content = <p>Found No Movies</p>;

  if (!isLoading) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
