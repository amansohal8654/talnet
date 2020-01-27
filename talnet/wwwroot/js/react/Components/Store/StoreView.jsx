import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'semantic-ui-react';
import StoreDelete from './StoreDelete.jsx';
import StoreCreate from './StoreCreate.jsx';
import StoreUpdate from './StoreUpdate.jsx';

export default class StoreTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StoreList: [],
            Success: { Data: '' },

            showDeleteModal: false,
            deleteId: 0,

            showCreateModel: false,

            StoreId: '',
            StoreName: '',
            StoreAddress: '',

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

    }

    componentDidMount() {
        this.loadData();
    }

    //Get stores
    loadData() {

        fetch("/api/Store")
            .then(response => response.json())
            .then(data => {
                console.log("json data", data);
                this.setState({ StoreList: data.data });
            })
            .catch(() => console.log("error"));
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

    //Update
    showUpdateModel(id) {
        this.setState({ showUpdateModel: true });
        this.setState({ updateId: id });

        fetch("/api/Store/" + id, {

            //data: { 'id': id },

        })
            .then(response => response.json())
            .then(data => {
                console.log("json data", data);
                this.setState({
                    StoreId: data.data.id,
                    StoreName: data.data.name,
                    StoreAddress: data.data.address
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
        if (!this.state.StoreName) {
            formIsValid = false;
            errors['StoreName'] = '*Please enter the Store Name.';
        }

        if (typeof this.state.StoreName !== "undefined") {
            if (!this.state.StoreName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["StoreName"] = "*Please enter alphabet characters only.";
            }
        }

        if (!this.state.StoreAddress) {
            formIsValid = false;
            errors['StoreAddress'] = '*Please enter the Store Address'
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }

    onUpdateSubmit() {
        if (this.validateForm()) {
            let id = { 'Id': this.state.StoreId };
            let data = { 'Id': this.state.StoreId, 'Name': this.state.StoreName, 'Address': this.state.StoreAddress };

            fetch("/api/Store/" + id, {
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
            tableData = this.state.StoreList.map(store =>
                <tr key={store.id}>
                    <td className="four wide">{store.name}</td>
                    <td className="four wide">{store.address}</td>

                    <td className="four wide">
                        <Button className="ui yellow button" onClick={this.showUpdateModel.bind(this, store.id)}><i className="edit icon"></i>EDIT</Button>
                    </td>

                    <td className="four wide">
                        <Button className="ui red button" onClick={this.handleDelete.bind(this, store.id)}><i className="trash icon"></i>DELETE</Button>
                    </td>

                </tr>

            )

        return (
            <React.Fragment>
                <div>
                    <div><Button primary onClick={this.showCreateModel}>New Store</Button></div>
                    <StoreCreate onChange={this.onChange} onClose={this.closeCreateModel} onCreateSubmit={this.onCreateSubmit} showCreateModel={this.state.showCreateModel} />

                </div>

                <div>
                    <StoreUpdate onChange={this.onChange} update={this.state.updateId} onClose={this.closeUpdateModel} onUpdateSubmit={this.onUpdateSubmit} showUpdateModel={this.state.showUpdateModel}
                        Id={this.state.StoreId} Name={this.state.StoreName} Address={this.state.StoreAddress} errors={this.state.errors} />

                    <StoreDelete delete={this.state.deleteid} onClose={this.closeDeleteModal} onDeleteSubmit={this.onDeleteSubmit} showDeleteModal={this.state.showDeleteModal} />

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