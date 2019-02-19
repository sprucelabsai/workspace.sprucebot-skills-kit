# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [8.11.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.10.1...v8.11.0) (2019-02-19)


### Bug Fixes

* add missing ioredis package to spruce-skill-server; fix reference to redis in gql subscription server ([bcefde3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/bcefde3))
* await next() in auth middleware ([244c7ea](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/244c7ea))


### Features

* add koa.context to GraphQLSubscriptionServer subscription context ([5f7ac4d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5f7ac4d))
* attach locationId, organizationId, and jwt to authV2 ([ebc50ef](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ebc50ef))
* Implement upload service for images along with example upload controller and Dropzone integration ([1b396f3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1b396f3))
* integrate gql client ([4cb714f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4cb714f))
* organization and location gql ([e18d641](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e18d641))
* pass ctx to sequelize models ([e298ae6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e298ae6))
* redis pubsub ([ba552f4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ba552f4))
* setToken for gql so auth does not need to be passed with each request ([f33be7b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f33be7b))
* Streamline builds and testing ([ea635b7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ea635b7))
* subscriptions from skill to external graphql server ([7524b32](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7524b32))
* uploads service method to delete file items ([5aa25ca](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5aa25ca))
* validate skill settings ([230082f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/230082f))
* view version ([1a758ef](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1a758ef))





## [8.10.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.10.0...v8.10.1) (2019-01-04)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





# [8.10.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.9.1...v8.10.0) (2019-01-03)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





## [8.9.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.9.0...v8.9.1) (2018-12-28)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





# [8.9.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.8.0...v8.9.0) (2018-12-28)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





# [8.8.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.7.0...v8.8.0) (2018-12-28)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





# [8.7.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.6.3...v8.7.0) (2018-12-28)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





## [8.6.3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.6.2...v8.6.3) (2018-12-26)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





## [8.6.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.6.1...v8.6.2) (2018-12-26)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





## [8.6.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.6.0...v8.6.1) (2018-12-21)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





# [8.6.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.5.4...v8.6.0) (2018-12-21)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





## [8.5.4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.5.3...v8.5.4) (2018-12-21)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





## [8.5.3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.5.2...v8.5.3) (2018-12-20)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





## [8.5.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.5.1...v8.5.2) (2018-12-20)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





## [8.5.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.5.0...v8.5.1) (2018-12-19)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





# [8.5.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.4.0...v8.5.0) (2018-12-19)


### Bug Fixes

* remove flow from config files and gql helpers so production build runs ([13c7fd9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/13c7fd9))


### Features

* GraphQL ([73e6066](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/73e6066))
* Users and UserLocations queries; gql enhancements ([2d68c37](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2d68c37))





# [8.4.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.3.4...v8.4.0) (2018-12-19)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





## [8.3.4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.3.3...v8.3.4) (2018-12-19)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





## [8.3.3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.3.2...v8.3.3) (2018-12-18)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





## [8.3.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.3.1...v8.3.2) (2018-12-18)


### Bug Fixes

* **prettier:** Use non-vscode config to configure prettier ([c5d8774](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c5d8774))





## [8.3.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.3.0...v8.3.1) (2018-12-16)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





# [8.3.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.2.1...v8.3.0) (2018-12-15)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





## [8.2.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.2.0...v8.2.1) (2018-12-14)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





# [8.2.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.1.5...v8.2.0) (2018-12-14)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





## [8.1.5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.1.4...v8.1.5) (2018-12-12)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





## [8.1.4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.1.3...v8.1.4) (2018-12-11)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





## [8.1.3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.1.2...v8.1.3) (2018-12-06)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





## [8.1.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.1.1...v8.1.2) (2018-12-05)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





## [8.1.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.1.0...v8.1.1) (2018-12-05)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





# [8.1.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.0.2...v8.1.0) (2018-11-30)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





## [8.0.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.0.1...v8.0.2) (2018-11-27)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





## [8.0.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.0.0...v8.0.1) (2018-11-27)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





# [8.0.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.9.1...v8.0.0) (2018-11-27)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





## [7.9.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.9.0...v7.9.1) (2018-11-27)

**Note:** Version bump only for package @sprucelabs/spruce-skill-server





# [7.9.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.8.3...v7.9.0) (2018-11-26)


### Features

* add error capture endpoint ([09564c5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/09564c5))





## [7.8.3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.8.2...v7.8.3) (2018-11-09)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





## [7.8.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.8.1...v7.8.2) (2018-11-07)


### Bug Fixes

* upgrade logger for better browser compatibility ([1340c04](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1340c04))





## [7.8.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.8.0...v7.8.1) (2018-11-07)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





# [7.8.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.7.3...v7.8.0) (2018-11-02)


### Features

* update logger / add LOG_USE_COLORS env var ([3ced1ed](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3ced1ed))





## [7.7.3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.7.2...v7.7.3) (2018-10-31)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





## [7.7.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.7.1...v7.7.2) (2018-10-24)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





## [7.7.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.7.0...v7.7.1) (2018-10-23)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





# [7.7.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.6.1...v7.7.0) (2018-10-23)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





## [7.6.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.6.0...v7.6.1) (2018-10-22)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





# [7.6.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.5.0...v7.6.0) (2018-10-21)


### Features

* Implement sprucebot logger and audit log ([3db6d36](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3db6d36))
* metrics log info for enabled/disabled features ([b139f7a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b139f7a))





