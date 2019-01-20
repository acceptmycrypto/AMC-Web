import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {searchDeals} from '../../../actions/searchBarActions';

class SearchBar extends Component {
    render(){
        return (
            <div className="Search d-flex flex-row align-items-center">
                <i className="fas fa-search fa-lg mx-2"></i>
                <input type="text"
                    placeholder="Search"
                    onChange={(event) => this.props.searchDeals(
                        // localStorage.getItem('token'),
                        event.target.value,
                        this.props.allDeals)}
                    value={this.props.term}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        term: state.Search.searchTerm,
        allDeals: state.matchedDeals.deals
    };
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({searchDeals:searchDeals}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchBar);