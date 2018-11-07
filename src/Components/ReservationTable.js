import React from 'react';
import { Table,Button } from 'reactstrap';

export default class Example extends React.Component {
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
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td><Button color="primary" block>ดูรายละเอียด</Button></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td><Button color="primary" block>ดูรายละเอียด</Button></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
            <td><Button color="primary" block>ดูรายละเอียด</Button></td>
          </tr>
        </tbody>
      </Table>
    );
  }
}