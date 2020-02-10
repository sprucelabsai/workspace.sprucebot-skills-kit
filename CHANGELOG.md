# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [7.10.4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.10.3...v7.10.4) (2020-02-10)

**Note:** Version bump only for package workspace.sprucebot-skills-kit





## [7.10.3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.10.2...v7.10.3) (2019-12-05)


### Bug Fixes

* DateSelect not refreshing isDayBlocked properly ([cf76bf6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/cf76bf6))





## [7.10.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.10.1...v7.10.2) (2019-08-08)

**Note:** Version bump only for package workspace.sprucebot-skills-kit





## [7.10.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.10.0...v7.10.1) (2019-07-10)


### Bug Fixes

* [SDEV3-1847] allow scrolling in legacy views when rendered in heartwood web ([c63a00a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c63a00a))


### Refactoring

* add position relative to heartwood legacy page views ([3f06ca6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3f06ca6))





# [7.10.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.8.3...v7.10.0) (2019-03-21)


### Bug Fixes

* linter errors ([0387f2f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0387f2f))
* manually bump package versions to fix ci build ([f219879](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f219879))
* Remove busted tarballs from yarn.lock ([efda8a5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/efda8a5))
* update circleci config for v7 releases ([44d9d0f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/44d9d0f))


### Features

* allow date to be deselected in DateSelect ([0179991](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0179991))





## [7.8.3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.8.2...v7.8.3) (2018-11-09)


### Bug Fixes

* Implement NextJS _app.js, remove title from _document.js ([5f46b2c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5f46b2c))





## [7.8.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.8.1...v7.8.2) (2018-11-07)


### Bug Fixes

* upgrade logger for better browser compatibility ([1340c04](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1340c04))





## [7.8.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.8.0...v7.8.1) (2018-11-07)


### Bug Fixes

* Remove broken association for Organization model ([a4c2c29](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a4c2c29))





# [7.8.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.7.3...v7.8.0) (2018-11-02)


### Bug Fixes

* prevent 404 on debug trigger event when there are no responses ([5458ac1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5458ac1))


### Features

* update logger / add LOG_USE_COLORS env var ([3ced1ed](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3ced1ed))





## [7.7.3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.7.2...v7.7.3) (2018-10-31)


### Bug Fixes

* swagger doc should generate after sprucebot-skills-kit-server initalized ([38d097c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/38d097c))





## [7.7.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.7.1...v7.7.2) (2018-10-24)


### Testing

* mock global logger ([a9dbb15](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a9dbb15))





## [7.7.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.7.0...v7.7.1) (2018-10-23)

**Note:** Version bump only for package workspace.sprucebot-skills-kit





# [7.7.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.6.1...v7.7.0) (2018-10-23)


### Features

* browser metrics; make ctx.sb.audit handle its own error and no await ([c9b0cf0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c9b0cf0))





## [7.6.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.6.0...v7.6.1) (2018-10-22)


### Bug Fixes

* remove duplicate in config ([45e5ccc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/45e5ccc))





# [7.6.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.5.0...v7.6.0) (2018-10-21)


### Documentation

* Add audit logging doc with example usage ([fd3f607](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fd3f607))
* update .env example ([e1c9726](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e1c9726))


### Features

* Implement sprucebot logger and audit log ([3db6d36](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3db6d36))
* metrics log info for enabled/disabled features ([b139f7a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b139f7a))





# [7.5.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.4.4...v7.5.0) (2018-10-08)


### Features

* standardized caching ([49e5137](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/49e5137))





<a name="6.70.10"></a>
## [6.70.10](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.70.9...v6.70.10) (2018-09-16)


### Bug Fixes

* missed file ([f24978c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f24978c))
* time format ([864b498](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/864b498))





<a name="6.70.9"></a>
## [6.70.9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.70.8...v6.70.9) (2018-09-15)


### Bug Fixes

* add toggle-mode class to toggle-show-working button to fix styling ([2a67544](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2a67544))





<a name="6.70.8"></a>
## [6.70.8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.70.7...v6.70.8) (2018-09-14)


### Bug Fixes

* tool tip not 24 hours ([fb25fad](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fb25fad))





<a name="6.70.7"></a>
## [6.70.7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.70.6...v6.70.7) (2018-09-14)


### Bug Fixes

* hover on time slot ([5ad4510](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5ad4510))





<a name="6.70.6"></a>
## [6.70.6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.70.5...v6.70.6) (2018-09-13)


### Bug Fixes

* run migrations before sequelize.sync() ([561dd69](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/561dd69))





