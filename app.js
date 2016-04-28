
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
    var months = this.seedMonths(this.props.startDate, this.props.numDays, this.props.countryCode);
    return (
      <div className="calendar">
        <div className="day-name">
          <div className="cell">S</div>
          <div className="cell">M</div>
          <div className="cell">T</div>
          <div className="cell">W</div>
          <div className="cell">T</div>
          <div className="cell">F</div>
          <div className="cell">S</div>
        </div>
        {months.map(function(month, i) {
          return <CalendarMonth month={month} key={i} />
        })}
      </div>
    );
  },

  //Here we will do most of our logic
  seedMonths: function (startDate, numDays, countryCode) {
    var startMoment = moment(new Date(startDate)); //Transform string into moment object
    var endMoment = moment(startMoment).add(numDays - 1, 'days'); //Subtract 1 because we need a number not a range.
    //Figure out number of months in range
    var numMonths = (endMoment.month() + endMoment.year() * 12) - (startMoment.month() + startMoment.year() * 12) + 1;

    //Get start and end for each month in between the start and end period
    var months = [];
    for (var i = 0; i < numMonths; i++) {
      var month = {};
      var monthMoment = moment(startMoment).startOf('month').add(i, 'months'); //Get the next month

      //We check if the month and year are the same as the start or end date,
      //if so we set that month to have the same start or end date, respectively
      if (startMoment.isSame(monthMoment, 'year') && startMoment.isSame(monthMoment, 'month')) {
        month.startMoment = moment(startMoment);
      } else {
        month.startMoment = moment(monthMoment).startOf('month');
      }

      if (endMoment.isSame(monthMoment, 'year') && endMoment.isSame(monthMoment, 'month')) {
        month.endMoment = moment(endMoment);
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
    var month = this.props.month;
    var weeks = this.seedWeeks(month.startMoment, month.endMoment);
    return (
      <div className="month">
        <div className="month-name">{this.props.month.startMoment.format('MMMM YYYY')}</div>
        {weeks.map(function(week, i) {
          return <CalendarRow week={week} key={i} />
        })}
      </div>
    );
  },

  seedWeeks: function (startMoment, endMoment) {
    //Diff between start of week of start range and end of week of end range to give us number of weeks to display
    var numWeeks = Math.ceil(moment(endMoment).endOf('week').diff(moment(startMoment).startOf('week'), 'weeks', true));
    //Get start and end for each week in between the start and end period
    var weeks = [];
    for (var i = 0; i < numWeeks; i++) {
      var week = {};
      var weekMoment = moment(startMoment).startOf('week').add(i, 'weeks'); //Get the next week

      //We check if the week and year are the same as the start or end date,
      //if so we set that week to have the same start or end date, respectively
      if (startMoment.isAfter(moment(weekMoment))) {
        week.startMoment = moment(startMoment);
      } else {
        week.startMoment = moment(weekMoment).startOf('week');
      }

      if (endMoment.isBefore(moment(weekMoment).endOf('week'))) {
        week.endMoment = moment(endMoment);
      } else {
        week.endMoment = moment(weekMoment).endOf('week');
      }

      weeks.push(week);
    }
    return weeks;
  }
});

var CalendarRow = React.createClass({

  render: function() {
    var week = this.props.week;
    var days = this.seedDays(week.startMoment, week.endMoment);
    return (
      <div className="week">
        {days.map(function(day, i) {
          return <CalendarCell day={day} key={i} />
        })}
      </div>
    );
  },

  seedDays: function (startMoment, endMoment) {
    var days = [];
    for (var i = 0; i < 7; i++) {
      var day = {};
      if (startMoment.day() <= i && i <= endMoment.day()){
        day.dayOfMonth = moment(startMoment).day(i).date(); //gets day of month for day of week
        if (i === 0 || i === 6) {
          day.weekend = true;
        }
      }
      days.push(day);
    }
    return(days);
  }
});

var CalendarCell = React.createClass({

  render: function() {
    var day = this.props.day;
    var className = 'day cell';
    if (!day.dayOfMonth) {
      className += ' invalid'
    }
    if (day.weekend) {
      className += ' weekend'
    }
    return (
      <div className={className}>
        {day.dayOfMonth}
      </div>
    );
  }
});



ReactDOM.render(<App />, document.getElementById('app'));