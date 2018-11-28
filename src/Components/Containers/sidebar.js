import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import ProfileImage from '../../Components/ProfileImage'
import avatar from '../../assets/avatar.jpg'

export default class Sidebar extends React.Component {
  doLogout = ()=>{
    localStorage.clear()
    this.props.clearRole()
    this.props.history.push('/login')
  }
  render() {
    const user = JSON.parse(window.localStorage.getItem('lavs-user-data'))
    return (
      <div className="sidebar-container">
        <div className="sidebar-user-info">
          <ProfileImage src={avatar} />
          {/* <p>สวัสดี {user.fullname || ''}</p> */}
          <p>สวัสดี {user!=null?user.fullname:""}</p>
        </div>

        <div />
        <Nav vertical>
          <NavItem>
            <NavLink>หน้าแรก</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>ประวัติการจอง</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.doLogout}>ออกจากระบบ</NavLink>
          </NavItem>
         
        </Nav>
       
      </div>
    )
  }
}
