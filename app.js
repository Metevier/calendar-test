
var App = React.createClass({

  today: moment().startOf('day').format('MM/DD/YYYY').toString(),

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
        <Calendar startDate={startDate}
                  numDays={numDays}
                  countryCode={countryCode}/>
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
                 value={this.props.startDate}/>
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
    var months = this.seedCalendar(this.props.startDate, this.props.numDays, this.props.countryCode);
    console.log(months);
    return (
      <div>

      </div>
    );
  },

  //Here we will do most of our logic
  seedCalendar: function (startDate, numDays, countryCode) {
    var startMoment = moment(new Date(startDate)); //Transform string into moment object
    var endMoment = moment(startMoment).add(numDays - 1, 'days'); //Subtract 1 because we need a number not a range.
    var numMonths = Math.ceil(endMoment.diff(startMoment, 'months', true)) + 1; //Add 1 because we need a range
    
    //Get start and end for each month in between the start and end period
    var months = [];
    for (var i = 0; i < numMonths; i++) {
      var month = {};
      var monthMoment = moment(startMoment).startOf('month').add(i, 'months'); //Get the next month

      //We check if the month and year are the same as the start or end date,
      //if so we set that month to have the same start or end date, respectively
      if (startMoment.isSame(monthMoment, 'year') && startMoment.isSame(monthMoment, 'month')) {
        month.startMoment = startMoment;
      } else {
        month.startMoment = moment(monthMoment).startOf('month');
      }

      if (endMoment.isSame(monthMoment, 'year') && endMoment.isSame(monthMoment, 'month')) {
        month.endMoment = endMoment;
      } else {
        month.endMoment = moment(monthMoment).endOf('month');
      }

      months.push(month);
    }
    return months;
  }
});

var CalendarMonth = React.createClass({

  render: function() {
    return (
      <div></div>
    );
  }
});

var CalendarRow = React.createClass({

  render: function() {
    return (
      <div></div>
    );
  }
});

var CalendarCell = React.createClass({

  render: function() {
    return (
      <div></div>
    );
  }
});



ReactDOM.render(<App />, document.getElementById('app'));