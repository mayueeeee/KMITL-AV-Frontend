import React from 'react'
import { Button, Row, Col, FormGroup, Label, Input } from 'reactstrap'
import flatpickr from 'flatpickr'
import swal from 'sweetalert2'
import { addDays, differenceInDays, getDayOfYear, getHours, getMinutes, addHours, addMinutes, parse, getTime } from 'date-fns'
import { Thai } from 'flatpickr/dist/l10n/th'
import 'flatpickr/dist/themes/material_orange.css'
import 'sweetalert2/src/sweetalert2.scss'
class BookingForm extends React.Component {
  constructor(props) {
    super(props)
    let default_time = new Date()
    default_time.setHours(8)
    default_time.setMinutes(30)
    default_time.setSeconds(0)
    this.state = {
      avaliable_room: [],
      reserve_date: new Date(),
      reserve_data: {
        room_type: '',
        start_time: default_time,
        end_time: default_time
      }
    }
  }

  isReserveDateExceed = reserve_date => {}

  componentDidMount() {
    const max_date = addDays(new Date(), 30)
    flatpickr(`#reserve_date`, {
      locale: Thai,
      defaultDate: this.state.reserve_date,
      dateFormat: 'j F Y',
      maxDate: max_date,
      minDate: new Date(),
      onChange: date => {
        console.log(date)
        this.setState({ reserve_date: date[0] })        
      }      
    })

    flatpickr(`#start_time`, {
      locale: Thai,
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      time_24hr: true,      
      defaultHour: 8,
      defaultMinute: 30,
      minuteIncrement: 30,
      minTime: '08:30',
      maxTime: '16:30',
      onChange: date => {
        const start_hour = getHours(date)
        const start_minute = getMinutes(date)
        let time = addHours(this.state.reserve_date, start_hour)
        time = addMinutes(time, start_minute)
        let tmp = this.state.reserve_data
        tmp['start_time'] = time
        this.setState({ reserve_data: tmp })        
      }
    })

    flatpickr(`#end_time`, {
      locale: Thai,
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      time_24hr: true,      
      defaultHour: 8,
      defaultMinute: 30,
      minuteIncrement: 30,
      minTime: '08:30',
      maxTime: '16:30',
      onChange: date => {
        const end_hour = getHours(date)
        const end_minute = getMinutes(date)
        let time = addHours(this.state.reserve_date, end_hour)
        time = addMinutes(time, end_minute)
        let tmp = this.state.reserve_data
        tmp['end_time'] = time
        this.setState({ reserve_data: tmp })
      }
    })
  }

  validateReservation = e => {
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h2>ทำรายการจอง</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="exampleEmail">ประเภทห้อง</Label>
              <Input type="select" name="select" id="exampleSelect">
                <option value={undefined}>กรุณาเลือก</option>
                <option value="single">ห้องเดี่ยว</option>
                <option value="couple">ห้องคู่</option>
                <option value="theater">โรงภาพยนต์</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>ห้องที่ต้องการ</Label>
              <Input type="select">
                <option value={undefined}>กรุณาเลือก</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormGroup>
              <Label for="exampleEmail">วันที่ทำการจอง</Label>
              <Input type="text" id="reserve_date" className="date-input-field" />
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
            <Button color="primary" onClick={this.validateReservation}>
              จอง >
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default BookingForm
