import React, { Component } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Row, Col, Container, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import bg from '../assets/backgrounds/2.jpg'

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
export default class Login extends Component {
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
                        <Input type="email" name="email" id="exampleEmail" placeholder="KMITL Account" />
                      </FormGroup>
                      <FormGroup>
                        <Input type="password" name="password" id="examplePassword" placeholder="Password" />
                      </FormGroup>
                      <Button color="primary" block>เข้าสู่ระบบ</Button>
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
