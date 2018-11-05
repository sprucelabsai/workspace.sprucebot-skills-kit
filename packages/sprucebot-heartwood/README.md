# Heartwood Components
Heartwood is a design system made of foundational decisions that ensure cohesion, allow for flexibility, and enable a smooth workflow.

## Goals
1. Translate static designs into live components built with HTML, CSS, and client-side JS
2. Generate styles to be used by React components in [React Sprucebot](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/tree/dev/packages/react-sprucebot)

## Setup
1. `git clone` this repo
2. `cd sprucebot-heartwood`
3. Install node modules: `nvm use && yarn`
4. Install Gulp and Fractal CLI tools installed globally: `yarn global @frctl/fractal && yarn global gulp-cli`

## Running the project locally
1. Start Fractal with `fractal start --sync`
2. Run Gulp to compile Sass to CSS: `gulp watch`

If you're running this project with `react-sprucebot`, you can pull in the local stylesheet by adding its url to `.env`, i.e. `STYLESHEETS=http://xxx.xxx.xxx:3000/stylesheets/global.css`.

## Contributing
1. New components should be added on feature branches, i.e. `feature/my-new-component`
2. Documentation updates (anything in the `doc` directory) should be added to `feature/documentation`
3. Open pull requests against `master`

## Deploying to Github Pages
1. Build Fractal as a static site: `fractal build`
2. Compile styles and js: `gulp styles && gulp js`
3. Run the deploy script: `yarn deploy`

## Usage
Install the node module: `yarn add @sprucelabs/heartwood-components`

### As Sass import (Recommended)
Import in Sass file:
```scss
@import ~@sprucelabs/heartwood-components/stylesheets/global.scss
```

Default variables can be overriden when the stylesheet is compiled. For example, to use red as a primary color:
```scss
$c-primary: red;

@import ~@sprucelabs/heartwood-components/stylesheets/global.scss
```

You can also selectively import parts of this library to keep your generated stylesheets smaller, i.e.
```scss
@import ~@sprucelabs/heartwood-components/stylesheets/core/core-styles;

@import ~@sprucelabs/heartwood-components/stylesheets/base/normalize;
@import ~@sprucelabs/heartwood-components/stylesheets/base/reset;
@import ~@sprucelabs/heartwood-components/stylesheets/base/base;
@import ~@sprucelabs/heartwood-components/stylesheets/base/utilities;
@import ~@sprucelabs/heartwood-components/stylesheets/base/type;

@import ~@sprucelabs/heartwood-components/components/01-button/button;
```
Note that when using this approach, you must import `stylesheets/core/core-styles` in order to import any component stylesheets.

### With Webpack
Import all styles: `import '@sprucelabs/heartwood-components/stylesheets/global.scss'`


## Additional Info
- [Heartwood Components in Figma](https://www.figma.com/file/I0By1hIW5Y6sEkMUKkGa9dRz/Heartwood-v1.1?node-id=2%3A19)
- [Fractal Docs](https://fractal.build/)
- [Gulp Docs](https://gulpjs.com/)