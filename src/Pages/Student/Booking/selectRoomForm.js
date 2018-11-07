import React from 'react'
import { Button, Row, Col, FormGroup, Label, Input } from 'reactstrap'
import flatpickr from 'flatpickr'
import swal from 'sweetalert2'
import { addDays, differenceInDays, getDayOfYear } from 'date-fns'
import { Thai } from 'flatpickr/dist/l10n/th'
import 'flatpickr/dist/themes/material_orange.css'
import 'sweetalert2/src/sweetalert2.scss'

class BookingForm extends React.Component {
  state = {
    avaliable_room: [],
    form_data: {
      room_name: '',
      start_time: new Date(),
      end_time: new Date()
    }
  }

  isReserveDateExceed = reserve_date => {}

  componentDidMount() {
    const max_date = addDays(new Date(), 30)

    flatpickr(`#start_time`, {
      locale: Thai,
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      time_24hr: true,
      minuteIncrement: 30,
      minTime: '08:30',
      maxTime: '16:30',
      onChange: date => {
        console.log(date)
        // const dateStr = moment(date[0]).format('YYYY-MM-DD')
        // if (differenceInDays(date, max_date) > -1) {
        //   swal({
        //     title: 'เกิดข้อผิดพลาด',
        //     text: 'วันที่ที่เลือกเกิน30วัน',
        //     type: 'error',
        //     confirmButtonText: 'เครจ้า'
        //   })
        // } else {
        //   var tmp = this.state.form_data
        //   tmp['reserve_date'] = date[0]
        //   // console.log(tmp)
        //   this.setState({ form_data: tmp })
        //   // console.log(differenceInDays(date, max_date))
        // }
      }
    })

    flatpickr(`#end_time`, {
        locale: Thai,
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        time_24hr: true,
        minuteIncrement: 30,
        minTime: '08:30',
        maxTime: '16:30',
        onChange: date => {
          console.log(date)
          // const dateStr = moment(date[0]).format('YYYY-MM-DD')
          // if (differenceInDays(date, max_date) > -1) {
          //   swal({
          //     title: 'เกิดข้อผิดพลาด',
          //     text: 'วันที่ที่เลือกเกิน30วัน',
          //     type: 'error',
          //     confirmButtonText: 'เครจ้า'
          //   })
          // } else {
          //   var tmp = this.state.form_data
          //   tmp['reserve_date'] = date[0]
          //   // console.log(tmp)
          //   this.setState({ form_data: tmp })
          //   // console.log(differenceInDays(date, max_date))
          // }
        }
      })
  }

  getAvaliableSeat = room_type => {
    // TODO
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h2>เลือกห้อง</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>กรุณาเลือกห้องที่ต้องการ</Label>
              <Input type="select">
                <option value={undefined}>กรุณาเลือก</option>
                <option value="single">ห้องเดี่ยว</option>
                <option value="couple">ห้องคู่</option>
                <option value="theater">โรงภาพยนต์</option>
              </Input>
            </FormGroup>
            <Row>
              <Col>
                <FormGroup>
                  <Label>กรุณาเลือกเวลาเริ่ม</Label>
                  <Input type="text" id="start_time" />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>กรุณาเลือกเวลาสิ้นสุด</Label>
                  <Input type="text" id="end_time" />
                </FormGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button color="primary" id="select_end_time">
              กรุณาเลือกเวลาสิ้นสุด>
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default BookingForm
