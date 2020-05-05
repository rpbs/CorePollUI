import React, { Component } from 'react';
import axios from 'axios';

class Logout extends Component {
    constructor(props){
        var token = localStorage.getItem('token')
        axios.post("http://localhost:3000/#/logout", {
            token: token
        });
    }
}
