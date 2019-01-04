# Sprucebot for React [![Build Status](https://travis-ci.org/sprucelabsai/react-sprucebot.svg?branch=master)](https://travis-ci.org/sprucelabsai/react-sprucebot)

[![Greenkeeper badge](https://badges.greenkeeper.io/sprucelabsai/react-sprucebot.svg)](https://greenkeeper.io/)

## Goals

1. Translate vanilla components from [Sprucebot Heartwood](https://github.com/sprucelabsai/sprucebot-heartwood) into React components for use in web.

## Setup

1. Follow the instructions for the workspace
2. Add Storybook CLI tool globally: `yarn global @storybook/cli`

## Running Storybook locally

1. From `packages/react-heartwood-components`, run `yarn storybook`
2. If you need to load additional stylesheets, i.e. from `sprucebot-heartwood`, you can specify them in `.env` as `STYLESHEETS`

## Adding stories

Any `.js` file that ends with `-story.js` will be automatically added to Storybook.

## Usage in Skills

1. Add the current prerelease version: `yarn add @sprucelabs/react-heartwood-components@8.x.x`
2. Import components:

```js
import { Button } from '@sprucelabs/react-heartwood-components'
```

## React Docgen

This project uses [React Docgen](https://github.com/reactjs/react-docgen) via [Storybook Info Addon](https://github.com/storybooks/storybook/tree/master/addons/info) to autogenerate documentation from Flow declarations and comments.

To add a description to a prop, write a comment above it:

```js
type Props = {
	/** This is the component's title */
	title: string
}
```

This will add it to the description cell in the props table.

## Contributing

TBD — This is currently a prerelease

## Deploying Storybook as a static site

TBD

## Additional Info

- [Heartwood Components in Fractal](https://dev.sprucebot.com)
- [Heartwood Components in Figma](https://www.figma.com/file/I0By1hIW5Y6sEkMUKkGa9dRz/Heartwood-v1.1?node-id=2%3A19)
- [React Storybook](https://storybook.js.org/)
