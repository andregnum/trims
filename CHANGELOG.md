# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](https://github.com/andregnum/trims/compare/v1.1.0...v2.0.0) (2026-02-08)


### ⚠ BREAKING CHANGES

* **auth-service:** prisma.service now requires manual adapter due to V7 ESM changes

### Features

* **auth-logger:** add logger with pino ([909c1fc](https://github.com/andregnum/trims/commit/909c1fc717b2c1477e6752b34a5273a89a558ab1))
* **auth-service:** add auth-service ([c707be1](https://github.com/andregnum/trims/commit/c707be13d39df82e3dfba33475fd20ab41d900c3))
* **auth-user:** user module, implement simple create user ([09cb87e](https://github.com/andregnum/trims/commit/09cb87e2e8be8a8063084c1cd9244c9f8fae6c6a))


### build

* **auth-service:** prisma-v7 config with ESM ([5a77ebc](https://github.com/andregnum/trims/commit/5a77ebcc240b2f4c980024fd1bc3994e5c30ddb3))

## 1.1.0 (2025-11-20)


### Features

* add comprehensive .gitignore for monorepo ([bb54f19](https://github.com/andregnum/trims/commit/bb54f194aed799d6e6ea7a968609d4eb528e2809))


### Bug Fixes

* remove build files dependencies from git tracking ([c82740d](https://github.com/andregnum/trims/commit/c82740d35505825b66fcdc4a84272b27bb6981f2))
