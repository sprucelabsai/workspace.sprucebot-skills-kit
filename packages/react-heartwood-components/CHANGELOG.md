# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [8.13.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.12.0...v8.13.0) (2019-03-20)


### Bug Fixes

* remove unnecessary import ([41f8479](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/41f8479))
* **BigCalendar:** Prep for usage in core web ([11505db](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/11505db))
* **RecordTable:** Paginators should only be displayed when 2 or more pages of data are available [[SBL-2111](https://sprucelabsai.atlassian.net/browse/SBL-2111)] ([4a20cc5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4a20cc5))
* **RecordTable:** Paginators should only be displayed when 2 or more pages of data are available [[SBL-2111](https://sprucelabsai.atlassian.net/browse/SBL-2111)] ([eca550a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/eca550a))
* **view/page:** Properly scope zIndex for page panels ([723c64e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/723c64e))


### Features

* **modals:** Add passthrough method for setAppElement ([1a08498](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1a08498))
* **RecordTable:** RecordTable now supports an EmptyState instance for failed API fetches [[SBL-2094](https://sprucelabsai.atlassian.net/browse/SBL-2094)] ([d2aa0a1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d2aa0a1))
* **RecordTable:** Support for custom button kinds and icons ([25bc1d9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/25bc1d9))
* **sidebar:** Add mobile-only prop for sidebar sections ([6e5dd07](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6e5dd07))
* **view:** Switch to a flexbox-based layout ([fa37d1c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fa37d1c))


### Refactoring

* **datePicker:** hide keyboard shortcuts panel ([5c9190c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5c9190c))
* **datePicker:** style updates ([9538319](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9538319))
* **loader:** add isCentered prop to center loader in parent [[SBL-2236](https://sprucelabsai.atlassian.net/browse/SBL-2236)] ([682b509](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/682b509))
* **loader:** add isLight prop [[SBL-2236](https://sprucelabsai.atlassian.net/browse/SBL-2236)] ([211064a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/211064a))
* **phoneInput:** update package and export formatPhoneNumberIntl ([64494d8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/64494d8))
* **select:** add optional placeholder for Select components ([42cf11c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/42cf11c))
* fix lint error ([71a33e8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/71a33e8))





# [8.12.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.11.0...v8.12.0) (2019-02-27)


### Bug Fixes

* **EmptyState:** exports Empty State component ([ae7fd4f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ae7fd4f))
* **Table:** Correct busted logic that was breaking pagination ([4a249b0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4a249b0)), closes [#379](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/379)


### Features

* **EmptyState:** Adds new default for Empty State [[SBL-1996](https://sprucelabsai.atlassian.net/browse/SBL-1996)], new Empty State for filtered Record Tables [[SBL-2093](https://sprucelabsai.atlassian.net/browse/SBL-2093)], new Storybook stories for Empty State ([5f9e5f2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5f9e5f2))
* **RecordSelectionList:** Support arbitrary data with getRecordId ([51d475d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/51d475d))


### Refactoring

* **BigCalendar-story:** Uses the Toast component instead of alert ([1f3ec14](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1f3ec14))
* **Table:** Sane default for the Empty State primary action button icon instead of the refresh icon ([a611052](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a611052))





# [8.11.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.10.1...v8.11.0) (2019-02-19)


### Bug Fixes

* Add .editorconfigs targetting all files ([dd2bfa3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/dd2bfa3))
* Address stack overflows on larger lists ([aa5a814](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/aa5a814))
* Checkbox component not passing event through ([1e34cb2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1e34cb2))
* Only include style prop into DragGrid root div ([329e51a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/329e51a))
* **flow:** React Heartwood, correct corrected flow config ([355efa1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/355efa1))
* **fontloader:** Repair deps, remove reference to storybook in component ([d61ba10](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d61ba10))
* **tables:** Basic style for no records label, hide "loading" loader state ([5a8f237](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5a8f237))
* **tables:** Disable autocomplete by default on checkboxes ([a3758c5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a3758c5))


### Features

* access toasts from state so that they are unique ([4ef2421](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4ef2421))
* add ability to include settings list ([e2b3aac](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e2b3aac))
* add component ([6f369b3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6f369b3))
* add component and story ([245b177](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/245b177))
* add date headers ([8df0bd8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8df0bd8))
* add date range select to DatePicker ([3877c8d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3877c8d))
* add example fields in page context ([28c52a3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/28c52a3))
* add example of full card ([b95bc31](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b95bc31))
* add example of the feed builder ([192ced9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/192ced9))
* add example with validation ([0beeec3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0beeec3))
* add FormBuilder component ([19b8128](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/19b8128))
* add Formik ([f5fa714](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f5fa714))
* add isSmall prop to ContextMenu ([f689ac9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f689ac9))
* add modal option ([a47d54c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a47d54c))
* add more props ([31928c5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/31928c5))
* add props ([fd987f5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fd987f5))
* add random message generator ([b560245](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b560245))
* add react-virtualized ([0a34c2a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0a34c2a))
* add savebar when kind is page ([58ffe54](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/58ffe54))
* add section component for sidebar layouts with cards ([9d630b4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9d630b4))
* add sections for form as page ([0255659](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0255659))
* add sidebar header ([6540966](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6540966))
* add todo note ([691f3d9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/691f3d9))
* add type annotations ([05a8d80](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/05a8d80))
* add unique id from sender ([1d98958](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1d98958))
* add validation examples to page example ([cac0552](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/cac0552))
* adjust width rules and layout ([24d4cfc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/24d4cfc))
* allow to pass toggle props through list item ([2e91f4f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2e91f4f))
* annotate props ([e1ed31c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e1ed31c))
* better rendering of toasts when one is removed ([cc07b81](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/cc07b81))
* better timeout cleanup ([b863938](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b863938))
* chaange pageHeader to header in PageHeader ([0cee055](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0cee055))
* change onUndo to followupAction ([84bb28b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/84bb28b))
* **EmptyState:** Empty State React component [[SBL-1982](https://sprucelabsai.atlassian.net/browse/SBL-1982)] ([ff05492](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ff05492))
* **flow:** Fix react-heartwood-components ([a58b36b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a58b36b))
* **flow:** Fix react-heartwood-components ([14c0f59](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/14c0f59))
* **record-selection-list:** static vs async record provision ([49da796](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/49da796))
* **RecordSelection:** Support checkboxes, radios & removal of records ([b4adc33](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b4adc33))
* **RecordSelectionList:** Allow for "unselectable" records ([1c8de7b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1c8de7b))
* **RecordSelectList:** Add async search capability ([51fa5dd](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/51fa5dd))
* make toast timeouts work ([2b5562d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2b5562d))
* **RecordTable:** Empty State defaults for RecordTable [[SBL-1996](https://sprucelabsai.atlassian.net/browse/SBL-1996)] ([a02ee51](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a02ee51))
* convert ToastWrapper to a component ([75a6ea1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/75a6ea1))
* correct images ([2152d63](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2152d63))
* correct keying for dynamic components ([3caf0a2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3caf0a2))
* default sidebar to expanded ([3598957](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3598957))
* ensure that list stops loading when it should ([72faf78](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/72faf78))
* export FontLoader correctly ([8f260f7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8f260f7))
* **tables:** Add reusable RecordTable to react-heartwood ([cfcc647](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/cfcc647))
* fix image removal with new from strategy ([59701d7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/59701d7))
* fix lint errors ([1b37b43](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1b37b43))
* fix stories ([e682407](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e682407))
* fix tabs styling ([e95ff34](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e95ff34))
* format empty text ([8f74852](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8f74852))
* handle visibility toggles on mobile ([c4102fa](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c4102fa))
* hide sidebar children ([fd7cc84](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fd7cc84))
* hook up modal ([18435a8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/18435a8))
* hook up reset form on discard changes ([2da90e0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2da90e0))
* Implement upload service for images along with example upload controller and Dropzone integration ([1b396f3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1b396f3))
* import flow types for form layouts ([d01451e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d01451e))
* improve date header formatting ([012f1f4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/012f1f4))
* improve row loading performance ([02555da](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/02555da))
* improve spacing props ([1eeb40f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1eeb40f))
* latest iteration that simulates loading in of new messages ([b8a9a95](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b8a9a95))
* make fields required ([794f60d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/794f60d))
* make follow up text configurable ([c584bb1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c584bb1))
* make savebar set form submitting to true ([b804b83](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b804b83))
* make submit work on enter ([204d39f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/204d39f))
* make view responsible for hiding sidebars on resize ([7d22a2f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7d22a2f))
* merge and resolve conflicts ([e01dea6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e01dea6))
* minor fixes ([6438138](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6438138))
* pull out FormInner into own component ([620a0f2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/620a0f2))
* put sidebar items in a sidebar section ([1c0c0a9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1c0c0a9))
* remove all references to messageCount ([2fa8b8a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2fa8b8a))
* remove done to avoid lint error ([75f08db](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/75f08db))
* remove log ([04e0774](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/04e0774))
* remove log ([6025363](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6025363))
* remove log ([1a81b3e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1a81b3e))
* remove log ([c9a1dd6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c9a1dd6))
* remove spread operators ([e1abb79](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e1abb79))
* **spruce-skill:** Add example of requesting that Core show a toast ([995b5e1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/995b5e1))
* **spruce-skill:** Support Skill View Dialogs in Core ([8516ad0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8516ad0))
* update on resize ([f2578c6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f2578c6))
* **tables:** Add concept of totalRows ([2d37253](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2d37253))
* remove unneeded initialvalues ([1e1d3d6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1e1d3d6))
* rename cards back to sections for clarity ([6266862](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6266862))
* rename sections to cards ([e29288f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e29288f))
* resolve conflict ([f9e13c1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f9e13c1))
* set position and dimensions for scrolling ([646c64e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/646c64e))
* start adding a settings page example ([3cb13e5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3cb13e5))
* start checking for date headers ([026730b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/026730b))
* start looping ([0d23e2c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0d23e2c))
* start styling ([c58ebd7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c58ebd7))
* Streamline builds and testing ([ea635b7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ea635b7))
* styling ([3b7a179](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3b7a179))
* temp hide scroll jack ([147ed40](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/147ed40))
* update addons order ([01e210a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/01e210a))
* update basic example ([cc77e43](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/cc77e43))
* update components to support design for profile pages ([95d9999](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/95d9999))
* update example layout ([64e5386](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/64e5386))
* update story ([73412ee](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/73412ee))
* update styles and start hooking up new props ([9e357a5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9e357a5))
* use rowCount to trigger loading ([7a43f9d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7a43f9d))
* use spread to pass id through to LayoutSection for deep linking ([1856883](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1856883))


### Refactoring

* **pagedModal:** clean up code ([ebb6a55](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ebb6a55))
* fix type of toast ID ([923c4e7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/923c4e7))
* **pagedModal:** fix styling so title is centered only on paged modals ([9bef17a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9bef17a))
* **pagedModal:** pass required isFullHeight prop to PagedModal ([a9b3f83](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a9b3f83))
* **recordSelectionList:** pass back selected record ([619dc66](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/619dc66))





## [8.10.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.10.0...v8.10.1) (2019-01-04)

**Note:** Version bump only for package @sprucelabs/react-heartwood-components





# [8.10.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.9.1...v8.10.0) (2019-01-03)


### Features

* add font loader to storybook ([c672b3e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c672b3e))
* add fontfaceobserver ([2ebc604](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2ebc604))
* export fontloader ([27ab97f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/27ab97f))
* fix text overflow ([81ad157](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/81ad157))
* hook up fontloader component and add toggleable css to handle FOIT ([27001ea](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/27001ea))
* hook up state and listeneres for location menu ([87f3026](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/87f3026))
* improve responsiveness ([d4cd4a9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d4cd4a9))
* logging ([b5e49fb](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b5e49fb))
* move location menu into own component ([b5e9cf6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b5e9cf6))
* snap location menu to correct position ([b27571c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b27571c))
* verify that fontloader works in calendar ([c176d43](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c176d43))





## [8.9.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.9.0...v8.9.1) (2018-12-28)

**Note:** Version bump only for package @sprucelabs/react-heartwood-components





# [8.9.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.8.0...v8.9.0) (2018-12-28)


### Features

* add onSelected callback ([3e3248b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3e3248b))
* correct padding on header tabs ([fa3f149](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fa3f149))





# [8.8.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.7.0...v8.8.0) (2018-12-28)


### Features

* add props and styles for bottom border ([77ede06](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/77ede06))
* add skill view example ([1384e5b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1384e5b))
* add support for tabs in page header ([c7ec484](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c7ec484))
* add variations ([918b677](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/918b677))
* change element from div to main ([4fc3632](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4fc3632))
* change main back to div ([c162929](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c162929))
* give page the capacity to render header on its own ([ee18376](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ee18376))
* merge latest, fix conflict ([581e480](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/581e480))
* show icon in onboarding card tab ([52fd623](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/52fd623))
* styling ([aa41aa9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/aa41aa9))
* tabs in header styling ([e4632f5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e4632f5))
* work better with layout components ([441c6df](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/441c6df))





# [8.7.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.6.3...v8.7.0) (2018-12-28)


### Features

* add classes for overflow ([a3fcbe1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a3fcbe1))
* fix prettier errors ([231d76c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/231d76c))
* fix prettier errors ([d6bf66f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d6bf66f))
* get the rights to be hidden on initial render and update on window resize ([51d1fc1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/51d1fc1))
* make tab truncation controllable to prevent it with onboarding cards ([71f2a43](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/71f2a43))
* pass hidden tabs into context menu ([09ff5cb](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/09ff5cb))
* prevent active tab from getting hidden in context menu ([650d9ed](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/650d9ed))





## [8.6.3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.6.2...v8.6.3) (2018-12-26)

**Note:** Version bump only for package @sprucelabs/react-heartwood-components





## [8.6.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.6.1...v8.6.2) (2018-12-26)

**Note:** Version bump only for package @sprucelabs/react-heartwood-components





## [8.6.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.6.0...v8.6.1) (2018-12-21)

**Note:** Version bump only for package @sprucelabs/react-heartwood-components





# [8.6.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.5.4...v8.6.0) (2018-12-21)


### Features

* make element configurable and pass props to rendered element ([e83ec66](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e83ec66))





## [8.5.4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.5.3...v8.5.4) (2018-12-21)

**Note:** Version bump only for package @sprucelabs/react-heartwood-components





## [8.5.3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.5.2...v8.5.3) (2018-12-20)


### Bug Fixes

* missed table ([e0c85c0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e0c85c0))





## [8.5.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.5.1...v8.5.2) (2018-12-20)


### Bug Fixes

* **icons:** Don't die if the icon can't be found ([7fba61d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7fba61d))





## [8.5.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.5.0...v8.5.1) (2018-12-19)


### Bug Fixes

* [SBL-1568](https://sprucelabsai.atlassian.net/browse/SBL-1568) hide event title overflow ([aa1d47e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/aa1d47e))





# [8.5.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.4.0...v8.5.0) (2018-12-19)

**Note:** Version bump only for package @sprucelabs/react-heartwood-components





# [8.4.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.3.4...v8.4.0) (2018-12-19)


### Features

* add bulk actions ([ee9a5f0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ee9a5f0))
* add checkboxes with ids ([a5053a1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a5053a1))
* add example with filters ([4d52ce6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4d52ce6))
* add faker ([8e473eb](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8e473eb))
* add react-table package ([5e761b0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5e761b0))
* add seleted and indeterminate states to the header checkbox ([908e8ab](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/908e8ab))
* add table search component ([92147f0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/92147f0))
* add uuid as devdependency ([04b18c7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/04b18c7))
* adjust pagination component ([59966ad](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/59966ad))
* better rules for selecatble layout ([1413312](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1413312))
* cleanup ([abd262e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/abd262e))
* control rows checked when all are checked ([1f9bbfb](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1f9bbfb))
* convert to component ([9d0bf38](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9d0bf38))
* correct cell padding ([ef41845](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ef41845))
* filter styling ([c4a5c60](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c4a5c60))
* get checboxes in for selectable table ([7a9af58](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7a9af58))
* hide table loader by default ([e0482d8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e0482d8))
* improve scrolling overflow ([70d6302](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/70d6302))
* make examples work for both types of table ([e95fd2a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e95fd2a))
* make table unsortable while there are selections ([9d68fb6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9d68fb6))
* more fake data for examples ([fe86c15](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fe86c15))
* more styling and add boolean to make the table rows selectable ([edf2d7b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/edf2d7b))
* reenable sorting and correct icon color ([eb0e08f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/eb0e08f))
* replace Faker with faker ([ce6be7c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ce6be7c))
* start stubbing out fake data and table story ([7793cfe](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7793cfe))
* test out pagination component in table ([13d27bb](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/13d27bb))
* update for faker ([a521c03](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a521c03))
* update text with selections ([11386b3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/11386b3))





## [8.3.4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.3.3...v8.3.4) (2018-12-19)

**Note:** Version bump only for package @sprucelabs/react-heartwood-components





## [8.3.3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.3.2...v8.3.3) (2018-12-18)

**Note:** Version bump only for package @sprucelabs/react-heartwood-components





## [8.3.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.3.1...v8.3.2) (2018-12-18)


### Bug Fixes

* **node:** Update node and npm versions ([efe7126](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/efe7126))
* **prettier:** Use non-vscode config to configure prettier ([c5d8774](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c5d8774))





## [8.3.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.3.0...v8.3.1) (2018-12-16)

**Note:** Version bump only for package @sprucelabs/react-heartwood-components





# [8.3.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.2.1...v8.3.0) (2018-12-15)


### Bug Fixes

* [SBL-1494](https://sprucelabsai.atlassian.net/browse/SBL-1494) update date picker icon to calendar without 17 on it ([2c03e18](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2c03e18))
* [SBL-1495](https://sprucelabsai.atlassian.net/browse/SBL-1495) update DOW format to be 3 letters ([fdd8827](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fdd8827))


### Features

* implement calendar event types in place of classes ([610b0bd](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/610b0bd))





## [8.2.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.2.0...v8.2.1) (2018-12-14)

**Note:** Version bump only for package @sprucelabs/react-heartwood-components





# [8.2.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.1.5...v8.2.0) (2018-12-14)

**Note:** Version bump only for package @sprucelabs/react-heartwood-components





## [8.1.5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.1.4...v8.1.5) (2018-12-12)

**Note:** Version bump only for package @sprucelabs/react-heartwood-components





## [8.1.4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.1.3...v8.1.4) (2018-12-11)

**Note:** Version bump only for package @sprucelabs/react-heartwood-components





## [8.1.3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.1.2...v8.1.3) (2018-12-06)


### Bug Fixes

* export the form layout components ([9cb4093](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9cb4093))





## [8.1.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.1.1...v8.1.2) (2018-12-05)


### Bug Fixes

* [SB-1391](https://sprucelabsai.atlassian.net/browse/SB-1391) ([f66177a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f66177a))





## [8.1.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.1.0...v8.1.1) (2018-12-05)

**Note:** Version bump only for package @sprucelabs/react-heartwood-components





# [8.1.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.0.2...v8.1.0) (2018-11-30)

**Note:** Version bump only for package @sprucelabs/react-heartwood-components





## [8.0.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.0.1...v8.0.2) (2018-11-27)

**Note:** Version bump only for package @sprucelabs/react-heartwood-components





## [8.0.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.0.0...v8.0.1) (2018-11-27)

**Note:** Version bump only for package @sprucelabs/react-heartwood-components





# [8.0.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.9.1...v8.0.0) (2018-11-27)

**Note:** Version bump only for package @sprucelabs/react-heartwood-components





## [7.9.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.9.0...v7.9.1) (2018-11-27)

**Note:** Version bump only for package @sprucelabs/react-heartwood-components





# [7.9.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.8.3...v7.9.0) (2018-11-26)


### Bug Fixes

* bad events ([c9470d2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c9470d2))
* drag and drop fixes ([a557023](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a557023))
* progress ([9240771](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9240771))





## [7.8.3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.8.2...v7.8.3) (2018-11-09)


### Bug Fixes

* Implement NextJS _app.js, remove title from _document.js ([5f46b2c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5f46b2c))





## [7.8.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.8.1...v7.8.2) (2018-11-07)

**Note:** Version bump only for package @sprucelabs/react-sprucebot





## [7.8.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.8.0...v7.8.1) (2018-11-07)

**Note:** Version bump only for package @sprucelabs/react-sprucebot





# [7.8.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.7.3...v7.8.0) (2018-11-02)

**Note:** Version bump only for package @sprucelabs/react-sprucebot





## [7.7.3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.7.2...v7.7.3) (2018-10-31)

**Note:** Version bump only for package @sprucelabs/react-sprucebot





## [7.7.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.7.1...v7.7.2) (2018-10-24)

**Note:** Version bump only for package @sprucelabs/react-sprucebot





## [7.7.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.7.0...v7.7.1) (2018-10-23)

**Note:** Version bump only for package @sprucelabs/react-sprucebot





# [7.7.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.6.1...v7.7.0) (2018-10-23)


### Features

* browser metrics; make ctx.sb.audit handle its own error and no await ([c9b0cf0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c9b0cf0))





## [7.6.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.6.0...v7.6.1) (2018-10-22)

**Note:** Version bump only for package @sprucelabs/react-sprucebot





# [7.6.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.5.0...v7.6.0) (2018-10-21)

**Note:** Version bump only for package @sprucelabs/react-sprucebot





# [7.5.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.4.4...v7.5.0) (2018-10-08)

**Note:** Version bump only for package @sprucelabs/react-sprucebot





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

**Note:** Version bump only for package @sprucelabs/react-sprucebot





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

**Note:** Version bump only for package @sprucelabs/react-sprucebot





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

**Note:** Version bump only for package @sprucelabs/react-sprucebot





<a name="6.67.0"></a>
# [6.67.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.66.0...v6.67.0) (2018-09-04)

**Note:** Version bump only for package @sprucelabs/react-sprucebot





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

**Note:** Version bump only for package @sprucelabs/react-sprucebot





<a name="6.65.0"></a>
# [6.65.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.64.1...v6.65.0) (2018-08-28)


### Features

* Build windowOrDocument method ([0c3e206](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0c3e206))





<a name="6.64.1"></a>
## [6.64.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.64.0...v6.64.1) (2018-08-25)

**Note:** Version bump only for package @sprucelabs/react-sprucebot





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

**Note:** Version bump only for package @sprucelabs/react-sprucebot





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

**Note:** Version bump only for package @sprucelabs/react-sprucebot





<a name="6.54.0"></a>
# [6.54.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.40.0...v6.54.0) (2018-08-14)


### Bug Fixes

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





<a name="6.22.0"></a>
# [6.22.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.21.0...v6.22.0) (2018-07-23)


### Features

* progress ([8c372ef](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8c372ef))





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





<a name="6.15.1"></a>
## [6.15.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.15.0...v6.15.1) (2018-07-11)


### Bug Fixes

* Only import babel-polyfill once ([5686a11](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5686a11))





<a name="6.15.0"></a>
# [6.15.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.14.0...v6.15.0) (2018-07-11)


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


### Features

* **SPRUC-925:** Nuclear option; squash all the commits ([#76](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/76)) ([63485cc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/63485cc))
* responsive, feed updates, deprecation warnings removed ([#84](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/84)) ([e5b76a4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e5b76a4))





<a name="6.6.1"></a>
## [6.6.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.6.0...v6.6.1) (2018-06-14)


### Bug Fixes

* **SB-1651:** url trails ([c1cad7a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c1cad7a))





<a name="6.6.0"></a>
# [6.6.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.5.0...v6.6.0) (2018-04-27)


### Bug Fixes

* **SB-1461:** classes for switches are same as core ([#69](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/69)) ([f25054e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f25054e))
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





<a name="6.4.2"></a>
## [6.4.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.4.1...v6.4.2) (2018-04-11)

**Note:** Version bump only for package react-sprucebot





<a name="6.4.1"></a>
## [6.4.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.4.0...v6.4.1) (2018-04-10)


### Bug Fixes

* **SB-941:** handle response errors and add unit tests ([#52](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/52)) ([54d5697](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/54d5697))





<a name="6.4.0"></a>
# [6.4.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v6.3.0...v6.4.0) (2018-04-08)


### Bug Fixes

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

* **sb-792:** Cors enabled images were unable to load ([cdc9fa2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/cdc9fa2))

<a name="6.0.0"></a>

# 6.0.0 (2018-03-22)

### Bug Fixes

* add updated package links to projects ([a4ecb97](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a4ecb97))
* travis build removed from projects ([eaf24da](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/eaf24da))

### Chores

* remove pull request templates from each package ([83ed5d0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/83ed5d0))

### Features

* **SB-910:** add skill.scrolltotop method ([766cfba](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/766cfba))
* **SB-937:** add error component to react-sprucebot and styleguide ([b9e632e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b9e632e))
* **SB-939:** adds redux-form compatible components ([8235c57](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8235c57))
* **SB-940:** add onboarding component to react-sprucebot and styleguide ([c4cdb6d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c4cdb6d))

### BREAKING CHANGES

* triggering marjor version bump

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

**Note:** Version bump only for package react-sprucebot

<a name="5.0.0"></a>

# 5.0.0 (2018-03-20)

### Bug Fixes

* add updated package links to projects ([a4ecb97](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a4ecb97))
* travis build removed from projects ([eaf24da](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/eaf24da))

### Chores

* remove pull request templates from each package ([83ed5d0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/83ed5d0))

### Features

* **SB-910:** add skill.scrolltotop method ([eee8c32](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/eee8c32))

### BREAKING CHANGES

* triggering marjor version bump
