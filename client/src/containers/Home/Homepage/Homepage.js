import React, { Component } from 'react';
import './Homepage.css';
// Router and Route is never being called, but at the same time must not be deleted. If deleted, it thows an error.
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
// import { _login } from '../../../services/AuthService';
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { _loadProfile } from "../../../actions/userLoadActions";
import { _isLoggedIn } from '../../../actions/loggedInActions';
import Footer from '../../../components/Layout/Footer';
import Layout from '../../Layout';



class Homepage extends Component {



  componentDidMount = async () =>{
    // let isLoggedIn = await this.props._isLoggedIn(localStorage.getItem('token'));
    // if(isLoggedIn.message == "WrongToken"){

    // }
  

    // if (await this.props.userLoggedIn) {
    //   await this.props.history.push('/feed/deals');
    // }
  }

  render() {
    const { error, loading, userLoggedIn, visible } = this.props;
    // console.log(userLoggedIn);

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }
    
    return (
      <div>
        <Layout>
          <p id="homepage_title">Homepage</p>
        </Layout>
      </div>


    );
  }
}

const mapStateToProps = state => ({
  userLoggedIn: state.LoggedIn.userLoggedIn,
  error: state.LoggedIn.error,
  loading: state.LoggedIn.loading

});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({ _loadProfile, _isLoggedIn}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Homepage);
