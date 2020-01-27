import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'semantic-ui-react';


export default class CustomerDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };

        this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }
    
    onDeleteSubmit(id) {
        fetch('/api/Customer/' + id, {
            method: 'DELETE',
            
        })
            .then(() => {
                console.log('removed');
                window.location.reload()
        }).catch(err => {
            console.error(err)
        });
       
    }

    

    onClose() {
        this.setState({ showDeleteModal: false });
        window.location.reload()
    }

    render() {
        
        return (            
            <React.Fragment>

                <Modal className="model" open={this.props.showDeleteModal} onClose={this.props.onClose} size='small'>
                    <Modal.Header>Delete Your Account</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete your account</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} secondary >Cancel
                            </Button>
                        <Button onClick={() => this.onDeleteSubmit(this.props.delete)} className="ui red button">Delete
                            <i className="x icon"></i>
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}