
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './main.css';

import Header from '../header/header.js';

import Footer from '../footer/footer';

import {Link} from 'react-router-dom';

import  FilterResults from 'react-filter-search';

export default class Main extends Component {    
    constructor(props) {
        super(props);   
        this.state = {
            // Filmes
            Filmes: [],
            Trending: [],
            Trending2: [],
            mostPopular: [],
            mostRated: [],
            // search
            search: '',            
            movies: [],            
            // node ref in searchBar
            searchBarTab: false,
        }

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
    document.addEventListener('click', this.isInPage, false);      
    } else {
    document.removeEventListener('click', this.isInPage, false);
    }
this.setState( prevState => ({
    searchBarTab: !prevState.searchBarTab
}));      
}

    // adicionando o outclick (node) ao DOM;
isInPage(e) {
if(this.node) {
    const domNode = ReactDOM.findDOMNode(this.node);
    if(this.node.contains(e.target)) {
        return domNode; 
    }
  }
    this.closeSearchBar();
}

queryMovie(e) { 
    e.preventDefault();
    const search = e.target.value;
    this.setState({ search: search });

    let querySearch = `https://api.themoviedb.org/3/search/movie?api_key=5f0de47789bd5535f17999cce273751e&query=${`${search}`}&language=pt-BR`;    
    fetch(querySearch)
    .then((r) => r.json())
    .then((json) => {
       if (this.state.search === search) {
        json.results.sort((movie1, movie2) => {
          const movie1Index =  movie1.title.toLowerCase().indexOf(search);
          const movie2Index =  movie2.title.toLowerCase().indexOf(search);
          if (movie1Index === -1 && movie2Index === -1) return 0;
          if (movie1Index === -1) return 1;
          if (movie2Index === -1) return -1;
          return movie1Index < movie2Index? -1: movie1Index > movie2Index? 1: 0;
        });
        this.setState({ movies: json.results });
      }   
    })
    .catch( error => {
        console.log('error: ' + error);
    });
}


loadMostRated() {   
    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=5f0de47789bd5535f17999cce273751e&language=pt-BR&page=1`;    
    fetch(url)
    .then((r) => r.json())
    .then((json) => {
        this.setState({ mostRated: json.results });        
    })
    .catch( error => {
        console.log('error: ' + error);
    });
}

loadMostPopular() {
    let url = 'https://api.themoviedb.org/3/movie/popular?api_key=5f0de47789bd5535f17999cce273751e&language=pt-BR&page=7';
    fetch(url)
    .then((r) => r.json())
    .then((json) => {
        this.setState( { mostPopular: json.results } );
    }) 
    .catch( error => {
        console.log( 'error: ' + error );
    });
}

async loadTrending() {
   const urlTrendingPage_1 = 'https://api.themoviedb.org/3/trending/movie/day?api_key=5f0de47789bd5535f17999cce273751e&language=pt-BR&page=2';
   await fetch(urlTrendingPage_1)
    .then((r) => r.json())
    .then((json) => {
        this.setState({Trending:json.results});
    })
    .catch( error => {
        console.log( 'error' + error );
    });

   const urlTrendingPage_2 = 'https://api.themoviedb.org/3/trending/movie/day?api_key=5f0de47789bd5535f17999cce273751e&language=pt-BR&page=4';
   await fetch(urlTrendingPage_2)
    .then((r) => r.json())
    .then((json) => {
        this.setState({Trending2: json.results})
        this.setState({Trending: [ ...this.state.Trending, ...this.state.Trending2 ] })
    })
    .catch( error => {
        console.log( 'error' + error );
    });
}

loadMovies() {
    const urlNow_Playing_Page_1 = `https://api.themoviedb.org/3/movie/now_playing/?api_key=5f0de47789bd5535f17999cce273751e&language=pt-BR`;
    fetch(urlNow_Playing_Page_1)
    .then((r) => r.json())
    .then((json) => {
        this.setState({Filmes: json.results});        
    })
    .catch( error => {
        console.log('error: ' + error)
    })
}

