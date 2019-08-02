import axios from 'axios'
import keys from '../config/keys'

const base = keys.base
const token = keys.token

function makeRequest (url, params) {
  return axios.get(url, { params: params })
  .then(response => response.data)
  .catch(error => console.log(error))
}
function fetchPopularMovies () {
  const url = `${base}/discover/movie`
  const params = {api_key: token, language: 'en-US', sort_by: 'popularity.desc'}
  return makeRequest(url, params)
}

function fetchTopRatedMovies () {
  const url = `${base}/discover/movie`
  const params = {api_key: token, language: 'en-US',certification_country:'US', certification: 'R',sort_by:'vote_average.desc'}
  return makeRequest(url, params)
}

function fetchMovieDetails (movieId) {
  const url = `${base}/movie/${movieId}`
  const params = {api_key: token}
  return makeRequest(url, params)
}

function fetchSearchedMovies (query) {
  const url = `${base}/search/movie`
  const params = {api_key: token, query: query, page: 1}
  return makeRequest(url, params)
}

export { fetchPopularMovies, fetchMovieDetails, fetchSearchedMovies, fetchTopRatedMovies }
