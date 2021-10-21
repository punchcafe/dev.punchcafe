
import './App.css';
import Blog from './Blog.js';
import BarWrapper from './BarWrapper';
import React, {Component} from 'react';


class App extends React.Component {
  render() {
    return (
    <div>
      <BarWrapper />
      <Blog name="punchcafe"/>
    </div>
    );
  }
}

export default App;