render() {
    const { search, movies } = this.state;
   

return(
<div>
    <Header />
    <button className="back"> <Link to="/"> <i class="fas fa-long-arrow-alt-left"></i> </Link> </button>
    <button className="search-result-button" 
     onClick={this.closeSearchBar}>
        <i class="fas fa-search" ></i> 
    </button>

{this.state.searchBarTab &&
    <section className="search-box">
       <div 
       className="search-content"
       ref={node => {this.node = node}}>  
        <input               
            type="text" 
            autoFocus
            placeholder=" Exemplo: O Poderoso Chefão "
            value={ `${search}` }
            onChange={ (e) => this.queryMovie(e) } 
        />            

        <FilterResults                
            value={search}
            data={movies}
            renderResults={res => (
                <div className="search-result" 
                style={ this.state.search.length >= 3 ? {display:'block'} : {display:'none'} }>
                    {res.map((data, index) => (                            
                        <div key={index.id}
                        style={this.state.search === ' ' ? {display:'none'}: {display:'block'}}
                        >
                            <Link to={`Filme/${data?.id}`}>
                                <p> {data?.title || data?.name}
                                    <div className="circlet-search"
                                    style={data?.vote_average 
                                        <= 4 ? {borderColor:'red'} : {borderColor:'gold'}, 
                                        data?.vote_average <= 7 ? {borderColor:'gold'} : {borderColor: 'green'}
                                            }
                                    >
                                        {data?.vote_average}
                                    </div> 
                                 </p>
                               
                            </Link>                      
                        </div>
                    ))
                    }
                </div>
            )}
        />           
       </div>        
    </section>
}

    <section className="header-card"> 
     <h1 className="titles"> Tendências </h1> 
     <div className="header-container">        
        {this.state.Trending.map(item => {
                return(
                    // link card                                       
                    <Link to={`Filme/${item?.id}`}
                    style={{ 
                        backgroundSize:'contain', backgroundPosition:'center',backgroundRepeat:"no-repeat",
                        backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${item?.poster_path}`})`}}
                    >
                    <div>
                        <div className="circlet"
                        style={item?.vote_average 
                            <= 4 ? {borderColor:'red'} : {borderColor:'gold'}, 
                            item?.vote_average <= 7 ? {borderColor:'gold'} : {borderColor: 'green'}
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
                    )
                })
            }    
        </div> 
     </section>

     <section className="header-card"> 
     <h1 className="titles"> Mais Votados </h1>  
      <div className="header-container">            
        {this.state.mostRated.map(item => {
                return(
                    // link card
                    <Link to={`Filme/${item?.id}`}
                    style={{ 
                        backgroundSize:'contain', backgroundPosition:'center',backgroundRepeat:"no-repeat",
                         backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${item?.poster_path}`})`}}
                    >
                    <div>
                        <div className="circlet"
                        style={item?.vote_average 
                            <= 4 ? {borderColor:'red'} : {borderColor:'gold'}, 
                            item?.vote_average <= 7 ? {borderColor:'gold'} : {borderColor: 'green'}
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
                    )
                })
            } 
        </div>  
     </section> 
     
    <section className="header-card"> 
     <h1 className="titles"> Popular </h1>  
      <div className="header-container">            
        {this.state.mostPopular.map(item => {
                return( 
                    // link card
                    <Link to={`Filme/${item.id}`}
                    style={{ 
                        backgroundSize:'contain', backgroundPosition:'center',backgroundRepeat:"no-repeat",
                         backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${item.poster_path}`})`}}
                    >
                    <div>
                        <div className="circlet"
                        style={item.vote_average 
                            <= 4 ? {borderColor:'red'} : {borderColor:'gold'}, 
                            item.vote_average <= 7 ? {borderColor:'gold'} : {borderColor: 'green'}
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
                    )
                })
            }
        </div>  
     </section>
   
    <section className="header-card"> 
        <h1 className="titles"> Para assistir agora </h1>  
        <div class="header-container">           
            {this.state.Filmes.map(item => {
                return(
                    <Link to={`Filme/${item.id}`}
                    style={{ 
                        backgroundSize:'contain',backgroundPosition:'center',backgroundRepeat:"no-repeat",
                         backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${item.poster_path}`})`}}
                    >
                    <div>
                        <div className="circlet"
                        style={item.vote_average 
                            <= 4 ? {borderColor:'red'} : {borderColor:'gold'}, 
                            item.vote_average <= 7 ? {borderColor:'gold'} : {borderColor: 'green'}
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
                    )
                })
            } 
        </div>
    </section>

    <Footer />
</div>

        );
    }
}