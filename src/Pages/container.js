import React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Navbar, Sidebar } from '../Components/Containers'
import { Container, Row, Col } from 'reactstrap'
import { Switch, Route } from 'react-router-dom'
import AdminDashboard from './Admin/dashboard'
import StudentDashboard from './Student/dashboard'
import BookingForm from '../Pages/Student/Booking/bookingForm'
import SelectRoomForm from '../Pages/Student/Booking/selectRoomForm'
import axios from 'axios'


@inject('routing')
// @withRouter
@observer
class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { location, push, goBack } = this.props.routing
    const user = JSON.parse(window.localStorage.getItem('lavs-user-data'))
    console.log(location.pathname)
    if(user==null){
      this.props.history.push('/login')
      
      console.log('fuck')
    }
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
                <Route exact path="/booking" component={BookingForm} />
                <Route exact path="/booking/select" component={SelectRoomForm} />
                {/* <Route exact path="/" component={user.role == 'admin' ? AdminDashboard : StudentDashboard} /> */}
                <Route exact path="/" component={StudentDashboard} />
                
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
