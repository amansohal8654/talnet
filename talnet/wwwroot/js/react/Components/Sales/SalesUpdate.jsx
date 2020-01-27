import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class SaleUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Success: { Data: '' },

            CustomerDropdownList: [],
            ProductDropdownList: [],
            StoresDropdownList: [],
            CustomerId: '',
            ProductId: '',
            StoreId: ''
        };

        this.onClose = this.onClose.bind(this);

        this.CustomersDropdown = this.CustomersDropdown.bind(this);
        this.ProductsDropdown = this.ProductsDropdown.bind(this);
        this.StoresDropdown = this.StoresDropdown.bind(this);
    }

    componentDidMount() {
        this.CustomersDropdown();
        this.ProductsDropdown();
        this.StoresDropdown();
    }

    onClose() {
        this.setState({ showUpdateModel: false });
        window.location.reload()
    }

    CustomersDropdown() {

        fetch("/api/Sales/GetCustomers")
            .then(response => response.json())
            .then(data => {
                console.log("json data", data);
                this.setState({ CustomerDataList: data.data });
            })
            .catch(() => console.log("error"));
    }

    ProductsDropdown() {

        fetch("/api/Sales/GetProducts")
            .then(response => response.json())
            .then(data => {
                console.log("json data", data);
                this.setState({ ProductDataList: data.data });
            })
            .catch(() => console.log("error"));
    }

    StoresDropdown() {

        fetch("/api/Sales/GetStores")
            .then(response => response.json())
            .then(data => {
                console.log("json data", data);
                this.setState({ StoreDataList: data.data });
            })
            .catch(() => console.log("error"));
    }
    render() {
        let CustomerDataList = [].concat(this.state.CustomerDropdownList)
        let ProductDataList = [].concat(this.state.ProductDropdownList)
        let StoreDataList = [].concat(this.state.StoresDropdownList)
        if (this.state.ProductDataList) {
            ProductDataList = this.state.ProductDataList.map((Product) => <option key={Product.id} value={Product.id} >
                {Product.productName}
            </option>);
        };

        if (this.state.CustomerDataList) {
            CustomerDataList = this.state.CustomerDataList.map((customer) =>
                <option key={customer.id} value={customer.id} >
                    {customer.customerName}
                </option>);
        };
        if (this.state.StoreDataList) {
            StoreDataList = this.state.StoreDataList.map((Store) =>
                <option key={Store.id} value={Store.id} >
                    {Store.storeName}
                </option>);
        };
        return (
            <React.Fragment>
                <Modal open={this.props.showUpdateModel} onClose={this.props.onClose} size='small'>
                    <Modal.Header> Edit Sales </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Product Name</label>
                                <select name="ProductId" onChange={this.props.onChange} value={this.props.ProductId}>
                                    {ProductDataList}
                                </select>
                                <div style={{ color: 'red' }}>
                                    {this.props.errors.ProductId}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Customer Name</label>
                                <select name="CustomerId" onChange={this.props.onChange} value={this.props.CustomerId}>
                                    {CustomerDataList}
                                </select>
                                <div style={{ color: 'red' }}>
                                    {this.props.errors.CustomerId}
                                </div>
                            </Form.Field>
                            
                            <Form.Field>
                                <label>Store Name</label>
                                <select name="StoreId" onChange={this.props.onChange} value={this.props.StoreId}>
                                    {StoreDataList}
                                </select>
                                <div style={{ color: 'red' }}>
                                    {this.props.errors.StoreId}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Date Sold</label>
                                <input type="Date" name="DateSolde" defaultValue={this.props.DateSolde} placeholder='YYYY/MM/DD' onChange={this.props.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.props.errors.DateSold}
                                </div>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} secondary >Cancel
                        </Button>
                        <Button onClick={this.props.onUpdateSubmit} className="ui green button">Edit
                        <i className="check icon"></i>
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}