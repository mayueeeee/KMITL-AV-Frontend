import React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'


@inject('routing')
// @withRouter
@observer
class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div>
       <h1>Admin</h1>
      </div>
    )
  }
}

export default Dashboard