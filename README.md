# txa

> TypeScript for Automation, aka `osascript -l TypeScript`
> JXA is "JavaScript for Automation", so TXA is "TypeScript for Automation"

[![Build Status](https://img.shields.io/travis/magicdawn/txa.svg?style=flat-square)](https://travis-ci.org/magicdawn/txa)
[![Coverage Status](https://img.shields.io/codecov/c/github/magicdawn/txa.svg?style=flat-square)](https://codecov.io/gh/magicdawn/txa)
[![npm version](https://img.shields.io/npm/v/txa.svg?style=flat-square)](https://www.npmjs.com/package/txa)
[![npm downloads](https://img.shields.io/npm/dm/txa.svg?style=flat-square)](https://www.npmjs.com/package/txa)
[![npm license](https://img.shields.io/npm/l/txa.svg?style=flat-square)](http://magicdawn.mit-license.org)

## Install

```sh
$ pnpm add -g txa
```

## Usage

### `txa <file>`

bundle and execute a file, ES module can be used

use as Shebang

```ts
#!/usr/bin/env txa
```

### `txa build <file> <output>`

bundle file to output, output can be a dir or a js file

## Tips

### types

```sh
# install
$ pnpm add -D @jxa/globle-type
```

then use `reference` so you get editor intellisense

```ts
/// <reference types='@jxa/global-type' />
```

### eslint

```js
/* eslint-env applescript */
```

## API

```js
const txa = require('txa')
```

## Changelog

[CHANGELOG.md](CHANGELOG.md)

## License

the MIT License http://magicdawn.mit-license.org
