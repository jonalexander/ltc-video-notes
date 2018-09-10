import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

const mapStateToProps = state => ({
  time: state.time,
});

const pad = (n) => n < 10 ? `0${n}` : n;

const Monospace = styled('div')`
  font-family: 'Source Code Pro', monospace;
  font-size: 22vw;
  text-align: center;
  width: 100%;
`;

const Deemphasized = styled('span')`
  color: var(--color-gray);
`;

class BigClock extends Component {
  render() {
    const date = new Date(this.props.time * 1000);
    const minutes = `${pad(date.getUTCMinutes())}m`;
    const seconds = `${pad(date.getUTCSeconds())}s`;

    return (
      <Monospace>
        {minutes}{'\u2005'}<Deemphasized>{seconds}</Deemphasized>
      </Monospace>
    );
  }
}

export default connect(
  mapStateToProps
)(BigClock);