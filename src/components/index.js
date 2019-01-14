import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import FeedPage from './FeedPage'
import DraftsPage from './DraftsPage'
import CreatePage from './CreatePage'
import DetailPage from './DetailPage'
import Nav from './Nav';


const Routes = () => (
  <Router>
  <React.Fragment>
    <Nav />
    <div className="fl w-100 pl4 pr4">
      <Switch>
        <Route exact path="/" component={FeedPage} />
        <Route path="/drafts" component={DraftsPage} />
        <Route path="/create" component={CreatePage} />
        <Route path="/post/:id" component={DetailPage} />
      </Switch>
    </div>
    </React.Fragment>
</Router>
);

// const Routes = () => <div>dfgd</div>

export default Routes;