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
  handleCancel = () => {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-primary btn-lg btn-swalert',
      cancelButtonClass: 'btn btn-secondary btn-lg btn-swalert',
      buttonsStyling: false
    })

    const diffHour = differenceInHours(this.props.location.state.detail.startTime, new Date())
    // console.log(diffHour)
    if (diffHour < 24) {
      swalWithBootstrapButtons({
        title: 'เกิดข้อผิดพลาด',
        text: 'คุณไม่สามารถยกเลิกการจองน้อยกว่า1วันได้',
        type: 'error'
        // showCancelButton: true,
        // confirmButtonText: 'Yes, delete it!',
        // cancelButtonText: 'No, cancel!',
        // reverseButtons: true
      })
    } else {
      swalWithBootstrapButtons({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          swalWithBootstrapButtons('Deleted!', 'Your file has been deleted.', 'success')
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons('Cancelled', 'Your imaginary file is safe :)', 'error')
        }
      })
    }
  }

  renderCancelButton = status => {
    console.log(`sss:${status}`)
    if (status === 'active') {
      return (
        <Row>
          <Col>
            <div className="cancel-btn">
              <Button color="danger" onClick={this.handleCancel}>
                ยกเลิกการจอง
              </Button>
            </div>
          </Col>
        </Row>
      )
    }
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
            {this.renderCancelButton(this.props.location.state.detail.status)}
          </Col>
          <Col>
            <Row>
              <Col>
                <h3>QR Code</h3>
              </Col>
            </Row>
            <Row>
              <Col>กรุณาแสดงQR Codeแก่เจ้าหน้าที่เพื่อเข้าใช้งาน</Col>
            </Row>
            <Row>
              <Col>
                <QRCode value={this.props.location.state.detail._id} size={256} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default BookingInfo
