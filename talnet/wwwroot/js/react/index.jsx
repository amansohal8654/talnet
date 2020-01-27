import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import CustomerTable from "./Components/Customer/CustomerList.jsx";




const root = document.getElementById("root")
ReactDOM.render(<CustomerTable />, root)