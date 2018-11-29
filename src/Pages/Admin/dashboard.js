import React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import ReasrvationTableAdmin from '../../Components/ReservationTableAdmin'
import { Button, Row, Col } from 'reactstrap'


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
        <Row >
          <Col xs={11}>
            <h2>รายการที่กำลังใช้งาน</h2>
          </Col>
        </Row>

        <ReasrvationTableAdmin history={this.props.history}/>
      </div>
    )
  }
}

export default Dashboard