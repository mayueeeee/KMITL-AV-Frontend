import React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Navbar, Sidebar } from '../Components/Containers'
import { Container, Row, Col } from 'reactstrap'
import { Switch, Route } from 'react-router-dom'
import AdminDashboard from './Admin/dashboard'
import StudentDashboard from './Student/dashboard'
@inject('routing')
// @withRouter
@observer
class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { location, push, goBack } = this.props.routing
    console.log(location.pathname)
  }
  render() {
    const user = JSON.parse(window.localStorage.getItem('lavs-user-data'))
    console.log(user)
    return (
      <div>
        <Navbar />
        <Container fluid className="dashboard-container">
          <Row>
            <Col md={2}>
              <Sidebar />
            </Col>
            <Col md={10}>
              <Switch>
                <div className="view-container">
                <Route component={user.role == 'admin' ? AdminDashboard : StudentDashboard} />
                </div>
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Dashboard
