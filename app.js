var App = React.createClass({
  render: function() {
    return (
      <div className="app">{moment().toString()}</div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));