<a name="6.70.5"></a>
## [6.70.5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.70.4...v6.70.5) (2018-09-11)


### Bug Fixes

* is_ios on body class ([e2b8124](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e2b8124))





<a name="6.70.4"></a>
## [6.70.4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.70.3...v6.70.4) (2018-09-10)


### Bug Fixes

* remove log ([43fd351](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/43fd351))





<a name="6.70.3"></a>
## [6.70.3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.70.2...v6.70.3) (2018-09-09)


### Bug Fixes

* default to team schedule, better handling of resize and teammate loading ([6740faa](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6740faa))





<a name="6.70.2"></a>
## [6.70.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.70.1...v6.70.2) (2018-09-08)

**Note:** Version bump only for package workspace.sprucebot-skills-kit





<a name="6.70.1"></a>
## [6.70.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.70.0...v6.70.1) (2018-09-08)


### Bug Fixes

* show working ([879a79a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/879a79a))





<a name="6.70.0"></a>
# [6.70.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.69.0...v6.70.0) (2018-09-07)


### Features

* big cal tweaks ([c0c9fdc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c0c9fdc))





<a name="6.69.0"></a>
# [6.69.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.68.0...v6.69.0) (2018-09-06)


### Bug Fixes

* Adjust drag/resize condtional check ([075a11c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/075a11c))
* Remove unneeded check in handleToggleMode ([399dabf](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/399dabf))


### Features

* Add ability to switch to team and user from selectedTeammate ([f8aa203](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f8aa203))
* Add ability to toggle BigCalendar to selected teammate ([1dc7add](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1dc7add))
* Adjust class selectors for select teammate elements ([b87bd2b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b87bd2b))
* Disable drag/resize for week/month views ([3e88906](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3e88906))
* Pass single teammate as array to skills ([efa8913](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/efa8913))





<a name="6.68.0"></a>
# [6.68.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.67.0...v6.68.0) (2018-09-04)


### Features

* add firstSentAt and deliveryTry ([ea63c4d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ea63c4d))





<a name="6.67.0"></a>
# [6.67.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.66.0...v6.67.0) (2018-09-04)


### Features

* add timeout to sb emit methods ([f7f3ca1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f7f3ca1))





<a name="6.66.0"></a>
# [6.66.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.65.2...v6.66.0) (2018-09-03)


### Bug Fixes

* to pass circle ci ([5dd1e87](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5dd1e87))


### Features

* avatar edit ([4870c49](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4870c49))
* calendar knows teamschedule ([896b9fc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/896b9fc))
* team schedule support in big calendar ([7c493cc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7c493cc))





<a name="6.65.2"></a>
## [6.65.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.65.1...v6.65.2) (2018-08-30)


### Bug Fixes

* classnames not being output on tabs ([8a9073f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8a9073f))





<a name="6.65.1"></a>
## [6.65.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.65.0...v6.65.1) (2018-08-29)

**Note:** Version bump only for package workspace.sprucebot-skills-kit





<a name="6.65.0"></a>
# [6.65.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.64.1...v6.65.0) (2018-08-28)


### Features

* Build windowOrDocument method ([0c3e206](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0c3e206))





<a name="6.64.1"></a>
## [6.64.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.64.0...v6.64.1) (2018-08-25)

**Note:** Version bump only for package workspace.sprucebot-skills-kit





<a name="6.64.0"></a>
# [6.64.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.63.0...v6.64.0) (2018-08-24)


### Bug Fixes

* Adjust DateSelect copy in BigCalendar ([1673c5b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1673c5b))
* Remove date from calendarProps ([55171e3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/55171e3))
* Remove passed timezone prop to Calendar ([2fb41dc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2fb41dc))


### Features

* Adjust timezone conversion; set today to string ([9fc0665](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9fc0665))
* Refine isOutsideRange; set today to string; remove timezone checks ([639a30a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/639a30a))
* Set today in CDM for defaultDate; add formattedMin/Max for timezone ([bf900b3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/bf900b3))
* Use timezone w/selectedDate, pass timezone to DateSelect, set min/max to strings ([c354056](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c354056))





<a name="6.63.0"></a>
# [6.63.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.62.0...v6.63.0) (2018-08-22)


### Features

* adding device type check class to body ([beb52ad](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/beb52ad))





<a name="6.62.0"></a>
# [6.62.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.61.2...v6.62.0) (2018-08-20)


### Bug Fixes

* Fix linting ([1506d76](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1506d76))


### Features

