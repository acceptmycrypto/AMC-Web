import React from 'react';
import './Alert.css';
import Modal from "react-awesome-modal";

const dealEditContent = (closeEditModal, discardEditChanges) => {
  return (
    <div>
      <h6 className="alert-modal-header"> Are you sure you want to discard the changes?
      </h6>
      <div className="alert-modal-buttons">
        <button onClick={discardEditChanges}>Discard</button>
        <button onClick={closeEditModal}>Cancel</button>
      </div>
    </div>
  )
}

const Alert = (props) => (
  <div>
    <Modal
      visible={props.alertEditModalVisible}
      effect="fadeInUp"
      onClickAway={() => {
        {props.alertEditModalVisible && props.closeEditModal()}
        // closeModalAfterDealCreated();
        // this.directToDealItemPage();
      }}
    >
      <div className="alert-modal">
        {props.alertEditModalVisible && dealEditContent(props.closeEditModal, props.discardEditChanges)}
      </div>

    </Modal>
  </div>
);

export default Alert;