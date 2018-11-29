import React from 'react'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import axios from 'axios'
import { format } from 'date-fns'
import QRCode from 'qrcode.react'
import { differenceInHours } from 'date-fns'

class BookingInfo extends React.Component {
  componentDidMount() {
    console.log(this.props.location.state.detail)
  }
  
  render() {
    return (
      <div>
        <Row>
          <Col>
            {' '}
            <h2>ข้อมูลการจอง</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={9}>
            {' '}
            <Row>
              <Col>
                <h5 className="info-label">ห้องที่จอง: </h5>
                {this.props.location.state.detail.name}
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 className="info-label">ประเภทห้อง: </h5>
                {this.props.location.state.detail.type}
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 className="info-label">วันที่เข้าใช้บริการ: </h5>
                {format(this.props.location.state.detail.startTime, 'DD/MM/YYYY')}
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 className="info-label">เวลา: </h5>
                {`${format(this.props.location.state.detail.startTime, 'HH:mm')} - ${format(this.props.location.state.detail.endTime, 'HH:mm')}`}
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 className="info-label">วันที่ทำรายการ: </h5>
                {format(this.props.location.state.detail.createAt, 'DD/MM/YYYY HH:mm')}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default BookingInfo
