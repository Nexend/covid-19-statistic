import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import GlobalStatistic from './components/GlobalStatistic';
import CountryStatistic from './components/CountryStatistic';
import About from './components/About';

import PublicIcon from '@material-ui/icons/Public';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import InfoIcon from '@material-ui/icons/Info';

const App = () => {
  return (
    <Router>
      <div className="page">
        <div className="container">
          <Drawer style={{ width: '250px' }} variant="persistent" anchor="left" open={true}>
            <List>
              <Link to="/">
                <ListItem button>
                  <ListItemIcon>
                    <PublicIcon />
                    <ListItemText primary={'Global statistic'} />
                  </ListItemIcon>
                </ListItem>
              </Link>
              <Link to="/country-statistic">
                <ListItem button>
                  <ListItemIcon>
                    <EqualizerIcon />
                    <ListItemText primary={'Country statistic'} />
                  </ListItemIcon>
                </ListItem>
              </Link>
              <Link to="/about">
                <ListItem button>
                  <ListItemIcon>
                    <InfoIcon />
                    <ListItemText primary={'About'} />
                  </ListItemIcon>
                </ListItem>
              </Link>
            </List>
          </Drawer>
          <div className="content">
            <Switch>
              <Route exact path="/" component={GlobalStatistic} />
              <Route path="/country-statistic" component={CountryStatistic} />
              <Route path="/about" component={About} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
