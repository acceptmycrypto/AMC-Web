import React from 'react';
import './Alert.css';
import Modal from "react-awesome-modal";

const editModal = (visible, closeEditModal, discardEditChanges) => {
  return (
    <Modal
      visible={visible}
      effect="fadeInUp"
      onClickAway={() => {
        {closeEditModal()}
      }}
    >
      <div className="alert-modal">
        <div>
          <h6 className="alert-modal-header"> Are you sure you want to discard the changes?
          </h6>
          <div className="alert-modal-buttons">
            <button onClick={discardEditChanges}>Discard</button>
            <button onClick={closeEditModal}>Cancel</button>
          </div>
        </div>
      </div>

    </Modal>
  )
}

const deleteModal = (visible, closeModal, deleteListing, deletedDealHandling) => {
  return (

      <Modal
        visible={visible}
        effect="fadeInUp"
        onClickAway={() => {
          {closeModal()}
        }}
      >
        <div className="alert-modal">
          <div>
            <h6 className="alert-modal-header"> Are you sure you want to delete the listing?
            </h6>
            <div className="alert-modal-buttons">
              <button onClick={() =>
                  {
                    deleteListing();

                    deletedDealHandling();
                  }
                }>Delete</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      </Modal>

  )
}

const Alert = (props) => (
  <div>
    {props.alertEditModalVisible && editModal(props.alertEditModalVisible, props.closeEditModal, props.discardEditChanges)}

    {props.deleteModalVisible && deleteModal(props.deleteModalVisible, props.closeDeleteModal, props.deleteListing, props.deletedDealHandling)}
  </div>
);

export default Alert;