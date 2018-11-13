import React, { Component } from "react";
import "./Layout.css";
import Navbar from "../Navigation/Navbar";
// import { connect } from "react-redux";
// import { _isLoggedIn } from "../../actions/layoutActions";

class Layout extends Component {

  // componentDidMount (){
  //   this.props.dispatch(_isLoggedIn(localStorage.getItem('token')));
  // }

  render (){

  return (
    <div>
      {/* {this.props.user_info.length>0 && <Navbar /> } */}

      <Navbar/>

      <main className="Content">
        {this.props.children}
      </main>
    </div>
  );
  }
};

// reusing state rather than creating new state
// const mapStateToProps = state => ({
//   user_info: state.UserInfo.user_info,
//   loading: state.UserInfo.loading,
//   error: state.UserInfo.error
// });

// export default connect(mapStateToProps)(Layout);

export default Layout;

