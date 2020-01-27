import React from "react";
import ReactDOM from "react-dom";
import { Modal, Button, Form } from "semantic-ui-react";
import $ from "jquery";


export default class ProductCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Success: { Data: '' },
            ProductName: '',
            ProductPrice: '',

            Sucess: [],
            errors: {}
        }

        this.onCreateSubmit = this.onCreateSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    validateForm() {

        let errors = {}

        let formIsValid = true
        if (!this.state.ProductName) {
            formIsValid = false;
            errors['ProductName'] = '*Please enter the Product Name.';
        }

        if (!this.state.ProductPrice) {
            formIsValid = false;
            errors['ProductPrice'] = '*Please enter the Product Price'
        }

        if (typeof this.state.ProductPrice !== "undefined") {
            if (!this.state.ProductPrice.match(/^\d+(\.\d{1,2})?$/)) {
                formIsValid = false;
                errors["ProductPrice"] = "*Please enter numbers only.";
            }
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }

    onCreateSubmit(e) {


        e.preventDefault();
        if (this.validateForm()) {
            let data = { name: this.state.ProductName, price: this.state.ProductPrice };

            fetch("/api/Product", {
                method: 'POST', // or 'PUT'
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

    onClose() {
        this.setState({ showDeleteModal: false });
        window.location.reload()
    }

    onChange(e) {
        console.log(e.target)
        this.setState({ [e.target.name]: e.target.value });
    }



    render() {
        return (
            <React.Fragment>
                <Modal open={this.props.showCreateModel} onClose={this.props.onClose} size='small'>
                    <Modal.Header> Create Product </Modal.Header>
                    <Modal.Content>
                        <Form className="ui form segment">
                            <Form.Field>
                                <label>Name</label>
                                <input type="text" name="ProductName" placeholder='Name' value={this.state.ProductName} onChange={this.onChange} />
                                <div style={{ color: 'red' }}>
                                   {this.state.errors.ProductName}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Price</label>
                                <input type="text" name="ProductPrice" placeholder='Price' value={this.state.ProductPrice} onChange={this.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.ProductPrice}
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