# imagemin-dir

Wrapper module for preserving directory structure when using [`imagemin`](https://github.com/imagemin/imagemin).

## Motivation

`imagemin` outputs files to a single directory based on its `destination` option. There isn't currently an option to preserve the directory structure of the images that are outputted. This is being discussed in a [longstanding issue](https://github.com/imagemin/imagemin/issues/191). Bespoke workarounds and [pull requests](https://github.com/imagemin/imagemin/pull/192) have been suggested as stop-gap solutions. This module aims to [ponyfill](https://github.com/sindresorhus/ponyfill) the functionality without patching `imagemin`'s native API.

## Install

Install `imagemin` and `imagemin-dir`:

```
npm install imagemin imagemin-dir --save-dev
```

\*This package doesn't include `imagemin` as a dependency. This allows you to bring your own version of the package as required.

## Usage

`imagemin-dir` can be used as a drop-in replacement for `imagemin`:

```js
const imagemin = require("imagemin-dir"); // alternative to imagemin
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");

(async () => {
  const files = await imagemin(["images/*.{jpg,png}"], {
    destination: "build/images",
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8]
      })
    ]
  });

  console.log(files);
  //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
})();
```

## API

`imagemin-dir` maintains the same API as `imagemin`. See [https://github.com/imagemin/imagemin](https://github.com/imagemin/imagemin#api).
