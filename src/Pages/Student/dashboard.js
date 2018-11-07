import React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Button, Row, Col } from 'reactstrap'
import ReasrvationTable from '../../Components/ReservationTable'
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
            <h2>รายการการจองทั้งหมด</h2>
          </Col>
          <Col>
            <Button color="primary" block onClick={()=>this.props.history.push('/booking')}>จอง</Button>
          </Col>
        </Row>

        <ReasrvationTable />
      </div>
    )
  }
}

export default Dashboard
