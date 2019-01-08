import React, { Component } from "react";
import "./Description.css";
import Select from "react-select";
import { Editor, RichUtils } from "draft-js";

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

  render() {
    const { showEdittingState } = this.props;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = showEdittingState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== "unstyled"
      ) {
        className += " RichEditor-hidePlaceholder";
      }
    }

    return (
      <div className="deal-listing-description">
        <div className="listing-description-container">
          <div className="description-titles">Give Your Listing a Name</div>
          <input
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
              // options={cryptoOptions}
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
              <button>Next</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Description;
