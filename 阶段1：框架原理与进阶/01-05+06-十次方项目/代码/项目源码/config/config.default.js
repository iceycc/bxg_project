module.exports = {
  baseURL: 'http://localhost:8000/api/v1/',
  // baseURL: 'http://192.168.10.217:8000/api/v1/',
  apiHost: 'http://localhost:8000',
  // apiHost: 'http://192.168.10.217:8000',
  rememberMeExpires: 1000 * 60 * 60 * 24,
  crypto: {
    alg: 'aes-256-cfb',
    secret: 'itcast'
  }
}
