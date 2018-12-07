import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {filterCategory} from '../../../actions/categoryActions';

class Category extends Component {

    sortCategory = (deals) => {
      let newCategory = [];
      deals.map(deal => (
        newCategory.push(deal.category)
      ))

      let uniqueArray = [...new Set(newCategory)]

      return uniqueArray

      // let filteredCategory = newCategory.filter(function(category, pos){
      //   return newCategory.indexOf(category)== pos;
      // });
    }

    render(){
        return (
          <div className="dropdown show mx-4">
            <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Categories
            </a>
            <div className="dropdown-menu category-dropdown" aria-labelledby="dropdownMenuLink">
            {this.sortCategory(this.props.allDeals).map((category, i) => {
              return (
               <div key={i} className="dropdown-item" onClick={(event) => this.props.filterCategory(event.target.innerHTML, this.props.allDeals)}>{category}</div>)
            })}


              {/* {this.props.allDeals.map(deal => (
                <div key={deal.id} className="dropdown-item" onClick={(event) => this.props.filterCategory(event.target.innerHTML, this.props.allDeals)}>{deal.category}</div>
              ))} */}
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
