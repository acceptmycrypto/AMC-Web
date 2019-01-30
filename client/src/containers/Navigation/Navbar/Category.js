import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { _loadCategory, categoryDeals} from '../../../actions/categoryActions';


class Category extends Component {

    // sortUniqueCategory = (deals) => {
    //   let newCategory = [];
    //   deals.map(deal => (
    //     newCategory.push(deal.category)
    //   ))

    //   let uniqueArray = [...new Set(newCategory)]

    //   return uniqueArray
    // }

    newCategory = (category) =>{
      this.props.categoryDeals(category, 1);
      this.props.history.push("/category?term="+category+"&page=1");
    }

    componentDidMount () {
      this.props._loadCategory();
    }

    render(){
      let{parentCategory} = this.props;
      console.log(parentCategory);
        return (
          <div className="dropdown show mx-4">
            <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              All Categories
            </a>
            <div className="dropdown-menu category-dropdown" aria-labelledby="dropdownMenuLink">
            {parentCategory !== undefined && parentCategory.length > 0 && parentCategory.map((category, i) => {
              return (
               <div to={"/category?term="+category.value+"&page=1"} key={i} className="dropdown-item" onClick={() => {this.newCategory(category.value)}}>{category.value}</div>)
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
    parentCategory: state.Category.parentCategory
  };
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({_loadCategory, categoryDeals}, dispatch);
}

export default withRouter (connect(mapStateToProps, matchDispatchToProps)(Category));
