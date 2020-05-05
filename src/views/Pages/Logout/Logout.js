import { Component } from 'react';
import axios from 'axios';

class Logout extends Component {
    constructor(props){
        super(props)
        
        var token = localStorage.getItem('token')
        axios.post("http://localhost:8080/users/logout?token="+token).then(() => {
            this.props.history.push('login');
        }).catch(() => {
            this.props.history.push('/');            
        });
    }

    componentWillUnmount(){
    }

    render(){
        return "";
    }
}

export default Logout;
