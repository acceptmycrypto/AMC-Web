import React, { Component } from "react";
import { BrowserRouter as Switch, Route, Link, Redirect } from "react-router-dom";
import SignUp from "./containers/Home/SignUp";
import SignIn from "./containers/Home/SignIn";
import ResendEmail from "./containers/Home/ResendEmail";
import ResetPassword from "./containers/Home/ResetPassword";
import ResetPasswordEmail from "./containers/Home/ResetPasswordEmail";
import Profile from "./containers/Profile/UserProfile";
import Settings from "./containers/UserSettings/Settings";
import Homepage from "./containers/Home/Homepage";
import SearchDeals from "./containers/Deals/SearchDeals";
import FeedDeals from "./containers/Deals";
import DealItem from "./containers/Deals/DealItem";
import Reviews from "./containers/Reviews";
import ListDeal from "./containers/ListDeal";

// import Layout from "./components/Layout";


import "./App.css";

class App extends Component {
  render() {
    return (
        <Switch>
          <div className="fullHeight">
            {/* <Layout /> */}
              <Route exact path="/" component={Homepage} />
              <Route exact path="/SignIn" component={SignIn} />
              <Route exact path="/SignUp" component={SignUp} />
              <Route exact path="/ResendEmail" component={ResendEmail} />
              <Route exact path="/ResetPasswordEmail" component={ResetPasswordEmail} />
              <Route path="/ResetPassword/:token" component={ResetPassword}/>
              <Route exact path="/profile" component={Profile} />


              <Route exact path ="/settings" component={Settings} />
              <Route exact path="/crypto" component={Crypto} />

              <Route path="/category" render={(props) => <SearchDeals {...props} pageType="category" /> }/>
              <Route path="/Search" render={(props) => <SearchDeals {...props} pageType="search" /> }/>
              <Route exact path="/feed/deals" component={FeedDeals} />

              <Route path="/feed/deals/:id/:deal_name" component={DealItem}/>
              <Route path="/api/reviews/sellers/:seller_id" component={Reviews}/>
              <Route exact path="/listdeal" component={ListDeal}/>



              {/* this will redirect none of the matched above Routes to the root route (when not logged in root route is sign in page and when logged in root route is deals page)  */}
              {/* additionally when not logged in this will not allow user to access any sites other than sign in or sign up */}
              {/* <Redirect to="/"/> */}

            {/* <Layout /> */}
          </div>
        </Switch>
    );
  }
}

export default App;
