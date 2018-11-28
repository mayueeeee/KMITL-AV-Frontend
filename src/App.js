import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Switch, Route, BrowserRouter, withRouter, LazyRoute } from 'react-router-dom'
import axios from 'axios'
// import './App.css';
import Login from './Pages/login'
import Container from './Pages/container'

axios.defaults.baseURL = 'http://localhost:3000';

@inject('routing')
@withRouter
@observer
class App extends Component {
  componentDidMount() {
    const { location, push, goBack } = this.props.routing
    const token = window.localStorage.getItem('lavs-access-token')
    const user = JSON.parse(window.localStorage.getItem('lavs-user-data'))
    // if (token) {
    //   push('/dashboard')
    // } else {
    //   // push('/login')
    //   // console.log(this.props)
    // }
    console.log(token)
    console.log(user)
    if (token === undefined||user==null) {
      push('/login')
      // console.log(this.props)
    }
  }
  render() {
    const { location, push, goBack } = this.props.routing
    return (
      <BrowserRouter>
        {/* <Switch> */}
        <div>
          <Route exact path="/login" name="Login" component={Login} />
          <Route path="/" name="Home" component={Container} />
        </div>
        {/* </Switch> */}
      </BrowserRouter>
    )
  }
}

export default App
