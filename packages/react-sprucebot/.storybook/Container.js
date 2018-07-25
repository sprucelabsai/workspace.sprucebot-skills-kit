import React, { Component } from 'react';

export default class Container extends Component {
  render() {
    const { story } = this.props;

    return (
      <React.StrictMode>
        <div
          data-floating-menu-container
          role="main"
          className="wf-active storybook-container" // NOTE: This tricks icons into appearing
          style={{
            padding: '3em',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          {story()}
        </div>
        <input
          aria-label="input-text-offleft"
          type="text"
          className="bx--visually-hidden"
        />
      </React.StrictMode>
    );
  }
}