* Add timezone functionality to DateRangeSelect ([9643d0f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9643d0f))
* Add timezone functionality to DateSelect ([321ccf3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/321ccf3))





<a name="6.61.2"></a>
## [6.61.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.61.1...v6.61.2) (2018-08-20)


### Bug Fixes

* Remove delay from handleChangeView that was causing render issues ([fd051b0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fd051b0))





<a name="6.61.1"></a>
## [6.61.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.61.0...v6.61.1) (2018-08-18)

**Note:** Version bump only for package workspace.sprucebot-skills-kit





<a name="6.61.0"></a>
# [6.61.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.60.0...v6.61.0) (2018-08-18)


### Features

* event listening through iframe messages, implimented did-update-user as example and only check authed user ([3488346](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3488346))
* missed new files ([1c3e6b1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1c3e6b1))





<a name="6.60.0"></a>
# [6.60.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.59.0...v6.60.0) (2018-08-17)


### Features

* only edit where explicitely set ([7da6c67](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7da6c67))
* only edit where explicitely set ([3713baf](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3713baf))





<a name="6.59.0"></a>
# [6.59.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.58.0...v6.59.0) (2018-08-17)


### Features

* class fix ([30001dc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/30001dc))





<a name="6.58.0"></a>
# [6.58.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.57.0...v6.58.0) (2018-08-17)


### Features

* avatar clicks ([afa0f42](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/afa0f42))
* avatar clicks ([07e28c6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/07e28c6))





<a name="6.57.0"></a>
# [6.57.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.56.0...v6.57.0) (2018-08-16)


### Features

* Implement getNow to use store timezone ([e472437](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e472437))
* Pass currentDate, timezone to Calendar ([256682f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/256682f))
* Use timezone/currentDate for correct defaultDate ([d9c96b6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d9c96b6))





<a name="6.56.0"></a>
# [6.56.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.55.1...v6.56.0) (2018-08-16)


### Features

* sticky header click ([0ffd564](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0ffd564))





<a name="6.55.1"></a>
## [6.55.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.55.0...v6.55.1) (2018-08-16)


### Bug Fixes

* remove border from calendar events to make theming easier ([ca83a99](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ca83a99))





<a name="6.55.0"></a>
# [6.55.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.54.1...v6.55.0) (2018-08-16)


### Features

* firefox fix ([b52d9c9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b52d9c9))





<a name="6.54.1"></a>
## [6.54.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.54.0...v6.54.1) (2018-08-14)

**Note:** Version bump only for package workspace.sprucebot-skills-kit





<a name="6.54.0"></a>
# [6.54.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.40.0...v6.54.0) (2018-08-14)


### Bug Fixes

* **SB-1639:** load client config from proper location ([2482cea](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2482cea))
* Adjust initialVisibleMonth to callback; fix typo ([45e1aa4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/45e1aa4))
* Fix awful linting ([b6a5121](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b6a5121))
* remove selected state styling from calendar events ([749f1ea](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/749f1ea))
* timezones and calendars oh my ([89ca2c7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/89ca2c7))


### Features

* Add DateSelect control button ([81463c5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/81463c5))
* Add optionsLoaded/checkOptions to skip fetch if options present ([f68fbd5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f68fbd5))
* add SortableList and SortableListItem components to List ([682c8f4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/682c8f4))
* Adjus start/endAccessor for all day events ([4f57750](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4f57750))
* Allow timeRange to check start/end of evebnts ([66077ea](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/66077ea))
* big cal fixes ([27b635b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/27b635b))
* big calendar loaders ([e6ee591](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e6ee591))
* Build DateSelect dialog for BigCalendar ([ab91462](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ab91462))
* build miss ([97be52a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/97be52a))
* Build setDate; set Tabs component ref ([11b8277](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/11b8277))
* Build setSelected in Tabs component ([8d81457](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8d81457))
* Build setView/Mod methods; pass options to handleClickOpenSlot ([023c92c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/023c92c))
* bump ([ecf7c6f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ecf7c6f))
* calendar ([4a983f4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4a983f4))
* calendar event clicking passthrough ([f72680b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f72680b))
* calendar event clicking passthrough ([1592a0b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1592a0b))
* calendar progress ([c88b258](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c88b258))
* calendar tweaks ([5e9629d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5e9629d))
* circleci; relaxed commit messages; new deploy process ([a40c970](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a40c970))
* fetching class ([1cced47](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1cced47))
* Filter through events for min/max time; set default caps ([d093f70](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d093f70))
* loader outer wrapper ([d31a4f7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d31a4f7))
* loader outer wrapper ([5d9c76a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5d9c76a))
* loader outer wrapper ([817e978](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/817e978))
* many people in calendar, dialog fix ([0347f87](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0347f87))
* missed fullscreen ([954e059](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/954e059))
* no debugger idiot ([a888cec](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a888cec))
* optimizations ([1688b13](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1688b13))
* Pass dom event with handleOnClick ([f71df3e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f71df3e))
* Pass options for handleClickEvent ([848b1e3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/848b1e3))
* Pass teammateId in calendar action ([0c09af9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0c09af9))
* selectable fix ([d822b4b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d822b4b))
* underlay support in core ([5d0d7cc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5d0d7cc))





