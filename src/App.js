import React, { Component } from 'react';
import { connect } from 'react-redux';
import ControlBar from './ControlBar';
import ProducerMode from './ProducerMode';
import InterviewerMode from './InterviewerMode';
import PausedMode from './PausedMode';
import UninitializedMode from './UninitializedMode';

const mapStateToProps = state => ({
  time: state.time,
  notes: state.notes,
});

class App extends Component {
  constructor(props) {
    super(props);

    this.producerMode = this.producerMode.bind(this);
    this.pausedMode = this.pausedMode.bind(this);

    this.state = {
      mode: 'uninitializedMode',
    }
  }

  componentDidMount() {
    if (this.props.time > 0) {
      this.pausedMode();
    }
  }

  componentDidUpdate(prevProps) {
    if ((this.state.mode === 'pausedMode' || this.state.mode === 'uninitializedMode') && prevProps.time !== this.props.time) {
      this.interviewerMode();
    }
  }

  uninitializedMode() {
    this.setState({
      mode: 'uninitializedMode',
    });
  }

  producerMode() {
    this.setState({
      mode: 'producerMode',
    });
  }

  interviewerMode() {
    this.setState({
      mode: 'interviewerMode',
    });
  }

  pausedMode() {
    this.setState({
      mode: 'pausedMode',
    });
  }

  render() {
    return (
      <div>
        {this.state.mode !== 'interviewerMode' &&
          <ControlBar
            mode={this.state.mode}
            time={this.props.time}
            onPlay={this.producerMode}
            onPause={this.pausedMode}
          />
        }

        {this.state.mode === 'uninitializedMode' &&
          <UninitializedMode />
        }

        {this.state.mode === 'producerMode' &&
          <ProducerMode
            time={this.props.time}
            notes={this.props.notes}
          />
        }

        {this.state.mode === 'interviewerMode' &&
          <InterviewerMode
            time={this.props.time}
            notes={this.props.notes}
          />
        }

        {this.state.mode === 'pausedMode' &&
          <PausedMode
            notes={this.props.notes}
          />
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(App);
