import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

import { Error } from 'auth0-extension-ui';
import PermissionForm from './PermissionForm';

export default class PermissionDialog extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    permission: PropTypes.object.isRequired,
    applications: PropTypes.object.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.permission !== this.props.permission || nextProps.applications !== this.props.applications;
  }

  render() {
    const applications = this.props.applications.toJS();
    const permission = this.props.permission.toJS();
    const title = permission.isNew ? 'Create Permission' : `Edit Permission: ${permission.record.name}`;
    const isVisible = permission.isEdit || permission.isNew;
    const initialValues = permission.record;
    if (permission.isNew && applications.records.length > 0) {
      initialValues.applicationId = applications.records[0].client_id;
    }

    return (
      <Modal show={isVisible} onHide={this.props.onClose}>
        <Modal.Header closeButton={!permission.loading} className="has-border">
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <PermissionForm
          applications={applications.records} loading={permission.loading} initialValues={initialValues} validationErrors={permission.validationErrors}
          onClose={this.props.onClose} onSubmit={this.props.onSave}
          isNew={permission.isNew}
        >
          <Error message={permission.error} />
        </PermissionForm>
      </Modal>
    );
  }
}
