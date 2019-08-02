export function formatOverview (overview) {
  return !overview
    ? 'N/A'
    : `${overview.substring(0, 100).trim()}...`
}

export function formatImage (imagePath , nocontent) {
  return !imagePath || nocontent
    ? 'https://dd6zx4ibq538k.cloudfront.net/static/images/2395/b455a76cdf770ca4eff883dbd23cbb79_440_656.jpeg'
    : `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${imagePath}`
}

export function formatTitle (title, nocontent) {
  return !title || nocontent
    ? 'No title yet'
    : title.substring(0, 100).trim()
}

export function formatReleaseYear (releaseYear, nocontent) {
  return !releaseYear || nocontent
    ? 'N/A'
    : releaseYear.split('-')[0]
}

export function formatAvarageVote (avarageVote, nocontent) {
  return !avarageVote || nocontent
    ? 'N/A'
    : Number((avarageVote).toFixed(2))
}

export function formatVoteCount (voteCount, nocontent) {
  return !voteCount || nocontent
  ? 'N/A'
  : voteCount
}

export function formatImdbLink (imdbId) {
  return !imdbId
    ? ''
    : `http://www.imdb.com/title/${imdbId}/`
}
