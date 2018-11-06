import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// import './App.css';
import Login from './Pages/login'


@inject('routing')
@observer
class App extends Component {
  render() {
    const { location, push, goBack } = this.props.routing;
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <Login/>



      </div>
    );
  }
}

export default App;
