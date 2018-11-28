import { addDays, addHours, addMinutes, getHours, getMinutes, isBefore, isAfter, format, differenceInHours, differenceInMinutes, parse } from 'date-fns'
import flatpickr from 'flatpickr'
import { Thai } from 'flatpickr/dist/l10n/th'
import 'flatpickr/dist/themes/material_orange.css'
import React from 'react'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import axios from 'axios'
const flatpickr_setting = {
  locale: Thai,
  enableTime: true,
  noCalendar: true,
  dateFormat: 'H:i',
  time_24hr: true,
  minuteIncrement: 30
}
class BookingForm extends React.Component {
  constructor(props) {
    super(props)
    let last_date = new Date()
    last_date.setHours(15)
    last_date.setMinutes(55)
    last_date.setSeconds(0)
    last_date.setMilliseconds(0)

    console.log(differenceInMinutes(last_date, new Date()))

    let default_date = new Date()
    if (differenceInMinutes(last_date, new Date()) < 30) {
      default_date = addDays(default_date, 1)
      console.log(default_date)
    }
    default_date.setHours(0)
    default_date.setMinutes(0)
    default_date.setSeconds(0)
    default_date.setMilliseconds(0)
    console.log(default_date)

    let default_start_time = parse(default_date)
    default_start_time.setHours(8)
    default_start_time.setMinutes(30)
    default_start_time.setSeconds(0)

    let default_end_time = parse(default_date)
    default_end_time.setHours(9)
    default_end_time.setMinutes(0)
    default_end_time.setSeconds(0)

    this.state = {
      avaliable_room: [],
      select_date: default_date,
      reserve_data: {
        room_id: '',
        start_time: default_start_time,
        end_time: default_end_time
      }
    }
  }
  handleChange = (id, e) => {
    let tmp = this.state.reserve_data
    tmp[id] = e.target.value
    this.setState({ reserve_data: tmp })
  }
  handleReserveDataChange = (id, time) => {
    let tmp = this.state.reserve_data
    tmp[id] = time
    this.setState({ reserve_data: tmp })
  }

  showAlert = async (text, title = 'เกิดข้อผิดพลาด', type = 'error', config = {}) => {
    const swalWithBootstrapButtons = swal.mixin({
      ...config,
      confirmButtonClass: 'btn btn-primary btn-lg btn-swalert',
      cancelButtonClass: 'btn btn-secondary btn-lg btn-swalert',
      buttonsStyling: false
    })

    return swalWithBootstrapButtons({
      type: type,
      title: title,
      text: text
    })
  }

  componentDidMount() {
    // Calendar picker
    flatpickr(`#reserve_date`, {
      locale: Thai,
      defaultDate: this.state.select_date,
      dateFormat: 'j F Y',
      maxDate: addDays(this.state.select_date, 30),
      minDate: this.state.select_date,

      onChange: date => {
        console.log(date)
        this.setState({ select_date: date[0] })
      }
    })

    //StartTime picker
    flatpickr(`#start_time`, {
      ...flatpickr_setting,
      defaultHour: 8,
      defaultMinute: 30,
      minTime: '08:30',
      maxTime: '16:00',
      onChange: date => {
        let time = this.getReservationTime(date)
        this.handleReserveDataChange('start_time', time)
      }
    })
    //EndTime picker
    flatpickr(`#end_time`, {
      ...flatpickr_setting,
      defaultHour: 9,
      defaultMinute: 0,
      minTime: '09:00',
      maxTime: '16:30',
      onChange: date => {
        let time = this.getReservationTime(date)
        this.handleReserveDataChange('end_time', time)
      }
    })
  }

