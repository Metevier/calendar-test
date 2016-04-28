
var App = React.createClass({

  today: moment().format('MM/DD/YYYY'),

  getInitialState: function () {
    return {
      startDate: this.today,
      numDays: 7,
      countryCode: 'US'
    }
  },

  render: function() {
    var startDate = this.state.startDate;
    var numDays = this.state.numDays;
    var countryCode = this.state.countryCode;
    return (
      <div className="app">
        <UserInput startDate={startDate}
                   numDays={numDays}
                   countryCode={countryCode}
                   updateField={this.updateField}/>
      </div>
    );
  },

  //Best way to do two way bindings in react
  updateField: function(field, event) {
    this.setState({
      [field]: event.target.value
    })
  }
});

var UserInput = React.createClass({
  render: function() {
    return (
      <div className="user-input">
        <div className="start-date">
          <label htmlFor="startDate">Start Date: </label>
          <input id="startDate"
                 className="form-control"
                 onChange={this.props.updateField.bind(null, 'startDate')}
                 value={this.props.startDate.toString()}/>
        </div>

        <div className="num-days">
          <label htmlFor="numDays">Number of days:</label>
          <input id="numDays"
                 className="form-control"
                 onChange={this.props.updateField.bind(null, 'numDays')}
                 value={this.props.numDays} />
        </div>

        <div className="country-code">
          <label htmlFor="countryCode">Country Code:</label>
          <input id="countryCode"
                 className="form-control"
                 onChange={this.props.updateField.bind(null, 'countryCode')}
                 value={this.props.countryCode} />
        </div>
      </div>
    );
  }
});

var Calendar = React.createClass({

  render: function() {
    return (
      <div></div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));