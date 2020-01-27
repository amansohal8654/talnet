import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'semantic-ui-react';
import SaleDelete from './SalesDelete.jsx';
import SaleCreate from './SalesCreate.jsx';
import SaleUpdate from './SalesUpdate.jsx';

export default class SaleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SaleList: [{ Id: '', DateSolde: '', CustomerName: '', ProductName: '', StoreName: '' }],
            Success: { Data: '' },

            showDeleteModal: false,
            deleteId: 0,

            showCreateModel: false,

            Id: '',
            ProductId: '',
            StoreId: '',
            CustomerId: '',
            DateSolde: '',

            showUpdateModel: false,
            updateId: 0,

            Sucess: [],
            errors: {}
        };

        this.loadData = this.loadData.bind(this);

        this.handleDelete = this.handleDelete.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);

        this.showCreateModel = this.showCreateModel.bind(this);
        this.closeCreateModel = this.closeCreateModel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.showUpdateModel = this.showUpdateModel.bind(this);
        this.closeUpdateModel = this.closeUpdateModel.bind(this);
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);

        //this.DateConverter = this.DateConverter.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

  /* DateConverter(tempdate) {

        var converted = parseInt((tempdate.replace("/Date(", "").replace(")/", "")))

        var temp = new Date(converted)
        var date = (temp.getFullYear() + "-" + ((temp.getMonth()) + 1) + "-" + temp.getDate())
        return date

    }*/

    //Get sales
    loadData() {

        fetch("/api/Sales/GetSales")
            .then(response => response.json())
            .then(data => {
                console.log("json data", data);
                this.setState({ SaleList: data.data });
            })
            .catch(() => console.log("error"));
    }

    //Delete    
    handleDelete(id) {

        this.setState({ showDeleteModal: true });
        this.setState({ deleteId: id });
    }

    closeDeleteModal() {
        this.setState({ showDeleteModal: false });
        window.location.reload()
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
        console.log(e.target.value)
        this.setState({ [e.target.name]: e.target.value });
    }

    //Update
    showUpdateModel(id) {
        this.setState({ showUpdateModel: true });
        this.setState({ updateId: id });
        
        fetch("/api/Sales/GetUpdateSale/" + id, {
           
            //data: { 'id': id },
           
        })
            .then(response => response.json())
            .then(data => {
                console.log("json data", data);
                this.setState({
                    SaleId: data.id,
                    CustomerId: data.data.customerid,
                    ProductId: data.data.productid,
                    StoreId: data.data.storeid,
                    DateSold:data.data.datesolde,
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

        if (!this.state.DateSold) {
            formIsValid = false;
            errors['DateSold'] = '*Please provide the sale date.'
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }

    onUpdateSubmit() {
        if (this.validateForm()) {
            let id = { 'Id': this.state.SaleId};
            let data = {
                'Id': this.state.updateId,
                'ProductId': this.state.ProductId,
                'CustomerId': this.state.CustomerId,
                'StoreId': this.state.StoreId,
                'DateSolde': this.state.DateSolde 
            };
            fetch("/api/Sales/UpdateSale/" + id, {
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
                    console.log(data)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
           
        }
    }

    render() {
        let tableData = null;
            tableData = this.state.SaleList.map(sale =>
                <tr key={sale.id}>
                    <td className="two wide">{sale.customerName}</td>
                    <td className="two wide">{sale.productName}</td>
                    <td className="two wide">{sale.storeName}</td>
                    <td className="two wide">{sale.dateSold}</td>

                    <td className="four wide">
                        <Button className="ui yellow button" onClick={this.showUpdateModel.bind(this, sale.id)}><i className="edit icon"></i>EDIT</Button>
                    </td>

                    <td className="four wide">
                        <Button className="ui red button" onClick={this.handleDelete.bind(this, sale.id)}><i className="trash icon"></i>DELETE</Button>
                    </td>

                </tr>

            )
        return (
            <React.Fragment>
                <div>
                    <div><Button primary onClick={this.showCreateModel}>New Sale</Button></div>
                    <SaleCreate onChange={this.onChange} onClose={this.closeCreateModel} onCreateSubmit={this.onCreateSubmit} showCreateModel={this.state.showCreateModel} />

                </div>

                <div>
                    <SaleUpdate onChange={this.onChange} update={this.state.updateId} onClose={this.closeUpdateModel} onUpdateSubmit={this.onUpdateSubmit} showUpdateModel={this.state.showUpdateModel}
                        Id={this.state.SaleId} ProductId={this.state.ProductId} CustomerId={this.state.CustomerId} StoreId={this.state.StoreId} DateSold={this.state.DateSolde} errors={this.state.errors} />

                    <SaleDelete delete={this.state.deleteId} onClose={this.closeDeleteModal} onDeleteSubmit={this.onDeleteSubmit} showDeleteModal={this.state.showDeleteModal} />

                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th className="four wide">Customer</th>
                                <th className="four wide">Product</th>
                                <th className="four wide">Store</th>
                                <th className="four wide">DateSold</th>
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