import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {searchDeals} from '../../../actions/searchBarActions';

class SearchBar extends Component {
    search = (event) => {
        console.log("searching!");
        event.preventDefault();
        this.props.searchDeals(event.target.children[0].value, 1);
        this.props.history.push("/Search?term="+event.target.children[0].value+"&page=1");
    }
    
    render(){
        return (
            <div className="Search d-flex flex-row align-items-center">
                <form className="search_Form" onSubmit={this.search}>
                    <input type="text"
                        placeholder="Search for Deals"
                        id = "searchbarinput"
                        defaultValue = {this.props.searchTerm}
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
    return bindActionCreators({searchDeals:searchDeals}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(SearchBar));