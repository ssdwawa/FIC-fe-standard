import React, { Component } from 'react';

import RootRoute from 'pages/rootRoute/index';
import 'common/index.scss';
class App extends Component {
  render() {
    return (
      <div className="App">
        <RootRoute />
      </div>
    );
  }
}

export default App;
