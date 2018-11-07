import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Switch, Route, BrowserRouter, withRouter,LazyRoute } from 'react-router-dom'
// import './App.css';
import Login from './Pages/login'
import Container from './Pages/container'

@inject('routing')
@withRouter
@observer 
class App extends Component {
  componentWillMount(){
    const { location, push, goBack } = this.props.routing
    const token = window.localStorage.getItem('lavs-access-token')
    if(token){
      push('/dashboard')

    }
    else{
      // push('/login')
      // console.log(this.props)
    }
  }
  render() {
    const { location, push, goBack } = this.props.routing
    return (
      <BrowserRouter>
        {/* <Switch> */}
          <div>
          <Route path="/dashboard" name="Dashboard" component={Container} />
          <Route path="/login" name="Login" component={Login} />

          </div>
        {/* </Switch> */}
      </BrowserRouter>
    )
  }
}

export default App
