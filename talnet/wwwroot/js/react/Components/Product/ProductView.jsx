import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import ProductCreate from './ProductCreate.jsx';
import ProductDelete from './ProductDelete.jsx';
import ProductUpdate from './ProductUpdate.jsx';

export default class ProductTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateModel: false,

            ProductList: [],
            Success: { Data: '' },

            showDeleteModal: false,
            deleteId: 0,

            showCreateModel: false,

            ProductId: '',
            ProductName: '',
            ProductPrice: '',

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

    //Get products
    loadData() {

        fetch("/api/Product")
            .then(response => response.json())
            .then(data => {
                console.log("json data", data);
                this.setState({ ProductList: data.data });
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

    //Delete    
    handleDelete(id) {
        this.setState({ showDeleteModal: true });
        this.setState({ deleteid: id });
    }

    closeDeleteModal() {
        this.setState({ showDeleteModal: false });
        window.location.reload()
    }

    onChange(e) {

        this.setState({ [e.target.name]: e.target.value });
    }



    //Update
    showUpdateModel(id) {
        this.setState({ showUpdateModel: true });
        this.setState({ updateId: id });

        fetch("/api/Product/" + id, {

            //data: { 'id': id },

        })
            .then(response => response.json())
            .then(data => {
                console.log("json data", data);
                this.setState({
                    ProductId: data.data.id,
                    ProductName: data.data.name,
                    ProductPrice: data.data.price
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

    onUpdateSubmit(e) {


        e.preventDefault();
        if (this.validateForm()) {
            let id = { 'Id': this.state.ProductId };
            let data = { 'Id': this.state.ProductId, 'Name': this.state.ProductName, 'Price': this.state.ProductPrice };

            fetch("/api/Product/" + id, {
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
    
    render() {
        
        let tableData = null;
        
            tableData = this.state.ProductList.map(product =>
                <tr key={product.id}>
                    <td className="four wide">{product.name}</td>
                    <td className="four wide">{product.price}</td>

                    <td className="four wide">
                        <Button className="ui yellow button" onClick={this.showUpdateModel.bind(this, product.id)}><i className="edit icon"></i>EDIT</Button>
                    </td>

                    <td className="four wide">
                        <Button className="ui red button" onClick={this.handleDelete.bind(this, product.id)}><i className="trash icon"></i>DELETE</Button>
                    </td>

                </tr>

            )


        return (
            <div> 
                <div>
                    <button className="ui positive button" onClick={this.showCreateModel}>Add Product</button>
                    <ProductCreate onChange={this.onChange} onClose={this.closeCreateModel} onCreateSubmit={this.onCreateSubmit} showCreateModel={this.state.showCreateModel} />
                    <ProductDelete delete={this.state.deleteid} onClose={this.closeDeleteModal} onDeleteSubmit={this.onDeleteSubmit} showDeleteModal={this.state.showDeleteModal} />
                    <ProductUpdate onChange={this.onChange} update={this.state.updateid} onClose={this.closeUpdateModel} onUpdateSubmit={this.onUpdateSubmit} showUpdateModel={this.state.showUpdateModel}
                        Id={this.state.ProductId} Name={this.state.ProductName} Price={this.state.ProductPrice} errors={this.state.errors} />
                </div>
                <table className="ui striped table">
                    <thead>
                        <tr>

                            <th className="four wide">Name</th>
                            <th className="four wide">Price</th>
                            <th className="four wide">Actions</th>
                            <th className="four wide">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </table>
            
                </div>
            )
    }
}

