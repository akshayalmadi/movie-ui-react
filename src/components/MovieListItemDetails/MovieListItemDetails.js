import React from 'react'
import PropTypes from 'prop-types'
import './MovieListItemDetails.css'
import { fetchMovieDetails } from '../../services/api'
import keys from '../../config/keys'

import {
  formatTitle,
  formatAvarageVote,
  formatVoteCount,
  formatImage,
  formatImdbLink,
  formatReleaseYear
} from '../../helpers'

class MovieListItemDetails extends React.Component {
  constructor() {
    super()

    this.state = {
      loading: true,
      movie: {}
    }
  }

  componentDidMount() {
    const movieId = this.props.location.pathname.split('/')[2]
    fetchMovieDetails(movieId).then(data => {
      this.setState({
        loading: false,
        movie: data,
      })
    })
  }

  goBack() {
    this.props.history.push('/')
  }

  renderContent() {
    var nocontent = keys.noContent;
    if (this.state.loading) {
      return (
        <div className="loader">
          <img src="https://d1m54pdnjzjnhe.cloudfront.net/pngineer/640edca0-616b-11e7-86a2-695af5a15c90.gif" alt="spinner" width="200px" />
        </div>
      )
    } else {
      const { title, poster_path, overview, vote_average, vote_count, imdb_id, release_date } = this.state.movie
      return (
        <div className="movie-list-item-details-container">
          <h1>{formatTitle(title,nocontent)}</h1>
          <div className="movie-list-item-bio">
            <img src={formatImage(poster_path,nocontent)} alt="" width="200px" />
            <div className="details">
              <div className="details-top">
                <div className="release-year">{formatReleaseYear(release_date,nocontent)}</div>
                <div className="rating">
                  <span>{formatAvarageVote(vote_average,nocontent)} /</span>
                  <span>{formatVoteCount(vote_count,nocontent)}</span>
                </div>
              </div>
              <p>{overview}</p>
            </div>
          </div>
          <div className="navigation">
            <div className="go-back-button" onClick={() => this.goBack()}>Go back</div>
            <a href={formatImdbLink(imdb_id)} target="_blank" className="imdb-link">
              <img src="https://d1m54pdnjzjnhe.cloudfront.net/pngineer/220cc7d0-79f9-11e7-a34a-4964468dc4d5.png" alt="imdb logo" />
            </a>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="movie-list-item-details">
        { this.renderContent() }
      </div>
    )
  }
}

MovieListItemDetails.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default MovieListItemDetails
