export function compareByScore(a, b) {
  return b.voteScore - a.voteScore;
}

export function compareByNewest(a, b) {
  return b.timestamp - a.timestamp;
}

export function compareByOldest(a, b) {
  return a.timestamp - b.timestamp;
}
