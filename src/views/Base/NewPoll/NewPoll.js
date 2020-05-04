import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Form,
  Button
} from 'reactstrap';

import axios from 'axios';

class NewPoll extends Component {
  state = {
    title: "",
    description: "",
    option1: "",
    option2: "",
    option3: "",
    option4: ""
  }

  constructor(props){
    super(props);
    this.createNewPoll = this.createNewPoll.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setOption1 = this.setOption1.bind(this);
    this.setOption2 = this.setOption2.bind(this);
    this.setOption3 = this.setOption3.bind(this);
    this.setOption4 = this.setOption4.bind(this);
  }

  setTitle = event => {
    this.setState({title: event.target.value});
  }
  setDescription = event => {
    this.setState({description: event.target.value});
  }
  setOption1 = event => {
    this.setState({option1: event.target.value});
  }
  setOption2 = event => {
    this.setState({option2: event.target.value});
  }
  setOption3 = event => {
    this.setState({option3: event.target.value});
  }
  setOption4 = event => {
    this.setState({option4: event.target.value});
  }

  createNewPoll= () => {
      axios.post("http://localhost:8080/pools", {
        "title": this.state.title,
        "description": this.state.description,
        "options": [this.state.option1, 
          this.state.option2, 
          this.state.option3, 
          this.state.option4]
      }).then((resp) => {
        this.props.history.push('/base/poll');
      }).catch(err => {
        console.log(err);
        alert(err.message);
      });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6">
            <Form onSubmit={this.createNewPoll}>
              <Card>
                <CardHeader>
                  <strong>Create new Poll</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label htmlFor="name">Title</Label>
                        <Input type="text" id="name" required value={this.state.title} onChange={this.setTitle} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label htmlFor="description">Description</Label>
                        <Input type="text" id="description" required value={this.state.description} onChange={this.setDescription} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <FormGroup>
                      <Col xs="12">
                        <Label>Options</Label>
                      </Col>
                      <Col xs="12">
                      <FormGroup>
                        <Input type="text" id="1" key="1" placeholder="Option 1" value={this.state.option1} onChange={this.setOption1} />
                      </FormGroup>
                      <FormGroup>
                        <Input type="text" id="2" key="2"  placeholder="Option 2" value={this.state.option2} onChange={this.setOption2} />
                      </FormGroup>
                      <FormGroup>
                        <Input type="text" id="3" key="3" placeholder="Option 3" value={this.state.option3} onChange={this.setOption3} />
                      </FormGroup>
                      <FormGroup>
                        <Input type="text" id="4" key="4" placeholder="Option 4" value={this.state.option4} onChange={this.setOption4} />
                      </FormGroup>
                      </Col>
                    </FormGroup>   
                  </Row>
                  <Button type="submit">Create</Button>
                </CardBody>
              </Card>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NewPoll;
