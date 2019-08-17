# Spruce Skills Kit

Hey Skill Developer 👋.

If you're looking for information on building skills you should check out the [Developer Documentation](https://developer.spruce.ai/).

This repo contains the underlying packages used to build a skill and isn't needed directly if you're just doing skill development. But, if you need to get really close to the metal read on.

## Overview

This [lerna](https://github.com/lerna/lerna) monorepo contains several packages:

* `eslint-config-spruce`: Shared eslint configuration enforcing best practices and code style

* `eslint-plugin-spruce`: Shared eslint configuration enforcing best practices and code style

* `heartwood-components`: Our UI component library

* `react-heartwood-components`: React implementation of our UI components

* `spruce-next-helpers`: Shared / common utilities used for the Frontend (interface) side of a skill

* `spruce-node`: Wrapper around API calls and utility methods used from the Backend (server) side of a skill. The underlying package that powers `ctx.sb.<method>` calls

* `spruce-skill`: The base template for a skill. Based on [next.js](https://nextjs.org/)

* `spruce-skill-server`: Under the hood package that powers a skill. Built on [Koa](https://koajs.com/)

* `spruce-utils`: Various utilities used behind the scenes.

## Prerequisites

You'll need nodejs installed. [NVM (node version manager) is recommended](https://github.com/creationix/nvm).

You should also install the latest sprucebot CLI:

`npm i -g @sprucelabs/sprucebot-cli` or `yarn global add @sprucelabs/sprucebot-cli`

_Note: Some issues have been observed w/ certain versions of yarn where the cli will show errors when running "sprucebot". If you encounter this we recommend installing via npm instead_

## Setup

To work on Skills Kit you'll need to clone this repo and then:

*Set your nodejs version*

`nvm use`

*Install packages*

From the root of this project, install the packages:

`yarn`

*Build packages*

From the root of this project, build the packages:

`yarn build`

*Set up your .env*

`cd packages/spruce-skill`

`cp .env.example .env`

At this point you'll either need to manually edit the `.env` if you've previously registered the skill or use the cli to register your skill: `sprucebot skill register` and follow the prompts

*Run your skill*

`yarn local`

If everything went according to plan you've now got the base skill running linked to the other packages in this repo allowing you to make changes to the underlying packages used by Skills Kit!

## Troubleshooting

*I made a change in one of the linked packages but I don't see it updated in the browser?*

Oftentimes changes made in the linked packages will require a restart of the skill. Kill and re-run `yarn local`

## Additional links / info

We use [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) to link all these packages together during development on Skills Kit.