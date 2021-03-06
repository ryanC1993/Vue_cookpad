
const API_URL = 'http://localhost:3001'

export default {
  user: {
    authenticated: false
  },
  login (context, creds, redirect) {
    let url = API_URL + '/sessions/create'
    context.$http.post(url, creds)
      .then((res) => {
        localStorage.setItem('id_token', res.data.id_token)
        this.user.authenticated = true
        console.log('Login successfully', res.data.id_token)
        console.log(localStorage);
        if (redirect) {
          context.$router.push({name: 'user'})
          console.log(creds.username)
        }
      })
      .catch((err) => {
        console.log(err)
        context.error = err.data
      })
  },
  signup (context, creds, redirect) {
    let url = API_URL + '/users'

    context.$http.post(url, creds)
      .then((res) => {
        localStorage.setItem('id_token', res.data.id_token)
        this.user.authenticated = true
        console.log('Signup successfully', res.data.id_token);
        if (redirect) {
          context.$router.push({name: 'user'})
        }
      })
      .catch((err) => {
        console.log(err)
        context.error = err.data
      })
  },
  logout () {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },
  checkAuth () {
    var jwt = localStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  }
}