  validateReservation = async e => {
    // Fetch new date
    let start_time = this.getReservationTime(this.state.reserve_data.start_time)
    this.handleReserveDataChange('start_time', start_time)
    let end_time = this.getReservationTime(this.state.reserve_data.end_time)
    this.handleReserveDataChange('end_time', end_time)

    // Validate
    const validTime = isAfter(this.state.reserve_data.end_time, this.state.reserve_data.start_time)
    const hourDiff = differenceInHours(this.state.reserve_data.start_time, new Date())
    const reserveHour = differenceInMinutes(end_time, start_time) / 60
    console.log(reserveHour)
    if (!validTime) {
      this.showAlert('คุณเลือกช่วงเวลาไม่ถูกต้อง กรุณาตรวจสอบ')
    } else if (this.state.reserve_data.room_id === '') {
      this.showAlert('คุณยังไม่ได้ทำการเลือกห้องที่ต้องการ กรุณาตรวจสอบ')
    } else if (hourDiff < 3) {
      this.showAlert('เวลาที่จองล่วงหน้าน้อยกว่า3ชั่วโมง กรุณาตรวจสอบ')
    } else if (reserveHour > 3) {
      this.showAlert('คุณสามารถจองได้ไม่เกิน3ชั่วโมงต่อการจอง1ครั้ง')
    } else {
      try {
        const res = await axios.post(`/v1/reservation/validate`, this.state.reserve_data)
        if (res.data.success && !res.data.canReserve) {
          this.showAlert(`ไม่สามารถทำรายการจองในช่วงเวลาที่เลือกได้`)
        } else if (res.data.success && res.data.canReserve) {
          const confirm_config = {
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            reverseButtons: true
          }
          const modal_res = await this.showAlert('หากคุณไม่มาใช้บริการตามที่จองระบบจะระงับการใช้งานของท่านตามเวลาที่กำหนด', 'คุณแน่ใจหรือไม่ว่าจะทำการจอง?', 'warning', confirm_config)
          if (modal_res.value) {
            this.showAlert('คุณสามารถตรวจสอบการจองได้ที่หน้าแรก','จองสำเร็จ',  'success')          
            this.props.history.push('/')
          }
        }
      } catch (e) {
        console.log(e)
      }
      // console.log(res)
    }

    console.log(this.state)
  }
  handleSelectType = async e => {
    if (e.target.value === 'กรุณาเลือก') {
      this.handleReserveDataChange('room_id', '')
      this.setState({ avaliable_room: [] })
    } else {
      const res = await axios.get(`/v1/room?type=${e.target.value}`)
      this.setState({ avaliable_room: res.data.rooms })
    }
  }

  getReservationTime = date => {
    const hour = getHours(date)
    const minute = getMinutes(date)
    let time = addHours(this.state.select_date, hour)
    time = addMinutes(time, minute)
    return time
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
              <Input type="select" onChange={this.handleSelectType}>
                <option value={null}>กรุณาเลือก</option>
                <option value="single">ห้องเดี่ยว</option>
                <option value="couple">ห้องคู่</option>
                <option value="theater">โรงภาพยนต์</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>ห้องที่ต้องการ</Label>
              <Input type="select" onChange={e => this.handleChange('room_id', e)}>
                <option value={null}>กรุณาเลือก</option>
                {this.state.avaliable_room.map(ele => {
                  return (
                    <option key={ele._id} value={ele._id}>
                      {ele.name}
                    </option>
                  )
                })}
              </Input>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormGroup>
              <Label>วันที่ทำการจอง</Label>
              <Input type="text" id="reserve_date" className="date-input-field" />
            </FormGroup>
            <Row>
              <Col>
                <FormGroup>
                  <Label>กรุณาเลือกเวลาเริ่ม</Label>
                  <Input type="text" id="start_time" value={format(this.state.reserve_data.start_time, 'HH:mm')} className="date-input-field" />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>กรุณาเลือกเวลาสิ้นสุด</Label>
                  <Input type="text" value={format(this.state.reserve_data.end_time, 'HH:mm')} id="end_time" className="date-input-field" />
                </FormGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button color="primary" onClick={this.validateReservation}>
              ตรวจสอบ >
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default BookingForm
