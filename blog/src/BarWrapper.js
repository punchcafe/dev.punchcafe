import PunchCafeBar from './PunchCafeBar.js';
import React, {Component, useRef, useEffect} from 'react';


class BarWrapper extends React.Component {

    constructor(props) {
        super(props);
        setInterval(() => {
            this.forceUpdate();
        }, 200);
    }

    render() {

      return (
      <div>
        <PunchCafeBar />
      </div>
      );
    }
  }
  export default BarWrapper;
  
