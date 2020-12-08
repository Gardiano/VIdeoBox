import React, { Component } from "react";
import "./filmes.css";
import "./medias.css";

import { Link } from "react-router-dom";

import Header from "../header/header";

import Footer from "../footer/footer";

import Moment from "react-moment";
import "moment/locale/pt-br";

import Iframe from "react-iframe";

import person from "../../assets/person.png";

Moment.globalLocale = "pt-br";

export default class Films extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Movies: Object,
      Credits: [],      
      keyVideo: String
    };
  }

  componentDidMount() {
    this.loadMovies();
    this.loadCredits();
    this.loadVideos();
  }

 async loadMovies() {
    let { id } = this.props.match.params;
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=5f0de47789bd5535f17999cce273751e&language=pt-BR`;
  await fetch(url)
      .then((r) => r.json())
      .then((json) => {
        this.setState({ Movies: json });
      })
      .catch((error) => {
        console.log(error);
      });
  }

 async loadCredits() {
    let { id } = this.props.match.params;
    let url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=5f0de47789bd5535f17999cce273751e&language=pt-BR`;
   await fetch(url)
      .then((r) => r.json())
      .then((json) => {       
        this.setState({ Credits: json.cast });
      })
      .catch((error) => {
        console.log(error);
      });
  }

 async loadVideos() {
    let { id } = this.props.match.params;
    let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=5f0de47789bd5535f17999cce273751e&language=pt-BR`;
   await fetch(url)
      .then((r) => r.json())
      .then((json) => {
        json.results.map(key => 
          this.setState({keyVideo: key.key})                  
        )})
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Header />
        <main
          style={{
            backgroundImage: `linear-Gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ) , url(${`https://image.tmdb.org/t/p/w500${this.state.Movies.backdrop_path}`})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="main-content">
            <div
              className="poster"
              style={{
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${this.state.Movies.poster_path}`})`,
              }}
            >
              <div className="like">
                <p>
                  
                  <i class="fas fa-heart"></i> {this.state.Movies.vote_count}
                </p>
              </div>
            </div>
            <div className="textos-box">
              <h1> {this.state.Movies.title} </h1>

              <h5>
                Data De Lançamento:&nbsp;
                <Moment
                  id="tag-generos"
                  locale="pt-br"
                  format="DD/MM/YYYY"
                  date={this.state.Movies.release_date}
                    style={{                  
                    marginBottom:'10px',
                    background:'rgb(10, 120, 153)'
                  }}
                ></Moment>
              </h5>

              <h6>
                Gênero:
                {this.state.Movies?.genres?.map((item) => {
                  return (
                  <h6 id="tag-generos" style={
                  item.name === 'Ação' ? 
                  {background:'rgb(15, 64, 197)'} 
                  :
                  item.name === 'Thriller' ? 
                  {background:'rgb(100, 100, 100)'} 
                  : 
                  item.name === 'Ficção científica' ? 
                  {background:'rgb(55, 134, 55)'} 
                  :
                  item.name === 'Suspense' ? 
                  {background:'orangered'} 
                  :
                  item.name === 'Drama' ? 
                  {background:'orange'} 
                  :
                  item.name === 'Crime' ? 
                  {background:'rgb(15, 33, 71)'} 
                  :
                  item.name === 'Romance' ? 
                  {background:'rgb(168, 4, 4)'} 
                  :
                  item.name === 'Terror' ? 
                  {background:'black'} 
                  :
                  item.name === 'Família' ? 
                  {background:'yellowgreen'} 
                  :
                  item.name === 'Fantasia' ? 
                  {background:'violet'} 
                  :
                  item.name === 'Comédia' ? 
                  {background:'purple'} 
                  :
                  item.name === 'História' ? 
                  {background:'Brown'} 
                  :
                  item.name === 'Aventura' ? 
                  {background:'rgb(27, 146, 134)'} 
                  :
                  {}
                }> {item.name} </h6>
                  );
                })}
              </h6>

              <h5>
                Duração: {this.state.Movies.runtime} Min
              </h5>

              <div className="avaliacao-box">
                <strong>
                  Avaliação dos usuários
                  <div
                    className="circlet-films"
                    style={
                      (this.state.Movies.vote_average <= 4
                        ? { borderColor: "red" }
                        : { borderColor: "gold" },
                      this.state.Movies.vote_average <= 7
                        ? { borderColor: "gold" }
                        : { borderColor: "green" })
                    }
                  >
                    <p> {this.state.Movies.vote_average} </p>
                  </div>
                </strong>
              </div>

              <label className="tagline">
               
                {this.state.Movies.tagline} &nbsp;
              </label>

              <strong className="overview">
                {this.state.Movies.overview}
              </strong>
            </div>
          </div>
        </main>

        <h1 style={{
          marginTop: "70px!important", 
          marginBottom: "-50px",
          color:'whitesmoke' }}>
          
          Atores
        </h1>
        <section>
          <div className="crew-box">
            {this.state?.Credits?.map((item) => {
              return (
                <div
                  key={item?.id}
                  style={
                    item?.profile_path == null
                      ? {
                          backgroundImage: `url(${`${person}`})`,
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                        }
                      : {
                          backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${item?.profile_path}`})`,
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                        }
                  }
                >
                  <div>
                    <div className="fade-box">
                      <div className="fade-content">
                        <p> N: {item?.name} </p>
                        C: {item?.character}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div>
          <Iframe
            url={ `https://www.youtube.com/embed/${this.state?.keyVideo}` } 
            className="iframe"
            display="flex"
            backgroundPosition="center"
            position="relative"
            styles={{ width: "100%" }}
          />
        </div>

        <div className="back-button-box">
          <Link className="back-button" to="/Home">
            <i class="fas fa-long-arrow-alt-left"></i>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
}
