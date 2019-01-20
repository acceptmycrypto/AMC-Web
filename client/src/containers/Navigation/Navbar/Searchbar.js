import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class SearchBar extends Component {
    search = (event) => {
        event.preventDefault();
        this.props.history.push("/search?term="+event.target.children[0].value+"&page=1");
    }
    
    render(){
        return (
            <div className="Search d-flex flex-row align-items-center">
                <form className="search_Form" onSubmit={this.search}>
                    <input type="text"
                        placeholder="Search"
                        id = "searchbarinput"
                    />
                    <button className="search_Button"><i className="fas fa-search fa-lg" id="white"></i></button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchTerm: state.Search.searchTerm,
    };
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(SearchBar));