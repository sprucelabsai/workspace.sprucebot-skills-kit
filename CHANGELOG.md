# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [8.17.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.17.0...v8.17.1) (2019-08-07)


### Bug Fixes

* update indexes ([67cc42f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/67cc42f))





# [8.17.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.16.2...v8.17.0) (2019-08-07)


### Bug Fixes

* **RecordTable:** Add loader when loading w/ no records [SDEV3-2215] ([933af31](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/933af31))


### Features

* Make sure card makes its subcomponents available ([ad90213](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ad90213))
* remove log ([24b2a25](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/24b2a25))
* styling ([a4706da](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a4706da))





## [8.16.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.16.1...v8.16.2) (2019-08-06)


### Bug Fixes

* workspace should return valid card date ([18c85b7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/18c85b7))
* **TruncatedList:** check if recordSelectionListRef exists before reset ([3191506](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3191506))





## [8.16.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.16.0...v8.16.1) (2019-08-03)


### Bug Fixes

* **PhoneInput:** TSX Types, Extend Base Lib ([633f81c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/633f81c))





# [8.16.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.15.2...v8.16.0) (2019-08-03)


### Bug Fixes

* [SOS-141](https://sprucelabsai.atlassian.net/browse/SOS-141) Employee's schedules on the quarter and half hours display as starting on the next whole hour ([51eb30b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/51eb30b))
* add ts types to View privacyLink and termsLink ([67e399c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/67e399c))
* bring back deprecated component export for backwards compatibility ([c5a746f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c5a746f))
* correctly set default rows in RSL story ([0e6b918](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0e6b918))
* correctly style selectable people list with avatar ([9237181](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9237181))
* disabled state for selectables in record selection list items ([c9912de](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c9912de))
* enable Autosuggest to show an icon in the input, and update TableSearch to use search icon in input ([9a5a094](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9a5a094))
* export TruncatedList ([fa02a43](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fa02a43))
* linter error ([a2ffb43](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a2ffb43))
* **Autosuggest:** Fix busted document references for SSR ([dbe63d7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/dbe63d7))
* linter issues ([f0feb8a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f0feb8a))
* linter issues ([7965f91](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7965f91))
* make "graphql" a dependency in spruce-skill ([89a6800](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/89a6800))
* Prioritize JWTs in the query string and prefer "jwtV2" over "jwt" for authentication ([ce8f91c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ce8f91c))
* remove redundant header from truncated list story ([09221d8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/09221d8))
* round to floor ([f953d0a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f953d0a))
* **AutoSuggest:** Allow helper/postLabel to both accept a node or a string ([7d438ff](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7d438ff))
* **Babel:** Generate sourcemaps ([3307d04](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3307d04))
* **Babel:** Generate sourcemaps ([bef44f6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/bef44f6))
* **build:** Run clean before build ([2d96176](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2d96176))
* **CI:** Cache yarn packages ([d751b93](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d751b93))
* **CircleCI:** Pull tags before canary publish ([ed66c8d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ed66c8d))
* **Heading:** Use bolder font [SDEV3-1814] ([b1b3e0b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b1b3e0b))
* **PageHeader:** Fix collapsible header when page is in flexible layout ([f46aca8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f46aca8))
* **PageHeader:** Fix element alignment of primaryAction CTA ([9c489eb](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9c489eb))
* **PhoneInput:** Add simple phone validator ([9d57b53](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9d57b53))
* **PhoneInput:** Allow defaultValue w/ internal state ([71f3110](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/71f3110))
* **RecordTable:** Correct usage of getNoDataProps [SDEV3-2018] ([87f0bf1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/87f0bf1))
* **RSL:** Fix reset method to address additional rows not loading ([2c04b46](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2c04b46))
* **RSList:** Handle filtered EmptyState separately [SDEV3-2110] ([f5e39b8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f5e39b8))
* **Tabs:** Correct styles for buttons in tabs ([245ba51](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/245ba51))
* **TextInput:** Correct type for helper ([ba1e1ce](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ba1e1ce))
* **TS:** Export types for List, Button ([a7baf29](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a7baf29))
* **TS:** Export types for Record Selection List ([9b4ad97](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9b4ad97))
* **Typescript:** Table, Autosuggest, Checkbox, TextInput ([2e260ac](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2e260ac))
* **View:** Add TS optional types, remove stateless type ([ac983b6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ac983b6))
* **View:** Address regression in main content scrolling ([1f670dc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1f670dc))


### Features

* **Cards:** Add concept of a footer action helper [SDEV3-1921] ([b7e9637](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b7e9637))
* **Footer:** Add optional footer to view ([7a491a3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7a491a3))
* **ModalBody:** Allow full bleed modal contents [SDEV3-1814] ([07ab884](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/07ab884))
* update searchable results to have an empty state ([ae05049](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ae05049))
* **PageHeader:** Add collapsibility for PageHeader ([4c571e4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4c571e4))
* revert story ([02e0e98](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/02e0e98))
* **RecordSelectionList:** Add controlled search props ([6492edd](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6492edd))
* **RecordSelectionList:** Add controlled search props ([998702e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/998702e))
* add ability to hide icons ([3317998](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3317998))
* add CircleLoader component ([4f57662](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4f57662))
* add click and escape handlers ([ec12823](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ec12823))
* add empty state to RecordSelectionList ([88c7e0c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/88c7e0c))
* add empty tab example ([edb0668](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/edb0668))
* add export ([5d6c84a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5d6c84a))
* add full width variant ([8c2f13f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8c2f13f))
* add info and warn toast kinds and update some colors ([ef8c758](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ef8c758))
* add portal and start controlling visibility ([0800d6b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0800d6b))
* Add Split Button component ([16c6406](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/16c6406))
* add story for list that ends with an action ([82d450a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/82d450a))
* card style updates ([5278bcf](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5278bcf))
* card styling updates ([69ecc19](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/69ecc19))
* change import to name instead ([586888a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/586888a))
* clean up stories ([d0564e7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d0564e7))
* clean up story ([c3a4444](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c3a4444))
* cleanup comments ([3595c8e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3595c8e))
* convert to tsx ([20fd29c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/20fd29c))
* convert Toast to tsx ([5ab0cdb](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5ab0cdb))
* convert ToastWrapper to tsx ([cfe33d9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/cfe33d9))
* DX - exclude build directories from vscode search/spotlight ([f21e273](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f21e273))
* fill out split button ([ffd3854](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ffd3854))
* fix button to work well in tsx ([92e3e2c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/92e3e2c))
* fix linting error ([50f6986](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/50f6986))
* fix sortable lists ([f0787c2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f0787c2))
* fix styling ([53850af](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/53850af))
* fix ts error ([c1063ab](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c1063ab))
* fix typo ([9fe8068](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9fe8068))
* hide pagination when search shows no results ([8746d71](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8746d71))
* hook up enter key to work with highlighted action ([d95e28c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d95e28c))
* hook up knobs and add more actions ([0138f8d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0138f8d))
* hook up state for using arrow keys ([8fff98d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8fff98d))
* hookup knobs ([089c686](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/089c686))
* implement CircleLoader in Button ([56a208f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/56a208f))
* improve click handler ([35779dd](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/35779dd))
* initial truncated list ([581919c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/581919c))
* make lists nestable ([c19d424](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c19d424))
* pass the highlighted index through to button group ([b705a91](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b705a91))
* pull data out of stories" ([6cad076](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6cad076))
* remove old code and add truncated list action method to story ([31d85fc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/31d85fc))
* remove stray log ([bed0dd6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/bed0dd6))
* remove unnecessary check ([35c0948](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/35c0948))
* remove unnecessary check ([e378e73](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e378e73))
* remove unnecessary comment ([a2b2dfd](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a2b2dfd))
* rename prop ([013842d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/013842d))
* return a regular button if no actions are provided ([c56861b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c56861b))
* style CircleLoader ([c792f72](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c792f72))
* switch skill sync to v2 gql endpoint and get back the s3 bucket ([fdff653](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fdff653))
* take out help button and update links to legal ([9e9a5b4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9e9a5b4))
* tsx conversion ([3c30251](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3c30251))
* update buttongroup to support full width and set position of actions ([92d3ea2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/92d3ea2))
* update children prop ([8a85da1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8a85da1))
* update function types ([c60ac7c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c60ac7c))
* update ListItem reference and Button children prop ([ecfb4bd](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ecfb4bd))
* update return type ([148d6dc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/148d6dc))
* Update SplitButton to not define interfaces defined elsewhere ([e9dc97e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e9dc97e))
* update story ([1452881](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1452881))
* update story and defaults ([404752f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/404752f))
* update storybook stories ([e4eec49](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e4eec49))
* update Toast-story to tsx ([bd51267](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/bd51267))
* upgrade [@sprucelabs](https://github.com/sprucelabs)/log to latest version ([bbf256d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/bbf256d))
* Upgrade semantic release to use prerelease tags and bump full versions on merge to master ([a5c7578](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a5c7578))
* use index to highlight suggestion ([63e11df](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/63e11df))
* wire up list items to render warnings ([1b9025e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1b9025e))
* **RecordTable:** Add basic story with generated data ([0d4901e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0d4901e))
* **RecordTable:** Allow for customization of filtered empty state [SDEV3-1820] ([9014cb2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9014cb2))
* **RecordTable:** Convert to Typescript [SDEV3-2018] ([1488580](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1488580))
* **RSL:** Add label to search field [SDEV3-1814] ([f4ac2a6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f4ac2a6))
* **Skillskit:** Restore the concept of forced auth for the safari case [SDEV3-1945] ([09a5c5a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/09a5c5a))
* **TruncatedList:** fleshing out truncated list functionality ([445914d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/445914d))
* **TruncatedList:** handle onRemove updates ([4b82364](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4b82364))
* **TruncatedList:** truncated list card example layout ([d4465a1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d4465a1))
* **TruncatedList:** update logic to set isTruncated declaratively ([1ac878c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1ac878c))
* **TypeScript:** Export typescript definitions [SDEV3-2018] ([03f2da7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/03f2da7))


### Refactoring

* remove button from RSL card ([6347b22](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6347b22))
* **RecordSelectionList:** Updating RSL to use ListItem while remaining backwards compatible ([36ed1d4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/36ed1d4))
* add accessors to TruncatedList methods ([dd77112](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/dd77112))
* add link props and convert to typescript ([020998c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/020998c))
* add prop descriptions to TruncatedList ([ef55172](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ef55172))
* convert TruncatedList to TS and add reset method ([7c9aa6e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7c9aa6e))
* dynamic copyright date ([1351149](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1351149))
* improve deprecated props loging ([416e758](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/416e758))
* remove deprecated examples from RSL story ([cd8b8a3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/cd8b8a3))
* remove deprecated prop from RSL story ([f4ffee7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f4ffee7))
* remove useless constant ([f8b794d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f8b794d))
* update TS types ([20836a0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/20836a0))





## [8.15.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.15.1...v8.15.2) (2019-06-19)


### Bug Fixes

* **PageHeader:** Allow setting of additional classnames ([5e06422](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5e06422))
* use scrollingElement to fix autosuggest positioning in safari ([d07ab72](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d07ab72))





## [8.15.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.15.0...v8.15.1) (2019-06-19)


### Bug Fixes

* account for page scroll in autosuggest positioning ([849df01](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/849df01))
* context and auto suggests z-index ([9911a4c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9911a4c))
* EVENT_VERSION=1 eventId and retryId not passed through on ctx.event ([bf1a058](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/bf1a058))





# [8.15.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.14.0...v8.15.0) (2019-06-18)


### Features

* add max-height and cleanup ([5d03cef](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5d03cef))
* add resize handler and clean up comments ([2831e8c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2831e8c))
* add selectd style ([0eb9f9b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0eb9f9b))
* add some notes ([d877c8d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d877c8d))
* add to story in form context ([66cb800](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/66cb800))
* clean up annotations ([dd680c7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/dd680c7))
* clean up imports ([288e14e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/288e14e))
* cleanup unused var ([12a4ee8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/12a4ee8))
* correct styles ([88656d7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/88656d7))
* fix undefined document ([30c35a1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/30c35a1))
* redo positioning ([58ffd49](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/58ffd49))
* remove comment ([0f98684](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0f98684))
* remove fragment ([b8474e7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b8474e7))
* render key as text if it doesn't exist in the record ([63b6620](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/63b6620))
* reverse breaking changes ([b8cb94e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b8cb94e))
* update story ([531b972](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/531b972))
* update styles ([4de2966](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4de2966))
* Use portal to show results from Autosuggest ([825d40b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/825d40b))





# [8.14.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.13.0...v8.14.0) (2019-06-14)


### Bug Fixes

* [SDEV3-1032] fix broken icon styles on buttons ([9cfc2f3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9cfc2f3))
* [SDEV3-1321] pass correct payload back to button action callback ([260e7ff](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/260e7ff))
* [SDEV3-1330] fixes error on drop event on mobile ([d7c1e4b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d7c1e4b))
* add eslintignore rule for generated icons.js ([aa83580](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/aa83580))
* add radix to parseInt ([61d4fae](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/61d4fae))
* add spacerTop prop to form layout items to compensate for alignment of inline items with or without labels ([d298c84](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d298c84))
* allow modal content to scroll to autosuggest when loaded from skill view ([e2cde1d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e2cde1d))
* calling virtualized methods that don't exist ([5bf2960](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5bf2960))
* Clean two spreads against native DOM elements ([c3a5e65](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c3a5e65))
* create new ImageSSR component to handle image load errors ([8b89a50](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8b89a50))
* ctx.sb.mutation was not properly calling api; add tests for ctx.sb.mutation and ctx.sb.query methods ([a914be3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a914be3))
* debug not defined ([4ebde4a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4ebde4a))
* default response for emits should be an empty array ([79e1293](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/79e1293))
* don't remove search when loaded records changes ([03df6fa](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/03df6fa))
* escape heading string in modal ([bb1f9ea](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/bb1f9ea))
* event handler not getting called for v2 events ([26a59de](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/26a59de))
* fix and update component styles for modals ([6926679](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6926679))
* formatting ([387ce16](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/387ce16))
* get record id via method instead of node ([b73814f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b73814f))
* handle SpruceTest unable to be loaded and do not crash ([36b141f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/36b141f))
* If clipped, scroll overflow parent to display autosuggest options. ([5f3d5ca](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5f3d5ca))
* linter error ([fc6d8c0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fc6d8c0))
* linter errors ([420334c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/420334c))
* linter errors ([682af72](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/682af72))
* linter errors ([325df38](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/325df38))
* linter errors ([942a61c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/942a61c))
* linter formatting issues ([74a22f7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/74a22f7))
* linter issue ([13366cb](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/13366cb))
* linter issues ([ddcf1d3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ddcf1d3))
* pass before options into beforeBase ([959e3a7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/959e3a7))
* remove duplicate icons ([8fd8462](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8fd8462))
* remove json output from document ([88cbced](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/88cbced))
* remove modal test code ([e67850e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e67850e))
* remove unused var ([2128f5c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2128f5c))
* remove white background for custom modal styling ([e0fc116](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e0fc116))
* undo unnecessary layout separators ([e1b1fa2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e1b1fa2))
* unused vars ([12f858c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/12f858c))
* **Select:** Create defaults around placeholder option ([d6dabca](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d6dabca))
* update eslint rule to match what prettier expects to prevent vscode format thrashing ([95b8fc1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/95b8fc1))
* **Auth:** Remove client-side cookie setting for JWT token ([13d077a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/13d077a))
* **graphql:** Use peer dependencies for graphql ([51e58fc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/51e58fc))
* **lint:** Add config dep to our spruce eslint plugin ([62edee7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/62edee7))
* **lint:** Update dependencies for shared lint config ([89b255f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/89b255f))
* update list height on add/remove records ([1f78c5e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1f78c5e))
* update remove icon ([90a7a9a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/90a7a9a))
* update yarn clean script with correct paths ([6d2cc36](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6d2cc36))
* update yarn lock ([5163647](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5163647))
* **Page:** Page should accept a spread of remaining props ([b5bc98f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b5bc98f))
* **RecordTable:** props-spread should come after other props... ([000c411](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/000c411))
* **Table:** Call `rowIsDirty` method for determining row dirtiness ([6284991](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6284991))
* v1 mock should fetch location ([71a94f6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/71a94f6))


### Documentation

* add modal story ([adb0a6d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/adb0a6d))
* rename stories ([6f078d1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6f078d1))
* update stories ([de33c6e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/de33c6e))


### Features

* ability to test event emit callbacks ([dc34519](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/dc34519))
* add "secondaryCTA" option to BigCalendar EventDetails footer ([d397f25](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d397f25))
* add ability to render as radio or checkbox ([fd17b2f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fd17b2f))
* add cursor pointer to table expander ([05dcc8e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/05dcc8e))
* add disabled styling ([ce8577b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ce8577b))
* add icon to expandable row ([2ae5c18](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2ae5c18))
* add image to sidebar ([3059c15](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3059c15))
* add isSelectable to nested table example ([901ec52](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/901ec52))
* add multi-layered nesting example. complete table design updates necessary for [SDEV3-584] ([131b3fc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/131b3fc))
* add search ([384672d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/384672d))
* add some transitions ([9401e6d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9401e6d))
* add story for selectable item lists ([18b69ae](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/18b69ae))
* add styles for default button ([f3b9a34](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f3b9a34))
* add ui components page ([4706ed0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4706ed0))
* add virtualHeight and update short list check ([272dd0b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/272dd0b))
* adding modal footer methods to next helpers ([4f306ba](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4f306ba))
* always scroll to top of page ([585f07e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/585f07e))
* better color contrast ([b6a5a4a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b6a5a4a))
* condense render logic ([5299d2a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5299d2a))
* conditionally render record selection list to allow it to have a dynamic height ([1e4c700](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1e4c700))
* correct way to use logo in sidebar ([2385415](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2385415))
* emit events w/ custom eventId and log incoming events ([ac5074d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ac5074d))
* fine tune styling ([a138935](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a138935))
* fix button styling ([a5e6996](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a5e6996))
* fix buttons ([b05626c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b05626c))
* fix image reference ([612bc88](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/612bc88))
* fix pullquote ([0300a86](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0300a86))
* fix tail on today in date range ([edda636](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/edda636))
* hide app name ([b900f60](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b900f60))
* hide focus on iframes ([c0c648e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c0c648e))
* integrate new logger functionality ([e1c1e0c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e1c1e0c))
* layout adjust ([f66011b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f66011b))
* make followup text visible ([af2b334](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/af2b334))
* Make testing easier by moving sandbox and helpers into spruce-skill-server ([ee3d716](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ee3d716))
* match change handlers ([e58efc4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e58efc4))
* match renders ([ee89f83](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ee89f83))
* min-height for toasts ([6582d30](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6582d30))
* move architecture diagram ([66c91f7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/66c91f7))
* move images directory back ([7d06144](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7d06144))
* pass message type when creating messages and add tests ([cbed801](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/cbed801))
* pass sandbox into custom mocks ([1d55c6a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1d55c6a))
* rearrange directory ([5be78f5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5be78f5))
* remove comment ([3cf7cad](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3cf7cad))
* Remove docs (moved to new repo) ([6d61d7b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6d61d7b))
* remove focus ring ([7b8ac8d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7b8ac8d))
* remove the navbar ([7e69056](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7e69056))
* remove unneeded rules ([72e9ee4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/72e9ee4))
* remove unused vars ([8a6b2bb](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8a6b2bb))
* Run tests from spruce-skill-server ([835bb2a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/835bb2a))
* sidebar nesting ([bfcf3e0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/bfcf3e0))
* support v1 authentication for tests ([b1e3358](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b1e3358))
* The SDK is now exposing multiple orgs on the sandbox data for tests.  This will allow for more diverse tests during skills development and testing. ([c54af2b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c54af2b))
* undo accidental change ([9ff8e6a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9ff8e6a))
* update border styling on expandable table rows ([cb89118](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/cb89118))
* update cover ([991bac5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/991bac5))
* update expander column size ([272dd9a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/272dd9a))
* update prop names ([c329a6a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c329a6a))
* update README to be specific to working on Skills Kit ([fc0e2d8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fc0e2d8))
* update system architecture diagram ([2280c18](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2280c18))
* update theme color ([14fa6a1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/14fa6a1))
* **Card:** Add section separators ([9a8abd3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9a8abd3))
* **ConfirmDialog:** Add convenience methods for modifying button properties. ([6999dd0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6999dd0))
* **ConfirmDialog:** Add example confirm modal ([a223c92](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a223c92))
* **corePagedModal:** add api and example of core paged modal ([4476fbd](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4476fbd))
* **dirtyTableRows:** initial implementation of dirty rows in the Table component ([2a85f63](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2a85f63))
* **icons:** Add duplicate icon ([7453e8e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7453e8e))
* **layout:** Stretch heights to match on secondary layouts ([23761f6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/23761f6))
* **lint:** Enforce GQL linting in skills ([b9d9b00](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b9d9b00))
* **lint:** Enforce that query/mutate must be called with an object of options. ([78d2c3f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/78d2c3f))
* **lint:** Get linter standardized w/ ai-spruce-web rules ([7e1b58a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7e1b58a))
* **lint:** Standardize lint for heartwood-components ([79f95f1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/79f95f1))
* **lint:** support JS importing TS ([570b053](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/570b053))
* **modal:** Handle onClosed event broadcast by core ([fc75da1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fc75da1))
* **Modal:** Allow data to be passed back to parent iframe with modal close method ([c6fd8f7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c6fd8f7))
* **nestedTables:** initial implementation of nested tables ([02144a1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/02144a1))
* **pagedModal:** Add ability to update footer actions and title text from skill view ([7152d53](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7152d53))
* **PageHeader:** Allow passing of backlink component ([caaf1ef](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/caaf1ef))
* upgrade to [@sprucelabs](https://github.com/sprucelabs)/log@^2 ([7100b50](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7100b50))
* **RecordSelectionList:** Add reset method ([42173cf](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/42173cf))
* upgrade [@typescript-eslint](https://github.com/typescript-eslint)/eslint-plugin ([aa093c9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/aa093c9))
* use labels when necessary ([864e418](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/864e418))
* **RecordSelectionList:** Make load count customizable ([dc72940](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/dc72940))
* **RecordTable:** Add callback for navigating to a page w/ pagination ([bed9440](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/bed9440))
* **RecordTable:** Control subcomponent expansion in local state ([290ee84](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/290ee84))
* **SpruceSkill:** Add status check listener for core to ping ([b4af53a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b4af53a))
* **storybook:** Support TSX sources ([9b291bd](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9b291bd))
* **Text:** Adds basic text templating for formatting and rich interactions within text component ([19e076c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/19e076c))
* **TextStyle:** Add subdued text style ([65ff167](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/65ff167))


### Refactoring

* add props to remove top/bottom padding from card body ([18aa0a8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/18aa0a8))
* add renderLocation prop to dynamically style document ([e3baf9b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e3baf9b))
* addressing PR feedback ([181c122](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/181c122))
* Addressing PR feedback ([fe8f001](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fe8f001))
* **icon:** infer isLineIcon from icon name. adding additional icons from heartwood. ([e3e9836](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e3e9836))
* automatically determine isLineIcon from icon key ([09eea7d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/09eea7d))
* card and layout style updates ([aa6795b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/aa6795b))
* changes to make modals, cards, and record selection list compatible with heartwood design ([5811ce0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5811ce0))
* cleanup code ([f033e3b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f033e3b))
* code cleanup ([8387edc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8387edc))
* correct order of test scripts ([9ce2367](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9ce2367))
* finalize record select sizing ([e2dcaf1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e2dcaf1))
* Integrate rules from Ken ([422c5c3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/422c5c3))
* minor fix, typo in eslint ([0b769a6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0b769a6))
* minor fixes ([f902915](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f902915))
* move example modal page to existing example modal view ([6062ca7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6062ca7))
* pass callback methods with the rest of the data ([09b8596](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/09b8596))
* remove underscore from private modal property ([d6ddd40](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d6ddd40))
* **contextMenu:** add max height and remove button rounded corners ([af270f6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/af270f6))
* **document:** cleaner way of getting initial page props in document ([0077f27](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0077f27))
* **NPM:** Update deps for audit prep, peer deps ([f3d0e29](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f3d0e29))
* test to see if generated JSON passes lint ([2a6a1d8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2a6a1d8))
* update confirm modal example ([40552f3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/40552f3))
* update dirty table example to manage state more efficiently ([9901e6d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9901e6d))
* update example skill modal ([2fdc35d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2fdc35d))





# [8.13.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.12.0...v8.13.0) (2019-03-20)


### Bug Fixes

* linting and unnecessary code ([24a0b82](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/24a0b82))
* padding on card footer ([6dd6501](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6dd6501))
* pagination padding ([6cdc598](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6cdc598))
* **RecordTable:** Paginators should only be displayed when 2 or more pages of data are available [[SBL-2111](https://sprucelabsai.atlassian.net/browse/SBL-2111)] ([4a20cc5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4a20cc5))
* remove unnecessary import ([41f8479](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/41f8479))
* set mock server before running skill sync ([5e320a9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5e320a9))
* **BigCalendar:** Prep for usage in core web ([11505db](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/11505db))
* **BigCalendar:** Remove BC styles from heartwood-components ([c8ea8b4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c8ea8b4))
* **RecordTable:** Paginators should only be displayed when 2 or more pages of data are available [[SBL-2111](https://sprucelabsai.atlassian.net/browse/SBL-2111)] ([eca550a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/eca550a))
* **view:** Remove more non-flex references ([84dbd42](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/84dbd42))
* **view/page:** Properly scope zIndex for page panels ([723c64e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/723c64e))
* set User virtual attributes for profile image types to json ([b198d8a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b198d8a))


### Features

* **modals:** Add passthrough method for setAppElement ([1a08498](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1a08498))
* **RecordTable:** RecordTable now supports an EmptyState instance for failed API fetches [[SBL-2094](https://sprucelabsai.atlassian.net/browse/SBL-2094)] ([d2aa0a1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d2aa0a1))
* **RecordTable:** Support for custom button kinds and icons ([25bc1d9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/25bc1d9))
* add large guest and team icons ([45cce95](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/45cce95))
* better error logging / debugging messages; cleanup unused / old code ([5d66f51](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5d66f51))
* implement GQL Relay ([6119e04](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6119e04))
* override gql connections ([bde8149](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/bde8149))
* **responsive:** Don't let mobile styles for sidebars leak to desktop ([fef94b5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fef94b5))
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
* gt => +1 to the breakpoint ([3d7ec81](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3d7ec81))
* style updates ([0f948d9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0f948d9))





# [8.12.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.11.0...v8.12.0) (2019-02-27)


### Bug Fixes

* **EmptyState:** exports Empty State component ([ae7fd4f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ae7fd4f))
* **Table:** Correct busted logic that was breaking pagination ([4a249b0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4a249b0)), closes [#379](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/issues/379)


### Documentation

* start upgrade docs ([14ddb10](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/14ddb10))


### Features

* docsify ([b70a8ac](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b70a8ac))
* **EmptyState:** Adds new default for Empty State [[SBL-1996](https://sprucelabsai.atlassian.net/browse/SBL-1996)], new Empty State for filtered Record Tables [[SBL-2093](https://sprucelabsai.atlassian.net/browse/SBL-2093)], new Storybook stories for Empty State ([5f9e5f2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5f9e5f2))
* **Icons:** added Empty Box and No Matches icons ([8868ca0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8868ca0))
* **RecordSelectionList:** Support arbitrary data with getRecordId ([51d475d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/51d475d))


### Refactoring

* **BigCalendar-story:** Uses the Toast component instead of alert ([1f3ec14](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1f3ec14))
* **Table:** Sane default for the Empty State primary action button icon instead of the refresh icon ([a611052](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a611052))





# [8.11.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.10.1...v8.11.0) (2019-02-19)


### Bug Fixes

* Add .editorconfigs targetting all files ([dd2bfa3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/dd2bfa3))
* add missing ioredis package to spruce-skill-server; fix reference to redis in gql subscription server ([bcefde3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/bcefde3))
* Address stack overflows on larger lists ([aa5a814](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/aa5a814))
* await next() in auth middleware ([244c7ea](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/244c7ea))
* Checkbox component not passing event through ([1e34cb2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1e34cb2))
* Disable warning for fragments of the same name ([c030cbf](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c030cbf))
* **eslint:** Include babel-eslint ([aa50120](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/aa50120))
* GraphQL `mutate` method name should match apollo equivalent method ([2a4e263](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2a4e263))
* **babel:** utils: force auto modules ([08a54bc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/08a54bc)), closes [/github.com/zeit/next.js/blob/canary/packages/next/build/babel/preset.ts#L52-L56](https://github.com//github.com/zeit/next.js/blob/canary/packages/next/build/babel/preset.ts/issues/L52-L56)
* **build:** Don't rebuild during `yarn test` ([aabc1ba](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/aabc1ba))
* **circleci:** Add pip bins to executables ([c4e5ee8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c4e5ee8))
* **dev:** Correct yarn watches for heartwood ([296e7bb](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/296e7bb))
* **eslint:** Add rules to match spruce-skill project ([daf2cd9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/daf2cd9))
* **eslint:** Comment out lint issues that are probably there for illustrative purposes ([881a263](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/881a263))
* **eslint:** Take first pass at spruce-skill linting issues ([bf94fe8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/bf94fe8))
* **eslint:** Tweaking logic around interpolation linting ([07cf8ff](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/07cf8ff))
* **eslint:** Use correct dependency structure ([fbaf866](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fbaf866))
* **flow:** React Heartwood, correct corrected flow config ([355efa1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/355efa1))
* **fontloader:** Repair deps, remove reference to storybook in component ([d61ba10](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d61ba10))
* **graphql:** Add extensions back to non-subscription client ([6fa47cf](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6fa47cf))
* **graphql:** Include websocket dependency ([4e355b1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4e355b1))
* **skill-view:** Get _document config from next/config rather than props ([27fef76](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/27fef76))
* **skills:** GQL, set token in constructor for subscriptions ([781a4c6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/781a4c6))
* **tables:** Basic style for no records label, hide "loading" loader state ([5a8f237](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5a8f237))
* Only include style prop into DragGrid root div ([329e51a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/329e51a))
* **tables:** Disable autocomplete by default on checkboxes ([a3758c5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a3758c5))
* Handle operationType -> clientMethod mapping, exceptions ([12b1d1f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/12b1d1f))
* Install latest aws-cli via pip ([f9e8eba](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f9e8eba))
* path to component after merge ([19ba425](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/19ba425))
* **utils-gql:** Track the entire original GQL error ([3e58e58](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3e58e58))
* **utils/graphql:** Add stub for global logs to pass lint ([556c627](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/556c627))
* Remove regex, count brackets ([eab424d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/eab424d))
* switch circle to use py+node image ([a84a67f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a84a67f))
* use proper directory (build/) when running in non-local environment ([21117ff](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/21117ff))


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
* add FontLoader to PageWrapper ([cc7b7cd](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/cc7b7cd))
* add FormBuilder component ([19b8128](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/19b8128))
* add Formik ([f5fa714](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f5fa714))
* add icon for more vertical ([0ad6f38](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0ad6f38))
* add isSmall prop to ContextMenu ([f689ac9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f689ac9))
* add koa.context to GraphQLSubscriptionServer subscription context ([5f7ac4d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5f7ac4d))
* add media query to hide ([1258500](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1258500))
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
* add z-index ([6bc1993](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6bc1993))
* adjust width rules and layout ([24d4cfc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/24d4cfc))
* allow to pass toggle props through list item ([2e91f4f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2e91f4f))
* annotate props ([e1ed31c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e1ed31c))
* attach locationId, organizationId, and jwt to authV2 ([ebc50ef](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ebc50ef))
* better rendering of toasts when one is removed ([cc07b81](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/cc07b81))
* better timeout cleanup ([b863938](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b863938))
* chaange pageHeader to header in PageHeader ([0cee055](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0cee055))
* change onUndo to followupAction ([84bb28b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/84bb28b))
* convert FeedBuilder to component ([4bed986](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4bed986))
* convert ToastWrapper to a component ([75a6ea1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/75a6ea1))
* correct images ([2152d63](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2152d63))
* correct keying for dynamic components ([3caf0a2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3caf0a2))
* default sidebar to expanded ([3598957](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3598957))
* ensure that list stops loading when it should ([72faf78](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/72faf78))
* export FontLoader correctly ([8f260f7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8f260f7))
* FileItem core model ([3ae03b0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3ae03b0))
* fix color of undo ([75d7e20](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/75d7e20))
* fix conflict ([23535b4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/23535b4))
* fix image removal with new from strategy ([59701d7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/59701d7))
* fix lint errors ([1b37b43](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1b37b43))
* fix onboarding card tabs ([7b37a84](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7b37a84))
* fix stories ([e682407](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e682407))
* fix tabs styling ([e95ff34](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e95ff34))
* format empty text ([8f74852](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8f74852))
* get reverse scroll, add count and callback to load more messages ([44c508e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/44c508e))
* handle visibility toggles on mobile ([c4102fa](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c4102fa))
* hide sidebar children ([fd7cc84](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fd7cc84))
* hook up modal ([18435a8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/18435a8))
* hook up reset form on discard changes ([2da90e0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2da90e0))
* Implement upload service for images along with example upload controller and Dropzone integration ([1b396f3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1b396f3))
* import flow types for form layouts ([d01451e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d01451e))
* improve date header formatting ([012f1f4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/012f1f4))
* improve row loading performance ([02555da](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/02555da))
* improve spacing props ([1eeb40f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1eeb40f))
* integrate gql client ([4cb714f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4cb714f))
* latest iteration that simulates loading in of new messages ([b8a9a95](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b8a9a95))
* make fields required ([794f60d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/794f60d))
* make follow up text configurable ([c584bb1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c584bb1))
* make savebar set form submitting to true ([b804b83](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b804b83))
* make submit work on enter ([204d39f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/204d39f))
* make toast timeouts work ([2b5562d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2b5562d))
* make view responsible for hiding sidebars on resize ([7d22a2f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7d22a2f))
* minor fixes ([6438138](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6438138))
* organization and location gql ([e18d641](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e18d641))
* **EmptyState:** base Empty State component [[SBL-1977](https://sprucelabsai.atlassian.net/browse/SBL-1977)] ([ebee0a4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ebee0a4))
* **EmptyState:** Empty State React component [[SBL-1982](https://sprucelabsai.atlassian.net/browse/SBL-1982)] ([ff05492](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ff05492))
* **errors:** Make SpruceWebError configurable ([f340add](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f340add))
* **eslint:** Add shared config ([b8a726e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b8a726e))
* **eslint:** Add spruce eslint plugin ([e5a4009](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e5a4009))
* **eslint:** Add spruce eslint to spruce-skill ([2e93254](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2e93254))
* **flow:** Fix react-heartwood-components ([a58b36b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a58b36b))
* **flow:** Fix react-heartwood-components ([14c0f59](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/14c0f59))
* uploads service method to delete file items ([5aa25ca](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5aa25ca))
* **graphql:** Improve logging data and messaging ([aa6a6e1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/aa6a6e1))
* **record-selection-list:** static vs async record provision ([49da796](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/49da796))
* **RecordSelection:** Support checkboxes, radios & removal of records ([b4adc33](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b4adc33))
* **RecordSelectionList:** Allow for "unselectable" records ([1c8de7b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1c8de7b))
* **RecordSelectList:** Add async search capability ([51fa5dd](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/51fa5dd))
* **RecordTable:** Empty State defaults for RecordTable [[SBL-1996](https://sprucelabsai.atlassian.net/browse/SBL-1996)] ([a02ee51](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a02ee51))
* pass ctx to sequelize models ([e298ae6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e298ae6))
* pull out FormInner into own component ([620a0f2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/620a0f2))
* put sidebar items in a sidebar section ([1c0c0a9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1c0c0a9))
* redis pubsub ([ba552f4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ba552f4))
* register w/ skill view version ([cbf281a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/cbf281a))
* reinstall with yarn ([919561f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/919561f))
* remove all references to messageCount ([2fa8b8a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2fa8b8a))
* remove bottom border from last list item ([a97b259](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a97b259))
* remove breakpoint ([a2d750a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a2d750a))
* remove comment ([12b87b8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/12b87b8))
* remove comment ([83ca6de](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/83ca6de))
* remove done to avoid lint error ([75f08db](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/75f08db))
* **utils:** Add iframe messaging tools ([f875811](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f875811))
* remove log ([1a81b3e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1a81b3e))
* remove log ([04e0774](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/04e0774))
* remove log ([c9a1dd6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c9a1dd6))
* remove log ([6025363](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6025363))
* remove spread operators ([e1abb79](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e1abb79))
* remove unneeded initialvalues ([1e1d3d6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1e1d3d6))
* rename cards back to sections for clarity ([6266862](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6266862))
* rename sections to cards ([e29288f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e29288f))
* responsiveness to show/hide right sidebar ([2884954](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2884954))
* reverse message order and jump to bottom, update page styling when primary header is present ([de042d4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/de042d4))
* set position and dimensions for scrolling ([646c64e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/646c64e))
* settings helper to make fetch easy ([3b87bcb](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3b87bcb))
* setToken for gql so auth does not need to be passed with each request ([f33be7b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f33be7b))
* start adding a settings page example ([3cb13e5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3cb13e5))
* start checking for date headers ([026730b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/026730b))
* start looping ([0d23e2c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0d23e2c))
* start styling ([c58ebd7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c58ebd7))
* step back styling ([f551854](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f551854))
* Streamline builds and testing ([ea635b7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ea635b7))
* styling ([3b7a179](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3b7a179))
* subscriptions from skill to external graphql server ([7524b32](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7524b32))
* temp hide scroll jack ([147ed40](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/147ed40))
* update addons order ([01e210a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/01e210a))
* update basic example ([cc77e43](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/cc77e43))
* update components to support design for profile pages ([95d9999](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/95d9999))
* update example layout ([64e5386](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/64e5386))
* update on resize ([f2578c6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f2578c6))
* update page header to work well with right sidebar ([b76628a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b76628a))
* update story ([73412ee](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/73412ee))
* update styles and start hooking up new props ([9e357a5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9e357a5))
* updatte colors ([3277193](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3277193))
* use rowCount to trigger loading ([7a43f9d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7a43f9d))
* use spread to pass id through to LayoutSection for deep linking ([1856883](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1856883))
* validate skill settings ([230082f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/230082f))
* view version ([1a758ef](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1a758ef))
* **spruce-skill:** Add example of requesting that Core show a toast ([995b5e1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/995b5e1))
* **spruce-skill:** Support Skill View Dialogs in Core ([8516ad0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8516ad0))
* **tables:** Add concept of totalRows ([2d37253](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2d37253))
* **tables:** Add reusable RecordTable to react-heartwood ([cfcc647](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/cfcc647))


### Refactoring

* **pagedModal:** clean up code ([ebb6a55](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ebb6a55))
* fix type of toast ID ([923c4e7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/923c4e7))
* remove change to package.json ([287265c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/287265c))
* **pagedModal:** fix styling so title is centered only on paged modals ([9bef17a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9bef17a))
* **pagedModal:** pass required isFullHeight prop to PagedModal ([a9b3f83](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a9b3f83))
* **pagedModal:** use source sans pro semi-bold ([b989866](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b989866))
* **recordSelectionList:** pass back selected record ([619dc66](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/619dc66))
* Use a button group in the example ([a4e5631](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a4e5631))





## [8.10.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.10.0...v8.10.1) (2019-01-04)


### Bug Fixes

* Canary/prerelease tagging and publish ([eef4fa4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/eef4fa4))
* Tag prerelease branches with `prerelease` tag ([c365584](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c365584))





# [8.10.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.9.1...v8.10.0) (2019-01-03)


### Features

* add font loader to storybook ([c672b3e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c672b3e))
* add fontfaceobserver ([2ebc604](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2ebc604))
* export fontloader ([27ab97f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/27ab97f))
* fix text overflow ([81ad157](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/81ad157))
* fix transform ([f2dc334](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f2dc334))
* hook up fontloader component and add toggleable css to handle FOIT ([27001ea](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/27001ea))
* hook up state and listeneres for location menu ([87f3026](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/87f3026))
* improve responsiveness ([d4cd4a9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d4cd4a9))
* logging ([b5e49fb](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b5e49fb))
* make FOIT include labels and spans ([3be0910](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3be0910))
* move location menu into own component ([b5e9cf6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b5e9cf6))
* snap location menu to correct position ([b27571c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b27571c))
* update header styles ([8886554](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8886554))
* verify that fontloader works in calendar ([c176d43](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c176d43))





## [8.9.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.9.0...v8.9.1) (2018-12-28)

**Note:** Version bump only for package workspace.sprucebot-skills-kit





# [8.9.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.8.0...v8.9.0) (2018-12-28)


### Features

* add onSelected callback ([3e3248b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3e3248b))
* correct padding on header tabs ([fa3f149](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fa3f149))





# [8.8.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.7.0...v8.8.0) (2018-12-28)


### Features

* add icon variation ([d2e7ac7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d2e7ac7))
* add new icon files ([81e148f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/81e148f))
* add props and styles for bottom border ([77ede06](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/77ede06))
* add skill view example ([1384e5b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1384e5b))
* add support for tabs in page header ([c7ec484](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c7ec484))
* add variations ([918b677](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/918b677))
* change element from div to main ([4fc3632](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4fc3632))
* change main back to div ([c162929](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c162929))
* cleanup ([2703775](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2703775))
* give page the capacity to render header on its own ([ee18376](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ee18376))
* improve responsiveness ([b27540c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b27540c))
* make stroke icon styling the default ([d6e1c6f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d6e1c6f))
* show icon in onboarding card tab ([52fd623](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/52fd623))
* styling ([aa41aa9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/aa41aa9))
* styling to match select to text input when it's in a form ([6db4276](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6db4276))
* tabs in header styling ([e4632f5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e4632f5))
* work better with layout components ([441c6df](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/441c6df))





# [8.7.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.6.3...v8.7.0) (2018-12-28)


### Features

* add classes for overflow ([a3fcbe1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a3fcbe1))
* correct styling of context menu when used with tabs ([0a1a38a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0a1a38a))
* fix prettier errors ([231d76c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/231d76c))
* fix prettier errors ([d6bf66f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d6bf66f))
* get the rights to be hidden on initial render and update on window resize ([51d1fc1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/51d1fc1))
* make tab truncation controllable to prevent it with onboarding cards ([71f2a43](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/71f2a43))
* pass hidden tabs into context menu ([09ff5cb](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/09ff5cb))
* prevent active tab from getting hidden in context menu ([650d9ed](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/650d9ed))





## [8.6.3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.6.2...v8.6.3) (2018-12-26)

**Note:** Version bump only for package workspace.sprucebot-skills-kit





## [8.6.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.6.1...v8.6.2) (2018-12-26)

**Note:** Version bump only for package workspace.sprucebot-skills-kit





## [8.6.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.6.0...v8.6.1) (2018-12-21)

**Note:** Version bump only for package workspace.sprucebot-skills-kit





# [8.6.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.5.4...v8.6.0) (2018-12-21)


### Features

* make element configurable and pass props to rendered element ([e83ec66](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e83ec66))





## [8.5.4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.5.3...v8.5.4) (2018-12-21)

**Note:** Version bump only for package workspace.sprucebot-skills-kit





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


### Breaking Changes

* upgrade to node 10 and add flow support ([b696dfc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b696dfc))


### Bug Fixes

* remove flow from config files and gql helpers so production build runs ([13c7fd9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/13c7fd9))


### Features

* GraphQL ([73e6066](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/73e6066))
* Users and UserLocations queries; gql enhancements ([2d68c37](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2d68c37))





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
* better checkbox alignment ([1957d55](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1957d55))
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

**Note:** Version bump only for package workspace.sprucebot-skills-kit





## [8.3.3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.3.2...v8.3.3) (2018-12-18)

**Note:** Version bump only for package workspace.sprucebot-skills-kit





## [8.3.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.3.1...v8.3.2) (2018-12-18)


### Bug Fixes

* **node:** Update node and npm versions ([efe7126](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/efe7126))
* **prettier:** Use non-vscode config to configure prettier ([c5d8774](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c5d8774))





## [8.3.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.3.0...v8.3.1) (2018-12-16)


### Bug Fixes

* **heartwood:** Remove min-height from .main-content ([d1009b0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d1009b0))





# [8.3.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.2.1...v8.3.0) (2018-12-15)


### Bug Fixes

* [SBL-1491](https://sprucelabsai.atlassian.net/browse/SBL-1491) on eventblocks bring right-icons above title ([0ad772f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0ad772f))
* [SBL-1494](https://sprucelabsai.atlassian.net/browse/SBL-1494) update date picker icon to calendar without 17 on it ([2c03e18](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2c03e18))
* [SBL-1495](https://sprucelabsai.atlassian.net/browse/SBL-1495) update DOW format to be 3 letters ([fdd8827](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fdd8827))


### Features

* implement calendar event types in place of classes ([610b0bd](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/610b0bd))





## [8.2.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.2.0...v8.2.1) (2018-12-14)

**Note:** Version bump only for package workspace.sprucebot-skills-kit





# [8.2.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.1.5...v8.2.0) (2018-12-14)


### Features

* fix select styling and update colors ([f0220ea](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f0220ea))
* point skill to versioned stylesheet ([36dd001](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/36dd001))
* sync stylesheets to cdn ([f9735d7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f9735d7))





## [8.1.5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.1.4...v8.1.5) (2018-12-12)

**Note:** Version bump only for package workspace.sprucebot-skills-kit





## [8.1.4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.1.3...v8.1.4) (2018-12-11)

**Note:** Version bump only for package workspace.sprucebot-skills-kit





## [8.1.3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.1.2...v8.1.3) (2018-12-06)


### Bug Fixes

* export the form layout components ([9cb4093](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9cb4093))





## [8.1.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.1.1...v8.1.2) (2018-12-05)


### Bug Fixes

* [SB-1391](https://sprucelabsai.atlassian.net/browse/SB-1391) ([f66177a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f66177a))





## [8.1.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.1.0...v8.1.1) (2018-12-05)

**Note:** Version bump only for package workspace.sprucebot-skills-kit





# [8.1.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.0.2...v8.1.0) (2018-11-30)


### Features

* add message hbs ([592f60e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/592f60e))
* add variants ([77205e0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/77205e0))
* begin styling message ([077a25c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/077a25c))
* get class applied ([9f27937](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9f27937))





## [8.0.2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.0.1...v8.0.2) (2018-11-27)

**Note:** Version bump only for package workspace.sprucebot-skills-kit





## [8.0.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v8.0.0...v8.0.1) (2018-11-27)

**Note:** Version bump only for package workspace.sprucebot-skills-kit





# [8.0.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.9.1...v8.0.0) (2018-11-27)


### Breaking Changes

* v8 ([2601044](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2601044))





## [7.9.1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.9.0...v7.9.1) (2018-11-27)


### Breaking Changes

* 8.0 ([dce008d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/dce008d))


### Bug Fixes

* update nodemon https://www.npmjs.com/advisories/737 ([668246f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/668246f))





# [7.9.0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/compare/v7.8.3...v7.9.0) (2018-11-26)


### Breaking Changes

* add components ([23f4b8f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/23f4b8f))
* cleanup Sprucebot.js ([9e42d79](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9e42d79))
* delete deprecated components ([db13133](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/db13133))
* force webpack 4 to be used ([f9d61df](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f9d61df))
* New package names & heartwood! ([a250926](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a250926))
* Next major version ([c62f369](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c62f369))
* update exports ([2975810](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2975810))


### Bug Fixes

* Add _app.js, nix title in _document bug from Next7 migration ([bc2fcbc](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/bc2fcbc))
* bad events ([c9470d2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c9470d2))
* do not re-clear cache for skills-kit tests ([1e541ae](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1e541ae))
* drag and drop fixes ([a557023](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a557023))
* meta for mobile ([247f6b3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/247f6b3))
* progress ([9240771](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9240771))
* progress ([2a3041e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2a3041e))
* progress ([095e0fd](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/095e0fd))
* remove cache ([1dc9889](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1dc9889))
* tap drag to stop drag, remove cache ([0b45313](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0b45313))


### Documentation

* add a modal example ([7aef11a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7aef11a))
* add a note ([4f77a93](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4f77a93))
* add example of person card centered ([dc28e61](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/dc28e61))
* add heartwood ([85d8942](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/85d8942))
* add knobs to card ([d052c1d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d052c1d))
* add knobs to modal example ([564d4df](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/564d4df))
* add more proptype details ([d35887e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d35887e))
* add storybook addons ([9718442](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9718442))
* add tabs example ([1d3c097](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1d3c097))
* add withinfo addon ([75fb5a0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/75fb5a0))
* configure storybook ([5eb510e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5eb510e))
* expose more props to docs ([e1ad22c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e1ad22c))
* fix modal ([3555c29](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3555c29))
* make page wrapping a knob ([ca6f669](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ca6f669))
* remove stories directory ([e44ce38](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e44ce38))
* udpate modal ([55fb953](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/55fb953))
* update card story ([2b12748](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2b12748))
* update dropzone knobs ([437cda1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/437cda1))
* update for form compeontns and lists ([aa5aaad](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/aa5aaad))
* update knobs for avatar ([b9d462b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b9d462b))
* update proptype notes ([2398c4b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2398c4b))
* update readme ([6554ee0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6554ee0))
* update toast knobs ([4852599](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4852599))
* use FormRow component in Modal Example ([12a2591](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/12a2591))
* use knob for toast undos ([1338c60](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1338c60))


### Features

* add add icon ([30c4b2a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/30c4b2a))
* add an index for form elements ([16c2c5f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/16c2c5f))
* add avatar ([5a85874](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5a85874))
* add bot text ([76deca6](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/76deca6))
* add button group, start context menu, continue cards ([eae4a90](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/eae4a90))
* add card header ([62c1b18](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/62c1b18))
* Add controlled mode for slider component ([c0a649c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c0a649c))
* add date picker component ([e60f617](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e60f617))
* add error capture endpoint ([09564c5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/09564c5))
* add Event Details component ([5334f2a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5334f2a))
* add example of no results message ([6a39926](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6a39926))
* add header ([8378a42](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8378a42))
* Add heartwood style repo to workspace; Implement S3 deploy scripts for heartwood and storybook ([fd1c5db](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/fd1c5db))
* add icon component ([eb9aa27](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/eb9aa27))
* add icons and critical card example ([e97c256](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e97c256))
* add icons to user menu buttons ([4010961](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4010961))
* add image component and place card example ([9df5e8c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9df5e8c))
* add List ([932c891](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/932c891))
* add ListWrapper dumb component ([2d2f125](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2d2f125))
* add note ([31c119d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/31c119d))
* add onboarding card ([2def393](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2def393))
* add people card and pull some data into shared files ([8db477a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8db477a))
* add prop for icon if it is a line icon ([19ffaa0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/19ffaa0))
* add react-avatar-editor and start component ([c9234c9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c9234c9))
* add react-modal ([9d1f2ba](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9d1f2ba))
* add react-modal ([9114a1f](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9114a1f))
* add score card ([7b860c1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7b860c1))
* add sidebar ([ffb8f0d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ffb8f0d))
* add sidebar footer ([34fcbad](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/34fcbad))
* add small ([933d396](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/933d396))
* add sortable list ([9029e17](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9029e17))
* add stars ([c148ceb](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c148ceb))
* add text components ([317a235](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/317a235))
* add variations on image cropper ([9aca2ab](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9aca2ab))
* add View controller ([4b804d3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4b804d3))
* adjustments ([88ac442](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/88ac442))
* allow context menu to take a custom icon and fix close on any key ([8f2db12](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8f2db12))
* build ([eda2e39](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/eda2e39))
* build ([52bd516](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/52bd516))
* build ([13127f8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/13127f8))
* build ([b19c9e8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b19c9e8))
* build ([5dc09fe](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5dc09fe))
* build ([2ee3fcf](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2ee3fcf))
* build ([dde8c5c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/dde8c5c))
* build context menu ([dbcf93b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/dbcf93b))
* build latest ([a1ba6f3](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a1ba6f3))
* button updates ([69cdbb2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/69cdbb2))
* change for to htmlFor ([9922fa1](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/9922fa1))
* change to controllor for date picker ([87ec175](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/87ec175))
* clear and reinstall node modules ([17b9040](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/17b9040))
* finish avatar ([79fc2cd](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/79fc2cd))
* fix for sub list item nesting and detecting current parent ([5245a33](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5245a33))
* fix helmet so that fonts load ([5ab4bb9](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/5ab4bb9))
* fix nesting ([76f91b0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/76f91b0))
* fix pagination behavior ([e0558f7](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e0558f7))
* fix settings list item and update heartwood ([604b661](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/604b661))
* fix typo ([857163c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/857163c))
* fix typo ([98c398b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/98c398b))
* hide context menu on click outside or escape ([8208e69](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8208e69))
* hook up jump events in pagination component ([7aa6ebf](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/7aa6ebf))
* ignore ds_store ([b7d9078](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/b7d9078))
* improve handling of line icons ([99ceffa](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/99ceffa))
* improve sidebar management ([be77936](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/be77936))
* incorporate next link into button component ([d01cfe8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d01cfe8))
* make buttons self-blur by default ([d33d582](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/d33d582))
* make image cropper example work ([6713dff](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6713dff))
* make sidebar collapsible ([ccce92a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ccce92a))
* make sidebar dumb so that view controls layout ([101b3cd](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/101b3cd))
* make storybook work and build ([6aef163](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/6aef163))
* make tabbed list work ([8fc0d88](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8fc0d88))
* make user menu toggleable ([3e67b95](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/3e67b95))
* Prevent missing stylesheets from breaking storybook ([25830e2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/25830e2))
* props update ([83233df](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/83233df))
* pull out render suggestion functionality, add clear input button on blur ([e4dd77a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e4dd77a))
* put button group in context menu ([0dfb7c5](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/0dfb7c5))
* rearrange card pieces ([4136ba4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4136ba4))
* reinstall storybook ([2552c20](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/2552c20))
* remove log ([8dee7cf](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8dee7cf))
* remove log ([e9a11b2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/e9a11b2))
* rename prop ([4f06d1a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4f06d1a))
* rename to bigcalendar ([8a3f14a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/8a3f14a))
* run build manually ([93fd583](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/93fd583))
* start adding logs ([165ed1e](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/165ed1e))
* stub onboarding card ([59f68c4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/59f68c4))
* styling for context menu icon ([cc9c9b2](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/cc9c9b2))
* toasts ([4070777](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4070777))
* update button group to be smarter about which types of button to return ([344bc19](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/344bc19))
* update for date picker styles ([1428000](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/1428000))
* update heartwood ([026ae19](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/026ae19))
* update heartwood ([72689d0](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/72689d0))
* update heartwood ([aa897f4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/aa897f4))
* update heartwood ([99cfb7d](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/99cfb7d))
* update heartwood ([cbf4579](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/cbf4579))
* update heartwood ([838084a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/838084a))
* update heartwood ([a915a47](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/a915a47))
* update heartwood ([f973b8c](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/f973b8c))
* update heartwood and fix some stylsheet references ([44e41ca](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/44e41ca))
* update heartwood and index ([ffd71ff](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/ffd71ff))
* update heartwood version ([18f92e8](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/18f92e8))
* update how flow types are shared to work with storybook info addon ([969cf1b](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/969cf1b))
* update index ([163ef58](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/163ef58))
* update index ([bbb1db4](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/bbb1db4))
* update indices ([330b800](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/330b800))
* update snapshot ([4e2960a](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/4e2960a))
* user menu improvements ([c0bd9ba](https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/commit/c0bd9ba))





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
