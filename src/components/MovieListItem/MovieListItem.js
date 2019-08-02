import React from 'react'
import PropTypes from 'prop-types'
import './MovieListItem.css'
import {
  formatTitle,
  formatAvarageVote,
  formatReleaseYear,
  formatImage
} from '../../helpers'

class MovieListItem extends React.Component {
  constructor() {
    super()

    this.goToMovie = this.goToMovie.bind(this)

    this.state = {
      modalClicked: false
    }
    
  }

  goToMovie() {
    this.context.router.history.push(`/movie/${this.props.index}`)
  }

  render() {
    const { details } = this.props;
    var nocontent = this.props.content;
    var change = this.props.change
    if(this.props.type == 'movielist')
      var watchlistClass = details.isfav == '1' ? 'wl-ribbon poster inWL' : 'wl-ribbon poster not-inWL'
    else
      var watchlistClass = 'wl-ribbon poster inWL'
    return (
      <li className="movie-list-item" onClick={() => this.goToMovie()} >
        <img src={formatImage(details.poster_path, nocontent)} alt="" width="200px" />
        <div className="ratings">{formatAvarageVote(details.vote_average, nocontent)}</div>
        {
          this.props.type == 'watchlist'  || this.props.type == 'searchList'  || nocontent == true ? '':
          <div className={watchlistClass} title="Click to add to watchlist" onClick={(e) => change(e,details)}></div>
        }  
        <span className="movie-list-item-title">{formatTitle(details.title, nocontent)}</span>
       
        <span className="movie-list-item-release-year">{formatReleaseYear(details.release_date, nocontent)}</span>
      </li> 
    )
  }
}

MovieListItem.contextTypes = {
  router: PropTypes.object
}

MovieListItem.propTypes = {
  index: PropTypes.number.isRequired,
  details: PropTypes.object.isRequired
}

export default MovieListItem
