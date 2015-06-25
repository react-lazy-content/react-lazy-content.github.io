import React from 'react';
import LazyContent from 'react-lazy-content';
import jQuery from 'jquery';

var endpoint = 'https://api.github.com/repos/facebook/react/commits';

var ComponentWithLazy = React.createClass({
  mixins: [LazyContent],

  getInitialState: function getInitialState() {
    return {content: 'loading...'};
  },

  render: function render() {
    return (
      <span>
        <h1>React LazyContent Demo</h1>
        <hr/>
        <div>Last commit from https://github.com/facebook/react :</div>
        <pre>
          <code data-lazy-loader='someService'>
            {this.state.content}
          </code>
        </pre>
      </span>
    );
  },

  componentDidMount: function() {
    this.mountLazyLoaders();
  },

  someServiceAPI: function someServiceAPI() {
    jQuery.get(endpoint, this.updateContent);
  },

  updateContent: function updateContent(data) {
    this.setState({content: data[0].commit.message});
  }
});

React.render(<ComponentWithLazy />, document.getElementById('app'));
