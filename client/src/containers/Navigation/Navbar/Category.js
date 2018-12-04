import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {filterCategory} from '../../../actions/categoryActions';

class Category extends Component {

    render(){
        return (
          <div className="dropdown show mx-4">
            <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Categories
            </a>
            <div className="dropdown-menu category-dropdown" aria-labelledby="dropdownMenuLink">
              {this.props.allDeals.map(deal => (
                <div key={deal.id} className="dropdown-item" onClick={(event) => this.props.filterCategory(event.target.innerHTML, this.props.allDeals)}>{deal.category}</div>
              ))}
            </div>
          </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      allDeals: state.matchedDeals.deals
  };
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({filterCategory}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Category);
