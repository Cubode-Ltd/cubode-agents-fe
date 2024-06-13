import React from 'react';
import DatePicker from 'react-datepicker';

import '../../css/main.css';

class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <h1 className="text-2xl font-bold">Hello, React!</h1>
        <p>This is a React component inside a vanilla JS application.</p>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default TestComponent;