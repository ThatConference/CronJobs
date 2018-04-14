
module.exports = () => {
  return [
    { method: 'GET', path: '/tito/daily', handler: require('./tito').dailyUpdate() }
  ]
}
