import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Aside extends Component {
    render() {
        return (
            <div className="App__Aside">
                <div className="back_to_home"><Link to="/" id="back_to_home-text"><i className="fas fa-arrow-left" id="back-arrow"></i> <span>Home</span></Link></div>
                <img className="crypto-img img-fluid mb-5 d-block mx-auto" src="../../../assets/images/logo.png" alt="acceptmycrypto_logo"></img>
                <h1 className="text-uppercase mb-0">Accept My Crypto</h1>
                <hr className="star-light"></hr>
                <h2 className="font-weight-light mb-0">
                    <ul>
                    <br></br>
                    <li><i className="homepage-icons fas fa-dollar-sign"></i>
                        Grab Deals for Purchase with Cryptocurrency
                        </li>
                    <br></br>
                    <li><i className="homepage-icons fa fa-user" aria-hidden="true"></i>
                        Find Friends with Matching Currencies
                        </li>
                    <br></br>
                    <li><i className="homepage-icons fa fa-users" aria-hidden="true"></i>
                        Engage with Your Crypto Community
                        </li>
                    </ul>
                </h2>
            </div>
        );
    }
}

export default Aside;