import React from 'react'
// import PropTypes from 'prop-types'
import MovieListItem from '../MovieListItem/MovieListItem'
import './MovieList.css'

class MovieList extends React.Component {
  constructor() {
    super()

    
  }
renderMovie() {
  const title = this.props.type === 'most-popular' ? 'Most Popular' : 'Your search result'
  var limit = this.props.data.noContent == true? 2:this.props.data.limit;
  return (
      <div>
        {
          this.props.type === 'most-popular'?
          (
            <div>
                <div className="details-top">
                    <div className="title recently-released">{title}</div>
                    <div className="title top-rated">Top Rated</div>
                </div>
                <div className="movie-list">
                    <ul>
                      {
                        this.props.data.movies.slice(0,limit).map(movie => <MovieListItem key={movie.id} index={movie.id} details={movie} content={this.props.data.noContent} type="movielist" change={this.props.handler}/>)
                      }
                    </ul>
                </div>
                <div className="movie-list">
                    <ul>
                      {
                        this.props.data.topRated.slice(0,limit).map(ratedmovie => <MovieListItem key={ratedmovie.id} index={ratedmovie.id} details={ratedmovie} content={this.props.data.noContent} type="movielist" change={this.props.handler}/>)
                      }
                    </ul>
                </div>
              </div>
          ):(
            <div> 
              <div className="search-list">
                <ul>
                  {
                    this.props.data.map(movie => <MovieListItem key={movie.id} index={movie.id} details={movie} content={this.props.data.noContent} type="searchList"/>)
                  }
                </ul>
              </div>
            </div>
            )
        }
    </div>
  )
}
render() {
  return (
   <div>
    {this.renderMovie()}
    </div>
  )
}
}

// MovieList.propTypes = {
//   props: PropTypes.array.isRequired
// }

export default MovieList
