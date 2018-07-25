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
          <div>
            <p>Stylesheets</p>
            <p><a  href="#" onclick="changeCSS(event, \'https://dev-hello.sprucebot.com/skills.css\', 1);">Sprucebot</a></p>
            <p><a  href="#" onclick="changeCSS(event, \'https://ulta-stylesheets.sprucebot.com/theme.css\', 1);">Ulta</a></p>
            </div>
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
