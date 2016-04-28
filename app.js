var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <UserInput />
      </div>
    );
  }
});

var UserInput = React.createClass({

  today: moment().format('MM/DD/YYYY'),

  render: function() {
    return (
      <div className="user-input">
        <div className="start-date">
          <label htmlFor="startDate">Start Date: </label>
          <input id="startDate" 
                 className="form-control"
                 defaultValue={this.today.toString()}/>
        </div>

        <div className="num-days">
          <label htmlFor="numDays">Number of days:</label>
          <input id="numDays"
                 className="form-control"
                 defaultValue="7" />
        </div>

        <div className="country-code">
          <label htmlFor="countryCode">Country Code:</label>
          <input id="countryCode"
                 className="form-control"
                 defaultValue="US" />
        </div>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));