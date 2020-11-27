import React, { useState, useEffect } from "react";

import axios from "../../axios";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

import "./Row.scss";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    /* if [], run once when row loads, and don't run again
        if [movies], the useEffect will run every time the movies 
        variable change */
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);

      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "700",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      // If there's already a movie playing, then clear it
      //and hide the video
      setTrailerUrl("");
      //Then play the next video
      movieTrailer(movie.title || movie?.name || "")
        .then((url) => {
          // example:
          //https://www.youtube.com/watch?v=XtMThy8QKqU
          const urlParams = new URLSearchParams(new URL(url).search);
          // the 'v' bellow allows us access its value
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      movieTrailer(movie.title || movie?.name || movie?.source || "")
        .then((url) => {
          // example:
          //https://www.youtube.com/watch?v=XtMThy8QKqU
          const urlParams = new URLSearchParams(new URL(url).search);
          // the 'v' bellow allows us access its value
          setTrailerUrl(urlParams.get("v"));
          console.log("MOVIE: ");
          console.log(urlParams);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            key={movie.id}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
