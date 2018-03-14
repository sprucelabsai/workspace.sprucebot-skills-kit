# workspace.sprucebot-skills-kit
Lerna workspace for managing skills kit dependencies

```
├── node_modules/
├── packages
│   ├── sprucebot-skills-kit
│   ├── sprucebot-skills-kit-server
│   ├── sprucebot-node
│   └── react-sprucebot
├── CHANGELOG.md
├── README.md
├── lerna.json
├── package.json
└── yarn.lock
```

## Setup
1. `git clone` this repo
1. `cd workspace.sprucebot-skills-kit`
1. `git clone` the repos defined in `package.json.workspaces[**]` *TODO - sprucebot-cli could do this for us and setup upstream branches etc*
1. `yarn install` to install all the dependencies defined in all the cloned workspaces
1. `cd packages/sprucebot-skills-kit && sprucebot skill register`
1. `cd ../../`
1. `yarn local` to start the skills kit using pm2

## Workspace Scripts Available
* `yarn local` - Start the pm2 ecosystem that starts the skills kit
* `yarn log` - Tail the pm2 ecosystem log
* `yarn stop` - Stop the skills kit server from `yarn local`