import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap';
import axios from 'axios';


class Poll extends Component {

  state = {
    listPolls: [],
    optionId: 0,
    poolId: 0
  };

  componentWillMount(){
    axios.interceptors.request.use(function(config) {
      const token = localStorage.getItem('token');
    
      if ( token != null ) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    
      return config;
    }, function(err) {
      return Promise.reject(err.message);
    }); 
  }

  componentDidMount(){
    axios.get(`http://localhost:8080/pools/all`)
    .then(res => {
      const persons = res.data;
      this.setState({ listPolls: persons });
    }).catch(() => {
      localStorage.clear();
      this.props.history.push('/login');
    }); 
  }

  optionChange = event => {
    event.target.checked = true;
    this.setState({optionId: event.target.value});
  }
  
  getPollId = (poolId) => {
    this.setState({poolId: poolId.target.value});
    axios.post('http://localhost:8080/pools/anwser', 
      {
        "poolId": poolId.target.value,
        "optionId": this.state.optionId
      }      
    ).then(() => {
      this.componentDidMount();
    }).catch(() => {
      alert('erro ao responser');
    });
  }
    
  constructor(props){
    super(props);
    this.optionChange = this.optionChange.bind(this);
    this.getPollId = this.getPollId.bind(this);
  }

  OptionList = (options) => {
    return options.map(op => {
      return <FormGroup check className="radio">

      <Input key={op.id + op.description} className="form-check-input" type="radio" id={op.id + op.description} name="radios" value={op.id} onChange={this.optionChange} />      

      {op.awnsered ? <strong><Label key={op.description} check className="form-check-label" htmlFor={op.id}>{op.description}</Label></strong> : <Label key={op.description} check className="form-check-label" htmlFor={op.id}>{op.description}</Label>}
      {op.awnsered ? <Label key={op.description}>- You have chosen this one!</Label>: ''}
    </FormGroup>
    })
  }

  AwnserPoll = (event) => {
    event.preventDefault();
    return false;
  }

  PollsList = () => {
    return this.state.listPolls.map(list => {
      return <Card>
      <CardHeader>
      <strong>{list.title}</strong><br/><label>{list.description}</label>
      </CardHeader>
      <CardBody>
        <Form onSubmit={this.AwnserPoll} className="form-horizontal">                                                    
          <FormGroup row>
            <Col md="9">
              {this.OptionList(list.options)}
            </Col>
          </FormGroup>                            
          <Button value={list.id} onClick={this.getPollId} size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit Poll</Button>
        </Form>
      </CardBody>
    </Card>
    });    
  }

  render() {
    return (
      <div className="animated fadeIn">

      <Row>
        <Col xs="12" md="6">
          {!this.state.listPolls.length ? <Label>No poll created yet</Label> : this.PollsList()}
        </Col>
      </Row>
      </div>
    );
  }
}

export default Poll;
