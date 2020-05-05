import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Register extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      repeat: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleRepeat = this.handleRepeat.bind(this);
    this.login = this.login.bind(this);
  }

  async login() {
    if (this.state.password != this.state.repeat){
      alert('Passwords fields are different');
      return;
    }

    let url = 'http://localhost:8080/users/signup';
    const result = await axios.post(url, {
      "username": this.state.username,
      "email": this.state.username + "@" + this.state.username + ".com",
      "password": this.state.password,
      "roles": [
        "ROLE_ADMIN"
      ]
    }).catch(() => {
      alert('erro');
    });
    if (result){
      localStorage.setItem('token', result.data);    
      this.props.history.push('/base/poll');
    }
  }

  handleChange = event => {
    this.setState({username: event.target.value});
  }

  handleChangePassword = event => {
    this.setState({password: event.target.value});
  }

  handleRepeat = event => {
    this.setState({repeat: event.target.value});
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.login}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" autoComplete="username" value={this.state.username} onChange={this.handleChange} required minLength="4" />
                    </InputGroup>                    
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password" value={this.state.password} onChange={this.handleChangePassword} required />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password" value={this.state.repeat} onChange={this.handleRepeat} required />
                    </InputGroup>
                    <Button color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
