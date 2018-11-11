import React, { Component } from "react";
import "./Layout.css";
import Navbar from "../Navigation/Navbar";
import { connect } from "react-redux";
import { _isLoggedIn } from "../../actions/layoutActions";

class Layout extends Component {

  componentDidMount (){
    this.props.dispatch(_isLoggedIn(localStorage.getItem('token')));
  }

  render (){

  return (
    <div>
      {this.props.user && <Navbar /> }

      <main className="Content">
        {this.props.children}
      </main>
    </div>
  );
  }
};

const mapStateToProps = state => ({
  user: state.Layout.user,
  loading: state.Layout.loading,
  error: state.Layout.error
});


export default connect(mapStateToProps)(Layout);
