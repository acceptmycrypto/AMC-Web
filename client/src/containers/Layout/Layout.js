import React, { Component } from "react";
import "./Layout.css";
import "./LayoutMobile.css";
import Navbar from "../Navigation/Navbar";
import Footer from "../../components/Layout/Footer";
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
      <div id="mob-nav-sidebar">
        <div id="mob-content">
          <Navbar/>
          <main className="Content">
            {this.props.children}
          </main>
          <Footer/>
        </div>
      </div>
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

