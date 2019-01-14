import React, { Component } from "react";
import "./Description.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Select from "react-select";
import { Editor, RichUtils } from "draft-js";
import { _loadCategory } from "../../../actions/categoryActions";
import {
  handleSelectedCategory,
  handleSelectedCondition,
  closeModalAfterDealCreated
} from "../../../actions/listDealActions";
import Modal from "react-awesome-modal";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { Link } from "react-router-dom";

class Description extends Component {
  //this method is to handle cursor focus when user clicks on the text area
  focus = () => this.refs.editor.focus();

  onItalicClick = () => {
    this.props.updateEditDetail(
      RichUtils.toggleInlineStyle(this.props.showEdittingState, "ITALIC")
    );
  };

  onUnderlineClick = () => {
    this.props.updateEditDetail(
      RichUtils.toggleInlineStyle(this.props.showEdittingState, "UNDERLINE")
    );
  };

  onBoldClick = () => {
    this.props.updateEditDetail(
      RichUtils.toggleInlineStyle(this.props.showEdittingState, "BOLD")
    );
  };

  //We have access to history props from withRouter
  directToDealItemPage = () => {
    this.props.history.push(`/feed/deals/${this.props.deal_id}/${this.props.dealNameValue}`);
  };

  contactInfo = () => {
    return (
      <div>
        <label>Contact Info</label>
        <small>
          To keep your account secured, please provide us your contact info.
        </small>
        <input
            // onChange={}
            // value={}
            className="description-input"
            autofocus="autofocus"
            placeholder="Enter your phone number"
          />
      </div>
    )
  };

  render() {
    const {
      parentCategory,
      handleSelectedCategory,
      handleSelectedCondition,
      deal_id,
      closeModalAfterDealCreated,
      modalVisible,
      resetDealCreated,
      dealNameValue,
      selectedCategoryValue,
      selectedConditionValue
    } = this.props;

    const itemCondition = [
      { value: "New", label: "New" },
      { value: "Used", label: "Used" }
    ];

    return (
      <div className="deal-listing-description">
        <div className="listing-description-container">
          <div className="description-titles">Give Your Listing a Name</div>
          <input
            onChange={this.props.editDealName}
            value={dealNameValue}
            className="description-input"
            autofocus="autofocus"
            placeholder="Enter a name that others can easily find your listing"
          />
        </div>
        <div className="listing-description-container-for-dropdown-flex">
          <div className="listing-description-container-for-dropdown">
            <div className="description-titles description-title-dropdown">
              Select Your Listing Category
            </div>
            <Select
              className="dropdown"
              value={selectedCategoryValue}
              isMulti={true}
              options={parentCategory}
              onChange={handleSelectedCategory}
            />
          </div>

          <div className="listing-description-container-for-dropdown">
            <div className="description-titles description-title-dropdown">
              Select Your Item Condition (Optional)
            </div>
            <Select
              className="dropdown"
              options={itemCondition}
              onChange={handleSelectedCondition}
              value={selectedConditionValue}
            />
          </div>
        </div>

        <div>
          <div className="description-titles detail-title">Details</div>
          <div className="crypto-subtitle">
            Let buyer knows the detail about your listing.
          </div>
          <div className="listing-detail-buttons">
            <button className="detail-button" onClick={this.onItalicClick}>
              <i class="fas fa-italic" />
            </button>
            <button className="detail-button" onClick={this.onBoldClick}>
              <i class="fas fa-bold" />
            </button>
            <button className="detail-button" onClick={this.onUnderlineClick}>
              <i class="fas fa-underline" />
            </button>
          </div>
          <div className="editor-wrapper" onClick={this.focus}>
            <Editor
              editorState={this.props.showEdittingState}
              onChange={this.props.updateEditDetail}
              placeholder="Describe your listing..."
              ref="editor"
              spellCheck={true}
            />
          </div>
          <div id="price-listing-next-button">
            <hr />
            <div onClick={() => this.props.validateDescriptionStep() && this.props.createDeal()} id="photos-next-step">
              {this.props.loading_dealCreating ? <LoadingSpinner /> : <button>Submit Deal</button>}
            </div>
          </div>
        </div>
        <Modal
          visible={modalVisible}
          effect="fadeInUp"
          onClickAway={() => {
            closeModalAfterDealCreated();
            this.directToDealItemPage();
          }}
        >
          <div className="deal-created-modal">
            <h4>You have successfully created a Deal! </h4>
            <br />
            <h4>Now sit tight and wait to get paid with cryptocurrency.</h4>
            <Link
              to={`/feed/deals/${deal_id}/${dealNameValue}`}
              className="a-link"
              onClick={() => {
                closeModalAfterDealCreated();
              }}
              onClick={resetDealCreated}
            >
              OK
            </Link>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  parentCategory: state.CreateDeal.parentCategory,
  modalVisible: state.CreateDeal.modalVisible
});

const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      _loadCategory,
      handleSelectedCategory,
      handleSelectedCondition,
      closeModalAfterDealCreated
    },
    dispatch
  );
};

export default withRouter(connect(
  mapStateToProps,
  matchDispatchToProps
)(Description));
