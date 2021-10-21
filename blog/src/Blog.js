import React, {Component} from 'react';

class Blog extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
}

export default Blog;