# [7.5.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.4.4...v7.5.0) (2018-10-08)


### Features

* standardized caching ([49e5137](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/49e5137))





<a name="6.70.10"></a>
## [6.70.10](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.70.9...v6.70.10) (2018-09-16)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.70.9"></a>
## [6.70.9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.70.8...v6.70.9) (2018-09-15)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.70.8"></a>
## [6.70.8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.70.7...v6.70.8) (2018-09-14)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.70.7"></a>
## [6.70.7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.70.6...v6.70.7) (2018-09-14)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.70.6"></a>
## [6.70.6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.70.5...v6.70.6) (2018-09-13)


### Bug Fixes

* run migrations before sequelize.sync() ([561dd69](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/561dd69))





<a name="6.70.5"></a>
## [6.70.5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.70.4...v6.70.5) (2018-09-11)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.70.4"></a>
## [6.70.4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.70.3...v6.70.4) (2018-09-10)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.70.3"></a>
## [6.70.3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.70.2...v6.70.3) (2018-09-09)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.70.2"></a>
## [6.70.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.70.1...v6.70.2) (2018-09-08)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.70.1"></a>
## [6.70.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.70.0...v6.70.1) (2018-09-08)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.70.0"></a>
# [6.70.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.69.0...v6.70.0) (2018-09-07)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.69.0"></a>
# [6.69.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.68.0...v6.69.0) (2018-09-06)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.68.0"></a>
# [6.68.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.67.0...v6.68.0) (2018-09-04)


### Features

* add firstSentAt and deliveryTry ([ea63c4d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ea63c4d))





<a name="6.67.0"></a>
# [6.67.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.66.0...v6.67.0) (2018-09-04)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.66.0"></a>
# [6.66.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.65.2...v6.66.0) (2018-09-03)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.65.2"></a>
## [6.65.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.65.1...v6.65.2) (2018-08-30)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.65.1"></a>
## [6.65.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.65.0...v6.65.1) (2018-08-29)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.65.0"></a>
# [6.65.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.64.1...v6.65.0) (2018-08-28)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.64.1"></a>
## [6.64.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.64.0...v6.64.1) (2018-08-25)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.64.0"></a>
# [6.64.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.63.0...v6.64.0) (2018-08-24)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.63.0"></a>
# [6.63.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.62.0...v6.63.0) (2018-08-22)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.62.0"></a>
# [6.62.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.61.2...v6.62.0) (2018-08-20)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.61.2"></a>
## [6.61.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.61.1...v6.61.2) (2018-08-20)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.61.1"></a>
## [6.61.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.61.0...v6.61.1) (2018-08-18)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.61.0"></a>
# [6.61.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.60.0...v6.61.0) (2018-08-18)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.60.0"></a>
# [6.60.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.59.0...v6.60.0) (2018-08-17)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.59.0"></a>
# [6.59.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.58.0...v6.59.0) (2018-08-17)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.58.0"></a>
# [6.58.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.57.0...v6.58.0) (2018-08-17)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.57.0"></a>
# [6.57.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.56.0...v6.57.0) (2018-08-16)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.56.0"></a>
# [6.56.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.55.1...v6.56.0) (2018-08-16)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.55.1"></a>
## [6.55.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.55.0...v6.55.1) (2018-08-16)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.55.0"></a>
# [6.55.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.54.1...v6.55.0) (2018-08-16)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.54.1"></a>
## [6.54.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.54.0...v6.54.1) (2018-08-14)

**Note:** Version bump only for package @sprucelabs/sprucebot-skills-kit-server





<a name="6.54.0"></a>
# [6.54.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.40.0...v6.54.0) (2018-08-14)


### Features

* circleci; relaxed commit messages; new deploy process ([a40c970](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a40c970))





<a name="6.18.0"></a>
# [6.18.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.17.0...v6.18.0) (2018-07-11)


### Features

* import fix ([e0fcd11](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e0fcd11))





<a name="6.16.0"></a>
# [6.16.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.15.1...v6.16.0) (2018-07-11)


### Features

* slug fix ([91ad752](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/91ad752))





<a name="6.15.0"></a>
# [6.15.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.14.0...v6.15.0) (2018-07-11)


### Bug Fixes

* typo ([7b5f56d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7b5f56d))


### Features

* sharable components ([fcd4943](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fcd4943))





<a name="6.14.0"></a>
# [6.14.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.13.0...v6.14.0) (2018-07-09)


### Features

* Latest components and functionality ([8dd2623](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8dd2623))





<a name="6.7.0"></a>
# [6.7.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.6.1...v6.7.0) (2018-06-27)


### Features

* **SPRUC-925:** Nuclear option; squash all the commits ([#76](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/76)) ([63485cc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/63485cc))





<a name="6.6.0"></a>
# [6.6.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.5.0...v6.6.0) (2018-04-27)


### Features

* **SB-1333:** onboarding completion is checked server-side ([#59](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/59)) ([0d17316](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0d17316))





<a name="6.4.2"></a>
## [6.4.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.4.1...v6.4.2) (2018-04-11)

**Note:** Version bump only for package sprucebot-skills-kit-server





<a name="6.4.0"></a>
# [6.4.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.3.0...v6.4.0) (2018-04-08)


### Bug Fixes

* **SB-1263:** remove sprucebot version leak ([#48](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/48)) ([cf6b7c5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/cf6b7c5))