<a name="6.40.0"></a>
# [6.40.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.39.0...v6.40.0) (2018-08-02)


### Features

* avatar fix for base64 images ([e212c6b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e212c6b))





<a name="6.39.0"></a>
# [6.39.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.38.0...v6.39.0) (2018-08-01)


### Features

* Add click events to HorizontalWeek ([595dc66](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/595dc66))
* Add timezone to selectedDate in generatePagerTitle ([e6d3425](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e6d3425))
* Check for availableDates, remove default prop DateRangeSelect ([b0ceb82](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b0ceb82))
* Check for availableDates, remove default prop DateSelect ([7ace40f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7ace40f))
* Pass mode/view with handleClickEvent ([ee7b882](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ee7b882))
* Pass teammate onSelectEvent, format Today for pager ([185d95f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/185d95f))





<a name="6.38.0"></a>
# [6.38.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.37.0...v6.38.0) (2018-07-31)


### Bug Fixes

* Calendar timezone issues ([0162296](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0162296))
* Filter allday events by day ([b0e1c43](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b0e1c43))
* Pass onNavigate to Calendar ([f9111ea](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f9111ea))
* remove show prop on dialogs ([dda4861](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/dda4861))
* update test snap ([d4fd72e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d4fd72e))


### Features

* Add check for isUniversalEvent ([8550ecf](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8550ecf))





<a name="6.37.0"></a>
# [6.37.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.36.0...v6.37.0) (2018-07-31)


### Features

