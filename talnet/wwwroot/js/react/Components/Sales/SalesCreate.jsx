import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Dropdown, Modal, Button, Form } from 'semantic-ui-react';
//import { Link, RichText, Date } from 'prismic-reactjs';


export default class SaleCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Success: { Data: '' },
            choose:'',
            ProductId: 0,
            StoreId: 0,
            CustomerId: 0,
            DateSolde: '',

            CustomerDropdownList: [],
            ProductDropdownList: [],
            StoresDropdownList: [],

            Sucess: [],
            errors: {}
        };

        this.onCreateSubmit = this.onCreateSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);

        this.CustomersDropdown = this.CustomersDropdown.bind(this);
        this.ProductsDropdown = this.ProductsDropdown.bind(this);
        this.StoresDropdown = this.StoresDropdown.bind(this);
    }

    componentDidMount() {
        this.CustomersDropdown();
        this.ProductsDropdown();
        this.StoresDropdown();
    }

   
    validateForm() {

        let errors = {}

        let formIsValid = true
        if (!this.state.CustomerId) {
            formIsValid = false;
            errors['CustomerId'] = '*Please select the Customer.';
        }

        if (!this.state.ProductId) {
            formIsValid = false;
            errors['ProductId'] = '*Please select the Product.'
        }

        if (!this.state.StoreId) {
            formIsValid = false;
            errors['StoreId'] = '*Please select the Store.'
        }
        if (!this.state.DateSolde) {
            formIsValid = false;
            errors['DateSolde'] = '*Please provide the sale date.'
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }

    onCreateSubmit(e) {
        e.preventDefault();
        if (this.validateForm()) {
            let data = {

                ProductId: this.state.ProductId,
                CustomerId: this.state.CustomerId,
                StoreId: this.state.StoreId,
                DateSolde: this.state.DateSolde
            };

            console.log("post data", data);

            fetch("/api/Sales/CreateSales", {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            
                .then((response) => response.json())
                .then((data) => {
                   // console.log('body:', body);
                    console.log('Success:', data);
                    window.location.reload()
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    onClose() {
        this.setState({ showDeleteModal: false });
        window.location.reload()
    }

    onChange(e) {
        console.log(e.target.value)
        this.setState({ [e.target.name]: e.target.value });
    }

    CustomersDropdown() {

        fetch("/api/Sales/GetCustomers")
            .then(response => response.json())
            .then(data => {
                console.log("json data", data);
                this.setState({ CustomerDropdownList: data.data });
            })
            .catch(() => console.log("error"));
    }

    ProductsDropdown() {

        fetch("/api/Sales/GetProducts")
            .then(response => response.json())
            .then(data => {
                console.log("json data", data);
                this.setState({ ProductDropdownList: data.data });
            })
            .catch(() => console.log("error"));
    }

    StoresDropdown() {

        fetch("/api/Sales/GetStores")
            .then(response => response.json())
            .then(data => {
                console.log("json data", data);
                this.setState({ StoresDropdownList: data.data });
            })
            .catch(() => console.log("error"));
    }

    render() {
       
        let ProductDropdownList = 'seleact Product'
        let CustomerDropdownList = 'seleact Customer'
        let StoresDropdownList = 'seleact Stores'
        
        if (this.state.ProductDropdownList) {
            ProductDropdownList = this.state.ProductDropdownList.map((Product) =>
                <option key={Product.id} value={Product.id} >
                {Product.productName}
            </option>);
        };

        if (this.state.CustomerDropdownList) {
            CustomerDropdownList = this.state.CustomerDropdownList.map((customer) =>
                <option key={customer.id} value={customer.id} >
                {customer.customerName}
            </option>);
            };

       
        if (this.state.StoresDropdownList) {
            StoresDropdownList = this.state.StoresDropdownList.map((Store) =>
                <option key={Store.id} value={Store.id} >
                {Store.storeName}
            </option>);
        };

        return (
            <React.Fragment>
                <Modal open={this.props.showCreateModel} onClose={this.props.onClose} size='small'>
                    <Modal.Header> Create Sales </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Product Name</label>

                                <select name="ProductId" onChange={this.onChange} value={this.state.ProductId} >
                                    <option>choose</option>
                                    {ProductDropdownList}
                                </select>
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.ProductId}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Customer Name</label>
                                <select name="CustomerId" onChange={this.onChange} value={this.state.CustomerId} >
                                    <option>choose</option>
                                     {CustomerDropdownList} 
                                </select>
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.CustomerId}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Store Name</label>
                                <select name="StoreId" onChange={this.onChange} value={this.state.StoreId} >
                                    <option>choose</option>
                                     {StoresDropdownList} 
                                </select>
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.StoreId}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Date Sold</label>
                                <input type="Date" name="DateSolde" placeholder="dd/MM/yyyy" onChange={this.onChange} value={this.state.dateSolde} />
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.DateSold}
                                </div>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} secondary >Cancel
                        </Button>
                        <Button onClick={this.onCreateSubmit} className="ui green button">Create
                        <i className="check icon"></i>
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}