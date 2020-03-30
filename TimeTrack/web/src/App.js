import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timers: [],
      name: "",
      startTime: undefined,
      stopTime: undefined,
      minutes: ''
    };
  }

  loadTimers = () => {
    axios.get("http://localhost:8000/timers").then(response => {
      this.setState({
        timers: response.data
      });
    });
  };

  createTimer = () => {
    return axios.post("http://localhost:8000/timers", {
      name: this.state.name,
      time: Math.round((this.state.stopTime - this.state.startTime) / 1000)
    });
  };

  startTimer = () => {
    this.setState({startTime: Date.now()}); 
    this.interval = setInterval(() => {
      this.setState({
        seconds: Math.round((Date.now() - this.state.startTime) / 1000 ),
      });
    }, 100);
  }

  stopTimer = () => {
    this.setState({stopTime: Date.now()}, async () => {
      await this.createTimer();
      this.resetTimer();
      this.loadTimers();
      clearInterval(this.interval)
    }); 
  }

  resetTimer = () => {
    this.setState({
      name: '',
      startTime: undefined, 
      stopTime: undefined,
      seconds: '',
      minutes: ''
    });
  }

  onInputChange = event => {
    const name = event.currentTarget.value;
    this.setState({
      name: name
    });
  };

  componentDidMount() {
    this.loadTimers();
  }
 
  render() {
    return (
      <div id="container">
        <div><h1 className="siteName">timeTrack</h1></div>
        <input
          type="text"
          className="input"
          placeholder="Enter your name"
          value={this.state.name}
          onChange={this.onInputChange}
        />
        <h3>{this.state.seconds}</h3>
        <button className="btn" onClick={this.startTimer}>Start</button>
        <button className="btn" onClick={this.stopTimer}>Stop</button>
        <div>
        <div id="result" className="result">
        {this.state.timers.map(timer => <div key={timer.id}>
          <label id="userName" className="userName">{timer.name}: </label>
          <span id="timerOut" className="timeOut">{timer.time} seconds</span>
        </div>)}
        </div>
        </div>
      </div>
    );
  }
}

export default App;
