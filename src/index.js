import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App from './components/App/App'
import WatchList from './components/WatchList/WatchList'
import MovieListItemDetails from './components/MovieListItemDetails/MovieListItemDetails'
import NotFound from './components/NotFound/NotFound'

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/movie/:movieId' component={MovieListItemDetails} />
        <Route exact path='/watchlist' component={WatchList} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

render(<Root />, document.getElementById('main'))