* sizing whoas ([#164](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/164)) ([aa3dff3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/aa3dff3))





<a name="6.36.0"></a>
# [6.36.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.35.0...v6.36.0) (2018-07-30)


### Features

* Add showStep/Jump to Pager ([f2e1ba4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f2e1ba4))
* change fix ([24f6416](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/24f6416))
* generatePagerTitle, handlePagerChange, currentUser, popup ([f23053e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f23053e))
* Redine days block, default props in DateRangeSelect ([3eb7615](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3eb7615))
* Refine days blocked in DateSelect ([f821cc4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f821cc4))





<a name="6.35.0"></a>
# [6.35.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.30.0...v6.35.0) (2018-07-30)


### Bug Fixes

* Adjust default prop for DateSelect ([5148a64](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5148a64))
* button ([cdf24bb](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/cdf24bb))
* dialog being immediately hidden ([e31badf](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e31badf))
* Fix BigCalendar linting ([aedf99a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/aedf99a))
* remove console log ([25fdecd](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/25fdecd))
* Remove thunk from withStore ([20376a6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/20376a6))
* Reposition jwt assignment ([940c6d7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/940c6d7))
* sizing on initial render of multiline inputs ([e78e960](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e78e960))
* Update event structure template ([edc02ed](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/edc02ed))
* Update snapshot ([2f47344](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2f47344))


### Features

* Add calendar actions, add to index.js ([2c945af](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2c945af))
* Add cancelation to calendars actions ([14b5497](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/14b5497))
* Add cancelToken to apiClient ([0bb5450](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0bb5450))
* Add DND styles to Calendar component ([e0ab5bd](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e0ab5bd))
* Add es6-tween dependency ([0e23b95](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0e23b95))
* Add new methods to BigCalendar ([1a8c619](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1a8c619))
* Build calendar actions/reducers ([34b1065](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/34b1065))
* Export BigCalendar component ([2f8a019](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2f8a019))
* markup updates for styling big calendar ([f7fd332](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f7fd332))
* Pass event to canDrag/canResize ([ca17bfa](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ca17bfa))
* Pass teammate onClickOpenSlot; add disable drag/resize ([e91e141](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e91e141))
* progress ([2ff3ed3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2ff3ed3))
* recover ([6546035](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6546035))
* scroll by, scroll to, dialog styling ([897a5a8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/897a5a8))
* Transfer BigCalendar/HorizontalWeek ([2ed7491](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2ed7491))





<a name="6.30.0"></a>
# [6.30.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.29.0...v6.30.0) (2018-07-26)


### Bug Fixes

* dialog error when rendered on page load ([9412771](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9412771))
* next router link error ([7732a20](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7732a20))


### Features

* button fallback ([e7ff508](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e7ff508))





<a name="6.29.0"></a>
# [6.29.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.28.0...v6.29.0) (2018-07-26)


### Bug Fixes

* Update calendar action query ([e43f054](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e43f054))


### Features

* Add calendar actions, add to index.js ([d270af1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d270af1))
* Build calendar actions/reducers ([edf8a04](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/edf8a04))





<a name="6.28.0"></a>
# [6.28.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.27.0...v6.28.0) (2018-07-25)


### Features

* actions can return a function ([8017ecb](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8017ecb))





<a name="6.27.0"></a>
# [6.27.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.26.0...v6.27.0) (2018-07-25)


### Features

* finalizing multi-dialog functionality ([e763628](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e763628))
* portal dialogs outside of components to prevent z-index issues ([628fccb](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/628fccb))





<a name="6.26.0"></a>
# [6.26.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.25.0...v6.26.0) (2018-07-25)


### Features

* help button ([23027bb](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/23027bb))





<a name="6.25.0"></a>
# [6.25.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.24.0...v6.25.0) (2018-07-24)


### Features

* button updates ([11e8e3a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/11e8e3a))





<a name="6.24.0"></a>
# [6.24.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.23.0...v6.24.0) (2018-07-24)


### Bug Fixes

* classnames not being passed to list item component ([a995582](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a995582))


### Features

* next/router integration ([ead6a24](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ead6a24))





<a name="6.23.0"></a>
# [6.23.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.22.0...v6.23.0) (2018-07-24)


### Features

* Add methods for creating locations ([81b8fbd](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/81b8fbd))





<a name="6.22.0"></a>
# [6.22.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.21.0...v6.22.0) (2018-07-23)


### Bug Fixes

* patching tests ([aac140f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/aac140f))


### Features

* progress ([8c372ef](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8c372ef))





<a name="6.21.0"></a>
# [6.21.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.20.0...v6.21.0) (2018-07-20)


### Bug Fixes

* Get user (global / enterprise) route incorrect ([765e62a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/765e62a))
* Remove alias for react from next.config.js ([5a1a228](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5a1a228))


### Features

* Metadata support ([40ea1ef](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/40ea1ef))





<a name="6.20.0"></a>
# [6.20.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.19.0...v6.20.0) (2018-07-19)


### Features

* missed compiled component ([b57309a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b57309a))
* removing styled components ([f91b9cc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f91b9cc))
* update snapshots ([436d160](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/436d160))





<a name="6.19.0"></a>
# [6.19.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.18.1...v6.19.0) (2018-07-17)


### Features

* messages to core ([e5eee79](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e5eee79))





<a name="6.18.1"></a>
## [6.18.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.18.0...v6.18.1) (2018-07-11)


### Bug Fixes

* skill not resizing after dialog hidden ([d68a60a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d68a60a))





<a name="6.18.0"></a>
# [6.18.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.17.0...v6.18.0) (2018-07-11)


### Bug Fixes

* Calendar class typo ([a29340b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a29340b))
* Remove CL ([2d71738](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2d71738))


### Features

* import fix ([e0fcd11](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e0fcd11))





<a name="6.17.0"></a>
# [6.17.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.16.0...v6.17.0) (2018-07-11)


### Features

* logging test ([f02e53f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f02e53f))
* style test ([90f744f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/90f744f))





<a name="6.16.0"></a>
# [6.16.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.15.1...v6.16.0) (2018-07-11)


### Features

* slug fix ([91ad752](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/91ad752))





<a name="6.15.1"></a>
## [6.15.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.15.0...v6.15.1) (2018-07-11)


### Bug Fixes

* Only import babel-polyfill once ([5686a11](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5686a11))





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





<a name="6.13.0"></a>
# [6.13.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.12.2...v6.13.0) (2018-07-06)


### Features

* dialog outside of SB ([7381b2c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7381b2c))





<a name="6.12.2"></a>
## [6.12.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.12.1...v6.12.2) (2018-07-06)


### Bug Fixes

* search and dialog ([#105](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/105)) ([0ea6180](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0ea6180))





<a name="6.12.1"></a>
## [6.12.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.12.0...v6.12.1) (2018-07-04)


### Bug Fixes

* default showing dialog ([#103](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/103)) ([c9a2c17](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c9a2c17))





<a name="6.12.0"></a>
# [6.12.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.11.0...v6.12.0) (2018-07-03)


### Bug Fixes

* search against org passthrough of roles and locationId ([b54a694](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b54a694))


### Features

* search, skill window events, input, training guide scroll ([7ef85f1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7ef85f1))





<a name="6.11.0"></a>
# [6.11.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.10.0...v6.11.0) (2018-07-03)


### Features

* search org id ([#97](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/97)) ([4cc05bb](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4cc05bb))





<a name="6.10.0"></a>
# [6.10.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.9.0...v6.10.0) (2018-07-03)


### Features

* search, skill window events, input, training guide scroll ([bfee353](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/bfee353))





<a name="6.9.0"></a>
# [6.9.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.8.0...v6.9.0) (2018-06-27)


### Features

* type button ([7ae2f2d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7ae2f2d))





<a name="6.8.0"></a>
# [6.8.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.7.0...v6.8.0) (2018-06-27)


### Features

* props passthrough, lang changes ([#87](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/87)) ([081a82c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/081a82c))





<a name="6.7.0"></a>
# [6.7.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.6.1...v6.7.0) (2018-06-27)


### Bug Fixes

* Add eventContract to skills kit config ([#81](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/81)) ([762f5d8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/762f5d8))


### Features

* **SPRUC-925:** Nuclear option; squash all the commits ([#76](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/76)) ([63485cc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/63485cc))
* responsive, feed updates, deprecation warnings removed ([#84](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/84)) ([e5b76a4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e5b76a4))





<a name="6.6.1"></a>
## [6.6.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.6.0...v6.6.1) (2018-06-14)


### Bug Fixes

* **sb-1361:** imagecropper now respects crop props aspect ([#61](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/61)) ([6bdde2b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6bdde2b))
* **SB-1461:** classes for switches are same as core ([#69](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/69)) ([d252529](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d252529))
* **SB-1515:** add role to metas query ([#70](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/70)) ([1cbe88e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1cbe88e))
* **SB-1651:** url trails ([c1cad7a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c1cad7a))
* **SB-413:** can no longer spam buttons on imagecropper ([#68](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/68)) ([f43d249](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f43d249))
* **SB-692:** fix occasional error where input.style came in undefined ([#60](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/60)) ([2f34b66](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2f34b66))


### Features

* **SB-1323:** force skills dev to implement  will-send-training event ([#55](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/55)) ([f55eb73](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f55eb73))
* **SB-1333:** onboarding completion is checked server-side ([#59](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/59)) ([15b47a1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/15b47a1))
* **SB-1448:** adds /public route and page to skills kit ([34deaa7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/34deaa7))
* **SB-1448:** REVERT adds /public route and page to skills kit ([#67](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/67)) ([7367f1e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7367f1e))





<a name="6.6.0"></a>
# [6.6.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.5.0...v6.6.0) (2018-04-27)


### Bug Fixes

* **SB-1461:** classes for switches are same as core ([#69](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/69)) ([f25054e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f25054e))
* **SB-1515:** add role to metas query ([#70](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/70)) ([d45b6c4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d45b6c4))
* **SB-413:** can no longer spam buttons on imagecropper ([#68](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/68)) ([93b8def](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/93b8def))


### Features

* **SB-1333:** onboarding completion is checked server-side ([#59](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/59)) ([0d17316](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0d17316))
* **SB-1448:** adds /public route and page to skills kit ([734bdf3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/734bdf3))
* **SB-1448:** REVERT adds /public route and page to skills kit ([#67](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/67)) ([edfd0c7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/edfd0c7))





<a name="6.5.0"></a>
# [6.5.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.4.2...v6.5.0) (2018-04-18)


### Bug Fixes

* **sb-1361:** imagecropper now respects crop props aspect ([#61](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/61)) ([3025262](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3025262))
* **SB-692:** fix occasional error where input.style came in undefined ([#60](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/60)) ([c804f38](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c804f38))


### Features

* **SB-1323:** force skills dev to implement  will-send-training event ([#55](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/55)) ([a00d8fe](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a00d8fe))





<a name="6.4.2"></a>
## [6.4.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.4.1...v6.4.2) (2018-04-11)

**Note:** Version bump only for package workspace.sprucebot-skills-kit





<a name="6.4.1"></a>
## [6.4.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.4.0...v6.4.1) (2018-04-10)


### Bug Fixes

* **SB-941:** handle response errors and add unit tests ([#52](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/52)) ([54d5697](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/54d5697))





<a name="6.4.0"></a>
# [6.4.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.3.0...v6.4.0) (2018-04-08)


### Bug Fixes

* **SB-1263:** remove sprucebot version leak ([#48](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/48)) ([cf6b7c5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/cf6b7c5))
* **SB-941:** post was not working after switch to axios ([#50](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/50)) ([238bf94](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/238bf94))
* **SB-966:** remove html and props errors ([#47](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/47)) ([42a3cf4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/42a3cf4))


### Features

* **SB-941:** skills kit ships with network mock harness ([2575ca3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2575ca3))





<a name="6.3.0"></a>
# [6.3.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.2.1...v6.3.0) (2018-04-03)


### Features

* **SB-918:** refactor dialog to use flexbox and scrollto ([#44](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/44)) ([#45](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/45)) ([677c7e1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/677c7e1))





<a name="6.2.1"></a>
## [6.2.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.2.0...v6.2.1) (2018-04-03)


### Bug Fixes

* **SB-792:** can upload a new image for ios 9 ([#40](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/40)) ([e4a8c07](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e4a8c07))





<a name="6.2.0"></a>

# [6.2.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.1.0...v6.2.0) (2018-03-28)

### Bug Fixes

* **SB-1130:** fix exif orientation of uploaded images ([#26](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/26)) ([46f877e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/46f877e))
* **SB-315:** cropping stops when moved outside of iframe ([#31](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/31)) ([50f5383](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/50f5383))
* **SB-594:** onboarding component scrolls with the "next" cta ([#36](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/36)) ([f3d42cd](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f3d42cd))
* **sb-792:** React Image cropper update busted our component ([#38](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/38)) ([bfc1570](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/bfc1570))
* **SB-886:** fix extended text box for teammate reviews ([#28](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/28)) ([32a8dcb](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/32a8dcb))

### Features

* **SB-1312:** add static prop check to remove click/hover ([#37](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/37)) ([e48e551](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e48e551))
* **SB-910:** add skill.scrollto method ([#33](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/33)) ([d59c702](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d59c702))

<a name="6.1.0"></a>

# [6.1.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.0.0...v6.1.0) (2018-03-23)

### Bug Fixes

* **SB-1135:** prepublish command runs on every install ([58ee6f9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/58ee6f9))
* **sb-792:** Cors enabled images were unable to load ([cdc9fa2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/cdc9fa2))

### Features

* **SB-889:** add sequelizerc to work with cli ([91945e7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/91945e7))

<a name="6.0.0"></a>

# 6.0.0 (2018-03-22)

### Bug Fixes

* **package:** update react-sprucebot to version 0.13.0 ([#73](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/73)) ([d2e17a0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d2e17a0))
* **package:** update sprucebot-node to version 0.5.0 ([2b4250f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2b4250f))
* **package:** update sprucebot-node to version 0.5.0 ([67826ff](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/67826ff))
* **package:** update sprucebot-skills-kit-server to version 1.0.0 ([81124cf](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/81124cf))
* add updated package links to projects ([a4ecb97](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a4ecb97))
* **package:** update sprucebot-skills-kit-server to version 2.0.0 ([#72](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/72)) ([421b8f7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/421b8f7))
* **package:** update styled-components to version 3.2.0 ([#68](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/68)) ([0c10489](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0c10489)), closes [#50](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/50)
* **sb-1112:** add yarn commit command to proxy to commitizen ([#6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/6)) ([102f89f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/102f89f))
* **sb-915:** added a sample service and utility test ([c181316](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c181316))
* pm2 package is production dependency ([067814f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/067814f))
* travis build removed from projects ([eaf24da](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/eaf24da))

### Chores

* breaking change to bump version ([a9ae011](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a9ae011))
* remove pull request templates from each package ([83ed5d0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/83ed5d0))
* update npm keywords ([#3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/3)) ([be9af45](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/be9af45))

### Features

* **sb-1112:** add commitlint to enforce semver commit messages ([fb86c22](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fb86c22))
* **SB-1112:** use lerna publish instead of semantic-release ([e6aeac3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e6aeac3))
* **SB-910:** add skill.scrolltotop method ([766cfba](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/766cfba))
* **SB-937:** add error component to react-sprucebot and styleguide ([b9e632e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b9e632e))
* **SB-939:** adds redux-form compatible components ([8235c57](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8235c57))
* **SB-940:** add onboarding component to react-sprucebot and styleguide ([c4cdb6d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c4cdb6d))

### BREAKING CHANGES

* trigger major build
* triggering marjor version bump
* changed build stage name

<a name="5.2.0"></a>

# [5.2.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v5.1.0...v5.2.0) (2018-03-21)

### Features

* **SB-937:** add error component to react-sprucebot and styleguide ([f1f2c39](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f1f2c39))

<a name="5.1.0"></a>

# [5.1.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v5.0.1...v5.1.0) (2018-03-20)

### Features

* **SB-940:** add onboarding component to react-sprucebot and styleguide ([347d6d3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/347d6d3))

<a name="5.0.1"></a>

## [5.0.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v5.0.0...v5.0.1) (2018-03-20)

**Note:** Version bump only for package workspace.sprucebot-skills-kit

<a name="5.0.0"></a>

# 5.0.0 (2018-03-20)

### Bug Fixes

* **package:** update react-sprucebot to version 0.13.0 ([#73](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/73)) ([d2e17a0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d2e17a0))
* **package:** update sprucebot-node to version 0.5.0 ([2b4250f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2b4250f))
* **package:** update sprucebot-node to version 0.5.0 ([67826ff](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/67826ff))
* **package:** update sprucebot-skills-kit-server to version 1.0.0 ([81124cf](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/81124cf))
* add updated package links to projects ([a4ecb97](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a4ecb97))
* **package:** update sprucebot-skills-kit-server to version 2.0.0 ([#72](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/72)) ([421b8f7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/421b8f7))
* **package:** update styled-components to version 3.2.0 ([#68](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/68)) ([0c10489](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0c10489)), closes [#50](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/50)
* **sb-1112:** add yarn commit command to proxy to commitizen ([#6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/6)) ([102f89f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/102f89f))
* **sb-915:** added a sample service and utility test ([45a8576](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/45a8576))
* pm2 package is production dependency ([152644e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/152644e))
* travis build removed from projects ([eaf24da](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/eaf24da))

### Chores

* breaking change to bump version ([a9ae011](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a9ae011))
* remove pull request templates from each package ([83ed5d0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/83ed5d0))
* update npm keywords ([#3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/3)) ([be9af45](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/be9af45))

### Features

* **sb-1112:** add commitlint to enforce semver commit messages ([fb86c22](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fb86c22))
* **SB-1112:** use lerna publish instead of semantic-release ([42f845f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/42f845f))
* **SB-910:** add skill.scrolltotop method ([eee8c32](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/eee8c32))

### BREAKING CHANGES

* trigger major build
* triggering marjor version bump
* changed build stage name

<a name="4.0.0"></a>

# [4.0.0](https://github.com/mcdermed/workspace.sprucebot-skills-kit/compare/v3.0.0...v4.0.0) (2018-03-20)

### Bug Fixes

* add updated package links to projects ([a4ecb97](https://github.com/mcdermed/workspace.sprucebot-skills-kit/commit/a4ecb97))
* **sb-1112:** add yarn commit command to proxy to commitizen ([#6](https://github.com/mcdermed/workspace.sprucebot-skills-kit/issues/6)) ([102f89f](https://github.com/mcdermed/workspace.sprucebot-skills-kit/commit/102f89f))
* pm2 package is production dependency ([152644e](https://github.com/mcdermed/workspace.sprucebot-skills-kit/commit/152644e))
* travis build removed from projects ([eaf24da](https://github.com/mcdermed/workspace.sprucebot-skills-kit/commit/eaf24da))
* **sb-915:** added a sample service and utility test ([45a8576](https://github.com/mcdermed/workspace.sprucebot-skills-kit/commit/45a8576))

### Chores

* breaking change to bump version ([a9ae011](https://github.com/mcdermed/workspace.sprucebot-skills-kit/commit/a9ae011))
* remove pull request templates from each package ([83ed5d0](https://github.com/mcdermed/workspace.sprucebot-skills-kit/commit/83ed5d0))
* update npm keywords ([#3](https://github.com/mcdermed/workspace.sprucebot-skills-kit/issues/3)) ([be9af45](https://github.com/mcdermed/workspace.sprucebot-skills-kit/commit/be9af45))

### Features

* **sb-1112:** add commitlint to enforce semver commit messages ([fb86c22](https://github.com/mcdermed/workspace.sprucebot-skills-kit/commit/fb86c22))
* **SB-1112:** use lerna publish instead of semantic-release ([42f845f](https://github.com/mcdermed/workspace.sprucebot-skills-kit/commit/42f845f))

### BREAKING CHANGES

* trigger major build
* triggering marjor version bump
* changed build stage name
