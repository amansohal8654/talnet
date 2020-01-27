import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, } from 'semantic-ui-react';
import CustomerCreate from './CustomerCreate.jsx';
import CustomerDelete from './CustomerDelete.jsx';
import CustomerUpdate from './CustomerUpdate.jsx';


export default class CustomerTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

            CustomerList: [],
            Success: { Data: '' },


            showDeleteModal: false,
            deleteId: 0,

            showCreateModel: false,

            Customerid: '',
            Customername: '',
            Customeraddress: '',

            showUpdateModel: false,
            updateId: 0,

            Sucess: [],
            errors: {}

        }

        this.loadData = this.loadData.bind(this);

        this.showCreateModel = this.showCreateModel.bind(this);
        this.closeCreateModel = this.closeCreateModel.bind(this);
        this.onChange = this.onChange.bind(this);

        this.handleDelete = this.handleDelete.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);

        this.showUpdateModel = this.showUpdateModel.bind(this);
        this.closeUpdateModel = this.closeUpdateModel.bind(this);
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);
    }


    componentDidMount() {
        this.loadData();
        
    }

    //Get customers
    loadData() {

        fetch("/api/Customer")
            .then(response => response.json())
            .then(data => {
                console.log("json data", data);
                this.setState({ CustomerList: data.data });
            })
            .catch(() => console.log("error"));
    }

    //Create
    showCreateModel() {
        this.setState({ showCreateModel: true });
    }

    closeCreateModel() {
        this.setState({ showCreateModel: false });
        window.location.reload()
    }

    onChange(e) {

        this.setState({ [e.target.name]: e.target.value });
    }

    //Delete    
    handleDelete(id) {
        this.setState({ showDeleteModal: true });
        this.setState({ deleteid: id });
    }

    closeDeleteModal() {
        this.setState({ showDeleteModal: false });
        window.location.reload()
    }

    //Update
    showUpdateModel(id) {
        this.setState({ showUpdateModel: true });
        this.setState({ updateId: id });

        fetch("/api/Customer/" + id, {
           
            //data: { 'id': id },
           
        })
            .then(response => response.json())
            .then(data => {
                console.log("json data", data);
                this.setState({
                    CustomerId: data.data.id,
                    CustomerName: data.data.name,
                    CustomerAddress: data.data.address
                })
               
            })
            .catch(() => console.log("error"));

       
    }

    closeUpdateModel() {
        this.setState({ showUpdateModel: false });
        window.location.reload()
    }

    validateForm() {

        let errors = {}

        let formIsValid = true
        if (!this.state.CustomerName) {
            formIsValid = false;
            errors['CustomerName'] = '*Please enter the Customer Name.';
        }

        if (typeof this.state.CustomerName !== "undefined") {
            if (!this.state.CustomerName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["CustomerName"] = "*Please enter alphabet characters only.";
            }
        }

        if (!this.state.CustomerAddress) {
            formIsValid = false;
            errors['CustomerAddress'] = '*Please enter the Customer Address'
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }


    onUpdateSubmit() {
        if (this.validateForm()) {
            let id = { 'Id': this.state.CustomerId };
            let data = { 'Id': this.state.CustomerId, 'Name': this.state.CustomerName, 'Address': this.state.CustomerAddress };

            fetch("/api/Customer/" + id, {
                method: 'POST', // or 'Put'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                    window.location.reload()
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
           
        }
    }
    render() {

       
        let tableData = null;

        tableData = this.state.CustomerList.map(customer =>
            <tr key={customer.id}>
                <td className="four wide">{customer.name}</td>
                <td className="four wide">{customer.address}</td>

                <td className="four wide">
                    <Button className="ui yellow button" onClick={this.showUpdateModel.bind(this, customer.id)}><i className="edit icon"></i>EDIT</Button>
                </td>

                <td className="four wide">
                    <Button className="ui red button" onClick={this.handleDelete.bind(this, customer.id)}><i className="trash icon"></i>DELETE</Button>
                </td>

            </tr>
        )


        return (

            
            <React.Fragment>
                
                <div>
                    
                    <div><Button className="ui primary button" onClick={this.showCreateModel}>New Customer</Button></div>
                    <CustomerCreate onChange={this.onChange} onClose={this.closeCreateModel} onCreateSubmit={this.onCreateSubmit} showCreateModel={this.state.showCreateModel} />
                </div>
                <div>

                    <CustomerUpdate onChange={this.onChange} update={this.state.updateId} onClose={this.closeUpdateModel} onUpdateSubmit={this.onUpdateSubmit} showUpdateModel={this.state.showUpdateModel}
                        Id={this.state.CustomerId} Name={this.state.CustomerName} Address={this.state.CustomerAddress} errors={this.state.errors} />
                    
                    <CustomerDelete delete={this.state.deleteid} onClose={this.closeDeleteModal} onDeleteSubmit={this.onDeleteSubmit} showDeleteModal={this.state.showDeleteModal} />
                    

                    <table className="ui striped table">
                        <thead>
                            <tr>
                                
                                <th className="four wide">Name</th>
                                <th className="four wide">Address</th>
                                <th className="four wide">Actions</th>
                                <th className="four wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
            ) 

    }
}