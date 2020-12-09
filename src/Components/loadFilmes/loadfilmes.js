import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./loadfilmes.css";
import "./medias.css";

import Header from "../header/header";

import Footer from "../footer/footer";

import { Link } from "react-router-dom";

import FilterResults from "react-filter-search";

import EmptyFilm from "../../assets/film.png";

export default class LoadFilmes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Filmes
      Filmes: [],
      Trending: [],
      mostPopular: [],
      mostRated: [],
      // search
      search: "",
      movies: [],
      // node ref in searchBar
      searchBarTab: false,
    };
    this.closeSearchBar = this.closeSearchBar.bind(this);
    this.isInPage = this.isInPage.bind(this);
  }

  componentDidMount() {
    this.loadMovies();
    this.loadTrending();
    this.loadMostPopular();
    this.loadMostRated();
  }

  closeSearchBar() {
    if (!this.state.searchBarTab) {
      document.addEventListener("click", this.isInPage, false);
    } else {
      document.removeEventListener("click", this.isInPage, false);
    }
    this.setState((prevState) => ({
      searchBarTab: !prevState.searchBarTab,
    }));
    this.setState({ search: "" });
  }

  // adicionando o outclick (node) ao DOM;
  isInPage(e) {
    if (this.node) {
      const domNode = ReactDOM.findDOMNode(this.node);
      if (this.node.contains(e.target)) {
        return domNode;
      }
    }
    this.closeSearchBar();
  }

  async queryMovie(e) {
    e.preventDefault();
    const search = e.target.value;
    this.setState({ search: search });

    let querySearch = `https://api.themoviedb.org/3/search/movie?api_key=5f0de47789bd5535f17999cce273751e&query=${`${search}`}&language=pt-BR`;
    await fetch(querySearch)
      .then((r) => r.json())
      .then((json) => {
        if (this.state.search === search) {
          json.results.sort((movie1, movie2) => {
            const movie1Index = movie1.title.toLowerCase().indexOf(search);
            const movie2Index = movie2.title.toLowerCase().indexOf(search);
            if (movie1Index === -1 && movie2Index === -1) return 0;
            if (movie1Index === -1) return 1;
            if (movie2Index === -1) return -1;
            return movie1Index < movie2Index
              ? -1
              : movie1Index > movie2Index
              ? 1
              : 0;
          });
          this.setState({ movies: json.results });
        }
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  }

  async loadTrending() {
    let urlTrending = `https://api.themoviedb.org/3/trending/movie/day?api_key=5f0de47789bd5535f17999cce273751e&language=pt-BR&page=2`;
    await fetch(urlTrending)
      .then((r) => {  
        if (r.status === 200) {
          return r.json();
        }
        if (r.status === 404 || r.status === 400) {
          throw Error(r.statusText);
        }
      })
      .then((json) => {
        this.setState({ Trending: json.results });
      })
      .catch((error) => {
        console.log(`Catch: ${error}`);
      });
  }

  async loadMostRated() {
    let urlRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=5f0de47789bd5535f17999cce273751e&language=pt-BR`;
    await fetch(urlRated)
      .then((r) => r.json())
      .then((json) => {
        this.setState({ mostRated: json.results });
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  }

  async loadMostPopular() {
    let urlPopular = `https://api.themoviedb.org/3/movie/popular?api_key=5f0de47789bd5535f17999cce273751e&language=pt-BR&page=2`;
    await fetch(urlPopular)
      .then((r) => r.json())
      .then((json) => {
        this.setState({ mostPopular: json.results });
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  }

  async loadMovies() {
    let urlNowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=5f0de47789bd5535f17999cce273751e&language=pt-BR&page=2`;
    await fetch(urlNowPlaying)
      .then((r) => r.json())
      .then((json) => {
        this.setState({ Filmes: json.results });
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  }

  render() {
    const { search, movies } = this.state;
    return (
      <div onClick={this.closeSearchBar}>
        <Header />
        <section className="search-box">
          <div className="search-content">
            <input
              ref={(node) => {
                this.node = node;
              }}
              type="text"              
              placeholder=" Exemplo: O Poderoso Chefão "
              value={`${search}`}
              onChange={(e) => this.queryMovie(e)}
            />

            <FilterResults
              value={search}
              data={movies}
              renderResults={(res) => (
                <div
                  className="search-result"
                  style={
                    this.state.search.length >= 3
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  {res.map((data, index) => (
                    <div
                      key={index.id}
                      style={
                        this.state.search === " "
                          ? { display: "none" }
                          : { display: "block" }
                      }
                    >
                      <Link to={`Filme/${data?.id}`}>
                        <span
                          className="image-link-film"
                          style={{
                            backgroundSize: "100px 50px",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${data?.poster_path}`})`,
                          }}
                        ></span>
                        <p>
                          {data?.title || data?.name}
                          <div
                            className="circlet-search"
                            style={
                              (data?.vote_average <= 4
                                ? { borderColor: "red" }
                                : { borderColor: "gold" },
                              data?.vote_average <= 7
                                ? { borderColor: "gold" }
                                : { borderColor: "green" })
                            }
                          >
                            {data?.vote_average}
                          </div>
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            />
          </div>
        </section>

        <section className="header-card">
          <h1 className="titles"> Tendências </h1>
          <div className="header-container">
            {this.state.Trending.map((item) => {
              return (
                <Link
                  to={`Filme/${item?.id}`}
                  style={
                    item.poster_path == null
                      ? {
                          backgroundImage: `url(${`${EmptyFilm}`})`,
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",                                             
                        }
                      : {
                          backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${item.poster_path}`})`,
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",                         
                        }
                  }
                >
                  <div>
                    <div
                      className="circlet"
                      style={
                        (item?.vote_average <= 4
                          ? { borderColor: "red" }
                          : { borderColor: "gold" },
                        item?.vote_average <= 7
                          ? { borderColor: "gold" }
                          : { borderColor: "green" })
                      }
                    >
                      {item?.vote_average}
                    </div>

                    <div className="fade">
                      <p className="titulo" key={item?.id}>
                        {item?.title || item?.name}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="header-card">
          <h1 className="titles"> Mais Votados </h1>
          <div className="header-container">
            {this.state.mostRated.map((item) => {
              return (
                // link card
                <Link
                  to={`Filme/${item?.id}`}
                  style={
                    item.poster_path == null
                      ? {
                          backgroundImage: `url(${`${EmptyFilm}`})`,
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                        }
                      : {
                          backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${item.poster_path}`})`,
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                        }
                  }
                >
                  <div>
                    <div
                      className="circlet"
                      style={
                        (item.vote_average <= 4
                          ? { borderColor: "red" }
                          : { borderColor: "gold" },
                        item.vote_average <= 7
                          ? { borderColor: "gold" }
                          : { borderColor: "green" })
                      }
                    >
                      {item.vote_average}
                    </div>

                    <div className="fade">
                      <p className="titulo" key={item?.id}>
                        {item?.title || item?.name}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="header-card">
          <h1 className="titles"> Popular </h1>
          <div className="header-container">
            {this.state.mostPopular.map((item) => {
              return (
                // link card
                <Link
                  to={`Filme/${item.id}`}
                  style={
                    item.poster_path == null
                      ? {
                          backgroundImage: `url(${`${EmptyFilm}`})`,
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                        }
                      : {
                          backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${item.poster_path}`})`,
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                        }
                  }
                >
                  <div>
                    <div
                      className="circlet"
                      style={
                        (item.vote_average <= 4
                          ? { borderColor: "red" }
                          : { borderColor: "gold" },
                        item.vote_average <= 7
                          ? { borderColor: "gold" }
                          : { borderColor: "green" })
                      }
                    >
                      {item.vote_average}
                    </div>

                    <div className="fade">
                      <p className="titulo" key={item.id}>
                        {item.title || item.name}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="header-card">
          <h1 className="titles"> Para Assistir Agora </h1>
          <div class="header-container">
            {this.state.Filmes.map((item) => {
              return (
                <Link
                  to={`Filme/${item.id}`}
                  style={
                    item.poster_path == null
                      ? {
                          backgroundImage: `url(${`${EmptyFilm}`})`,
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                        }
                      : {
                          backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${item.poster_path}`})`,
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                        }
                  }
                >
                  <div>
                    <div
                      className="circlet"
                      style={
                        (item.vote_average <= 4
                          ? { borderColor: "red" }
                          : { borderColor: "gold" },
                        item.vote_average <= 7
                          ? { borderColor: "gold" }
                          : { borderColor: "green" })
                      }
                    >
                      {item.vote_average}
                    </div>

                    <div className="fade">
                      <p className="titulo" key={item.id}>
                        {item.title || item.name}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
