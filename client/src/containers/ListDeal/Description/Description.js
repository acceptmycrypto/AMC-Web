import React, { Component } from "react";
import "./Description.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Select from "react-select";
import { Editor, RichUtils, convertToRaw, convertFromRaw } from "draft-js";
import { _loadCategory } from "../../../actions/categoryActions";

class Description extends Component {
  componentDidMount = () => {
    this.props._loadCategory();
  };

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

  handleRawText = () => {
    const raw = convertToRaw(this.props.showEdittingState.getCurrentContent());
  };

  render() {
    const { showEdittingState, parentCategory } = this.props;

    return (
      <div className="deal-listing-description">
        <div className="listing-description-container">
          <div className="description-titles">Give Your Listing a Name</div>
          <input
            onChange={this.props.editDealName}
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
              isMulti={true}
              options={parentCategory}
            />
          </div>

          <div className="listing-description-container-for-dropdown">
            <div className="description-titles description-title-dropdown">
              Select Your Item Condition (Optional)
            </div>
            <Select
              className="dropdown"
              // options={cryptoOptions}
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
            <div id="photos-next-step">
              <button>Submit Deal</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  parentCategory: state.CreateDeal.parentCategory
});

const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      _loadCategory
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Description);
