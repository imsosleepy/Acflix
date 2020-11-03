import React, { Component } from 'react';
import Router from "./Router";
import GlobalStyles from "./GlobalStyles";

/*eslint-disable */
class App extends Component {
   
    render() {
      return (
        <>
          <Router />
          <GlobalStyles />
        </>
      )
  }
}

export default App;

/*eslint-enable */

