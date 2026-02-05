# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.1.1](https://github.com/Vity01/backstage-xkcd/compare/v1.0.11...v1.1.1) (2026-02-05)

#### Features

* **deps**: Upgrade all Backstage dependencies to latest versions
  * @backstage/cli: ^0.22.5 → ^0.35.3
  * @backstage/core-components: ^0.12.5 → ^0.18.6
  * @backstage/core-plugin-api: ^1.5.0 → ^1.12.2
  * @backstage/core-app-api: ^1.6.0 → ^1.19.4
  * @backstage/plugin-home-react: ^0.1.6 → ^0.1.34
  * @backstage/dev-utils: ^1.0.6 → ^1.1.19
  * @backstage/test-utils: ^1.2.6 → ^1.7.14
  * @backstage/theme: ^0.2.18 → ^0.7.1
* **deps**: Upgrade @material-ui/lab: 4.0.0-alpha.57 → ^4.0.0-alpha.61
* **deps**: Upgrade testing libraries
  * @testing-library/dom: ^9.0.0 → ^10.0.0
  * @testing-library/jest-dom: ^5.16.5 → ^6.6.3
  * @testing-library/react: ^12.1.4 → ^16.0.0
  * @testing-library/user-event: ^14.4.3 → ^14.0.0
* **deps**: Upgrade React to ^18.0.2 and react-dom to ^18.0.2
* **deps**: Upgrade react-router-dom to ^6.30.2
* **deps**: Upgrade other dependencies
  * cross-fetch: ^3.1.5 → ^4.0.0
  * msw: ^0.49.0 → ^1.0.0
* **core**: Migrate ComicButtons from JSX to TypeScript ([src/components/ComicButtons/ComicButtons.tsx](src/components/ComicButtons/ComicButtons.tsx))
* **core**: Add centralized configuration constants ([src/config.ts](src/config.ts))
  * `XKCD_PROXY_PATH` - API proxy path constant (`/proxy/xkcd-proxy/`)
  * `DEFAULT_MAX_COUNT` - Default maximum comic count (3202)
  * `LAST_INDEX` - Constant for latest comic (-1)
  * `XKCD_URLS` - URL builders for comic and explain links
* **core**: Export `HomePageXkcdComic` component for customizable homepage integration
* **core**: Implement `XkcdApiResponse` interface for better type safety
* **feature**: Add `title` prop to XkcdComicCard for custom card titles
* **a11y**: Add aria-labels to all navigation buttons for screen reader support
* **docs**: Add JSDoc comments to exported components and functions
* **perf**: Add useCallback optimization for gotoRandom function

#### Bug Fixes

* **error-handling**: Add HTTP response status check in fetch operations
* **error-handling**: Improve error handling with proper error messages and try-catch blocks
* **types**: Remove dangerous non-null assertions (!!)
* **types**: Add proper return types to async functions (Promise<void>)
* **state**: Replace mutable exported MAX_COUNT with proper React state management
* **deps**: Add proper dependency array to useEffect [num, config, fetch]
* **logic**: Improve conditional rendering logic in XkcdComicCard

#### Code Quality

* **refactor**: Convert all JSX components to TypeScript
* **refactor**: Remove mutable exports and use proper state
* **refactor**: Improve conditional rendering logic
* **refactor**: Use centralized constants instead of hardcoded values
* **style**: Add proper TypeScript interfaces for all props
* **style**: Improve code organization and readability

#### DevOps

* **ci**: Update GitHub Actions checkout to v4
* **ci**: Update GitHub Actions setup-node to v4
* **ci**: Upgrade Node.js version from 18.x to 20.x in CI/CD workflows
* **ci**: Add Yarn cache to speed up builds in workflows
* **ci**: Update coveralls action to v2 (commented)
* **lint**: Add .eslintignore to exclude generated files

#### Documentation

* **docs**: Add UPGRADE_SUMMARY.md with technical upgrade details
* **docs**: Add UPGRADE_COMPLETE.md with comprehensive upgrade summary
* **docs**: Update CHANGELOG.md with all changes

### [1.0.11](https://github.com/Vity01/backstage-xkcd/compare/v1.0.10...v1.0.11) (2024-04-22)

### [1.0.10](https://github.com/Vity01/backstage-xkcd/compare/v1.0.9...v1.0.10) (2024-04-19)

### [1.0.9](https://github.com/Vity01/backstage-xkcd/compare/v1.0.8...v1.0.9) (2024-01-02)


### Bug Fixes

* Depend on @backstage/plugin-home-react ([#6](https://github.com/Vity01/backstage-xkcd/issues/6)) ([145dfff](https://github.com/Vity01/backstage-xkcd/commit/145dfff1479206eda3b168ad1d61eefa4d262b4f))

### [1.0.8](https://github.com/Vity01/backstage-xkcd/compare/v1.0.7...v1.0.8) (2023-10-06)

### [1.0.7](https://github.com/Vity01/backstage-xkcd/compare/v1.0.6...v1.0.7) (2023-05-17)

### [1.0.6](https://github.com/Vity01/backstage-xkcd/compare/v1.0.5...v1.0.6) (2023-05-10)

### [1.0.5](https://github.com/Vity01/backstage-xkcd/compare/v1.0.4...v1.0.5) (2023-05-05)

### [1.0.4](https://github.com/Vity01/backstage-xkcd/compare/v1.0.3...v1.0.4) (2023-05-04)

### [1.0.3](https://github.com/Vity01/backstage-xkcd/compare/v1.0.2...v1.0.3) (2023-05-04)

### [1.0.2](https://github.com/Vity01/backstage-xkcd/compare/v1.0.1...v1.0.2) (2023-05-04)

### 1.0.1 (2023-05-04)

# Version 1.0
- first release
