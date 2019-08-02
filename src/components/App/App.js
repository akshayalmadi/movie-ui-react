import React from 'react'
import Search from '../Search/Search'
import MovieList from '../MovieList/MovieList'
import WatchList from '../WatchList/WatchList'
import { fetchPopularMovies } from '../../services/api'
import { fetchTopRatedMovies } from '../../services/api'
import './App.css'
import keys from '../../config/keys'

class App extends React.Component {
  constructor() {
    super()

    this.getInputValue = this.getInputValue.bind(this)
    this.getSearchResult = this.getSearchResult.bind(this)

    this.state = {
      movies: [],
      topRated:[],
      searchValue: '',
      searchResult: [],
      limit:10,
      loading:true,
      noContent:keys.noContent
    }

    this.handler = this.handler.bind(this)
  }

  componentDidMount() {
        fetchPopularMovies().then(data => {
          var finalresult = this.compareValues(data.results);
          this.setState({
            movies: finalresult,
          })
        })

        fetchTopRatedMovies().then(data => {
          var finalresult = this.compareValues(data.results);
          this.setState({
            topRated: finalresult,
            loading : false
          })
        })
        
  }

  compareValues(data){
    var a = data;
    var b = JSON.parse(localStorage.getItem('user_wishlist'));
    for (var i = 0, len = a.length; i < len; i++) { 
      if( b.length>0){
      for (var j = 0, len2 = b.length; j < len2; j++) { 
          if (a[i].id === b[j].id) {
            a[i]['isfav'] = '1';
            break;
          }else{
            a[i]['isfav'] = '0';
          }
      }
    }else{a[i]['isfav'] = '0';}

    }
    return a;
  }

  getInputValue(searchValue) {
    this.setState({
      searchValue: searchValue
    })
  }

  getSearchResult(searchResult) {
    this.setState({
      searchResult: searchResult
    })
  }
  loadMore() {
    var limit = this.state.limit+10;
    this.setState({
      limit: this.state.limit+10
    })
  }
  refreshPage(){ 
    window.location.reload(); 
  }

  goToMovie() {
    this.props.history.push('/watchlist')
  }

  handler(event, details) {
   
    event.stopPropagation();
    if (localStorage.getItem("user_wishlist") === null) {
      var wishlist =  []; var wishlist_item =  [];
    }else{
      var wishlist = localStorage.getItem('user_wishlist');
      var wishlist_item = localStorage.getItem("wishlist_mapping");
    }
    if (wishlist.length > 0) {
      wishlist = JSON.parse(localStorage.getItem('user_wishlist'));
      wishlist_item = JSON.parse(localStorage.getItem('wishlist_mapping'));
    }
   
    if(wishlist_item.indexOf(details.id) != -1){
      wishlist.splice(wishlist_item.indexOf(details.id),1)
      wishlist_item.splice(wishlist_item.indexOf(details.id),1)
    }else{
      wishlist.push(details);
      wishlist_item.push(details.id);
    }
    localStorage.setItem('user_wishlist', JSON.stringify(wishlist));
    localStorage.setItem("wishlist_mapping",JSON.stringify(wishlist_item));
   
    var movies = this.compareValues(this.state.movies);
    var toprated = this.compareValues(this.state.topRated);
    this.setState({
      movies:movies,
      topRated: toprated
    })
  }

  render() {
    const type = this.state.searchValue ? 'search-results' : 'most-popular'
    return (
      <div>
      {
        this.state.loading === true ? 
        <div className="loader">
          <img src="https://d1m54pdnjzjnhe.cloudfront.net/pngineer/640edca0-616b-11e7-86a2-695af5a15c90.gif" alt="spinner" width="200px" />
        </div>:
      <div className="main">
        <div className="header">
          <div onClick={() => this.refreshPage()} className="logo imdb-link">
            <img src="https://d1m54pdnjzjnhe.cloudfront.net/pngineer/220cc7d0-79f9-11e7-a34a-4964468dc4d5.png" alt="imdb logo" />
           </div>
          <div className="header-right">
            <a className="active" onClick={() => this.goToMovie()} >Watch List</a>
          </div>
        </div>
        <Search
          getInputValue={this.getInputValue}
          getSearchResult={this.getSearchResult}
        />
        {
          this.state.searchValue === ''
            ? <MovieList data={this.state} type={type} handler={this.handler}/>
            : <MovieList data={this.state.searchResult} type={type} />
        }
        {
          (this.state.limit == '10' && this.state.searchValue == '') && this.state.noContent == false?
            <div className="btn-nav">
              <div className="load-more-button" onClick={() => this.loadMore()}>Load More Movies</div>
            </div>  :''
        }
      </div>
      
      }
      </div>
    )
  }
}

export default App
