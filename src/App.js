import React from "react";
import "./App.css";
import requests from "./requests";

import Nav from "./components/Nav/Nav.component";
import Row from "./components/Row/Row.component";
import Banner from "./components/Banner/Banner.component";

function App() {
  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row
        title="NETFILX ORIGINAL"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
