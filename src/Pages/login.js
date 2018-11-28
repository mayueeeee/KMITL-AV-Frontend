import React, { Component } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Row, Col, Container, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import bg from '../assets/backgrounds/2.jpg'
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom'
const ContainerWarpper = styled.div`
  background-image: url(${bg});
  background-size: 100vw;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* filter: blur(5px);
  position: absolute; */
`
const LoginBox = styled(Card)`
  /* min-height:90vh;
margin:20px 0 20px 0; */
  /* filter: blur(0px) !important;
  z-index: 100; */
  max-width: 50%;
`

const LoginX = styled(Row)`
  justify-content: center;

`

@inject('routing')
// @withRouter
@observer
class Login extends Component {
  
  state = {
    login_data: {
      username: '',
      password: ''
    }
  }
  
  componentDidMount() {
    console.log(this.props)
    if (window.localStorage.getItem('lavs-access-token')) {
      // Validate valid token
    }
  }
  handleChange = (id, e) => {
    var tmp = this.state.login_data
    tmp[id] = e.target.value
    this.setState({ login_data: tmp })
  }

  doLogin = async () =>{
    const { location, push, goBack } = this.props.routing;
    // console.log(this.state)
    // console.log(process.env.API_URL)
    const res = await axios.post('/v1/auth',this.state.login_data)
    window.localStorage.setItem('lavs-access-token',res.data.access_token)
    window.localStorage.setItem('lavs-user-data',JSON.stringify( res.data.user))
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`
    console.log(res)
    // push('/dashboard')
    this.props.history.push('/');
    console.log(location.pathname)
    this.forceUpdate()
  }
  render() {
    return (
      <ContainerWarpper>
        <Container fluid>
          <LoginX>
            <Col xs={12} md={5} lg={4}>
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <Form>
                        <h2>เข้าสู่ระบบ</h2>
                        <p>กรุณาเข้าสู่ระบบด้วยบัญชีสถาบัน</p>
                        <FormGroup>
                          <Input type="text" name="email" id="exampleEmail" placeholder="KMITL Account" onChange={(e) => this.handleChange('username', e)} />
                        </FormGroup>
                        <FormGroup>
                          <Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={(e) => this.handleChange('password', e)}/>
                        </FormGroup>
                        <Button color="primary" block onClick={this.doLogin} size="lg">
                          เข้าสู่ระบบ
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </LoginX>
        </Container>
      </ContainerWarpper>
    )
  }
}

export default Login