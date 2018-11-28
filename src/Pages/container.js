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
import BookingInfo from './Student/Booking/bookingInfo';
import AdminSidebar from '../Components/Containers/adminSidebar'
import CodeReader from './Admin/scanQR';


@inject('routing')
// @withRouter
@observer
class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      role:""
    }
  }
  componentDidMount() {
    const { location, push, goBack } = this.props.routing
    const user = JSON.parse(window.localStorage.getItem('lavs-user-data'))
    console.log(location.pathname)
    if(user===null){
      this.props.history.push('/login')
    }
    else{
      console.log(user)
      this.setState({role:user.role})

    }
  }
  clearRole = ()=>{
    console.log('clr')    
    this.setState({role:""})
  }
  renderSidebar = ()=>{
    if(this.state.role==='admin'){
      return(<AdminSidebar history={this.props.history} clearRole={this.clearRole}/>)
    }else{
      return(<Sidebar history={this.props.history} clearRole={this.clearRole}/>)
    }
  }
  render() {    
    // console.log(user)
    return (
      <div>
        <Navbar />
        <Container fluid className="dashboard-container">
          <Row>
            <Col md={2}>
              {this.renderSidebar()}
              {/* <Sidebar history={this.props.history} clearRole={this.clearRole}/> */}
            </Col>
            <Col md={10}>
              <Switch>
                <div className="view-container">
                <Route exact path="/booking" component={BookingForm} />
                {/* <Route exact path="/booking/select" component={SelectRoomForm} /> */}
                <Route path="/booking/:id" component={BookingInfo} />
                <Route exact path="/" component={this.state.role === 'admin' ? AdminDashboard : StudentDashboard} />

                <Route exact path="/admin/enter" component={CodeReader} />
                
                {/* <Route exact path="/" component={StudentDashboard} /> */}
                {/* {this.renderDashboard} */}
                
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
