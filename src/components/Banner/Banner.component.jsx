import React, { useState, useEffect } from "react";

import axios from "../../axios";
import requests from "../../requests";
import Play from "../../assets/play.svg";
import Eye from "../../assets/visibility.svg";
import Star from "../../assets/star.svg";

import "./Banner.scss";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      console.log(request);
      return request;
    };
    fetchData();
  }, []);

  const truncate = (str, num) => {
    return str?.length > num ? str.substr(0, num - 1) + "..." : str;
  };

  const truncateDate = (str, num) => {
    return str?.length > num && str.substr(0, num - 1);
  };

  return (
    <header
      className="hero"
      style={{
        backgroundSize: "cover",
        background: `url(
          "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}") no-repeat top center`,
      }}
    >
      <div className="hero_contents">
        <div className="hero_contents_sections">
          <div>
            <h1 className="hero_title">
              {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <div className="hero_buttons">
              <h3 className="hero_description">
                {truncate(movie?.overview, 140)}
              </h3>
              <div className="hero_buttons_container">
                <button className="hero_button play">
                  <img src={Play} alt="Play button icon" />
                  Play
                </button>
                <button className="hero_button list">My List</button>
              </div>
            </div>
          </div>
          <div className="hero_infos">
            <p>{truncateDate(movie?.release_date, 5)}</p>
            <p>
              <img src={Eye} alt="Star icon" className="eye" />{" "}
              {movie?.popularity}
            </p>
            <p>
              <img src={Star} alt="Star icon" /> {movie?.vote_average}
            </p>
          </div>
        </div>
      </div>
      <div className="hero_fade_bottom"></div>
    </header>
  );
};

export default Banner;
