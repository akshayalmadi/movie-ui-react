import React from 'react'
import PropTypes from 'prop-types'
import MovieListItem from '../MovieListItem/MovieListItem'
import './WatchList.css'
import keys from '../../config/keys'



class WatchList extends React.Component {
  goBack() {
    this.props.history.push('/')
  }
  renderContent() {
      var wishlist = JSON.parse(localStorage.getItem('user_wishlist'));
      return (
        <div>
          <div className="main">
                <div className="header">
                  <div onClick={() => this.goBack()} className="logo imdb-link">
                    <img src="https://d1m54pdnjzjnhe.cloudfront.net/pngineer/220cc7d0-79f9-11e7-a34a-4964468dc4d5.png" alt="imdb logo" />
                  </div>
                  <div className="header-right">
                    <a className="active" href="#home">Watch List</a>
                  </div>
                </div>
                <div>
                  <div >
                      <ul>
                        {
                          wishlist.map(movie => <MovieListItem key={movie.id} index={movie.id} details={movie} type="watchlist" content={keys.noContent}  change={this.props.handler}/>)
                        }
                      </ul>
                  </div>
                </div>
            </div>
        </div>
      )
   
  }

  render() {
    return (
      <div >
        { this.renderContent() }
      </div>
    )
  }
}


WatchList.contextTypes = {
  router: PropTypes.object
}


export default WatchList
