import React from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import { format } from 'date-fns';
import swal from 'sweetalert2'

export default class Example extends React.Component {
  state = {
    list_data: []
  }
  async componentDidMount() {
    const res = await axios.get('/v1/reservation/list')
    this.setState({ list_data: res.data.reserve_list })
    // console.log(reserveList)
  }
  handleViewInfo = (id) => {
    const data = this.state.list_data.find(ele => ele._id === id)
    console.log(data)
    this.props.history.push({
      pathname: `/booking/${id}`,
      state: { detail: data }
    })

    // swal({
    //   title: 'รายละเอียดการจอง',      
    //   html:
    //     'You can use <b>bold text</b>, ' +
    //     '<a href="//github.com">links</a> ' +
    //     'and other HTML tags',
    //   showCloseButton: true,
    //   showCancelButton: true,
    //   focusConfirm: false,

    // })



  }

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>ประเภทห้อง</th>
            <th>วันที่</th>
            <th>ช่วงเวลาที่จอง</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.list_data.map((ele, i) => {
              return (<tr>
                <th scope="row">{i + 1}</th>
                <td>{ele.type}</td>
                <td>{format(ele.startTime, "DD/MM/YYYY")}</td>
                <td>{`${format(ele.startTime, "HH:mm")} - ${format(ele.endTime, "HH:mm")}`}</td>
                <td><Button color="primary" block onClick={(e) => this.handleViewInfo(ele._id)}>ดูรายละเอียด</Button></td>
              </tr>)
            })
          }
        </tbody>
      </Table>
    );
  }
}