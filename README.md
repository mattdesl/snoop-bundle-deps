# snoop-bundle-deps

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Finds all npm modules used by a browserify bundle. 

```js
var snoop = require('snoop-bundle-deps')
var fs = require('fs')

var bundle = fs.readFileSync(__dirname+'/bundle.js')

//get an array of public npm dependencies used in bundle
snoop(bundle, function(err, deps) {
  if (err) throw err
  console.log(deps)
  // -> ['eases', 'object-assign', 'url', 'xtend']
})
```

Ignores relative requires, de-duplicates paths like `"xtend/mutable.js"` to their base packages, and filters out any modules that cannot be found on npm. Uses [a cache](https://github.com/zeke/all-the-package-names) to avoid querying the database for popular module names.

Can also be used via [CLI](#cli):

```sh
snoop-bundle-deps -p < my-svg-app.js
dependencies [5]
├── abs-svg-path
├── adaptive-bezier-curve
├── normalize-svg-path
├── svg-path-contours
└── vec2-copy
````

## Usage

[![NPM](https://nodei.co/npm/snoop-bundle-deps.png)](https://www.npmjs.com/package/snoop-bundle-deps)

### API

#### `snoop(src, [opt], callback)`

Snoops the `src` bundle. Options are passed to [filter-npm-modules](https://www.npmjs.com/package/filter-npm-modules), but using a default cache to avoid common DB queries. 

Calls the function with `(err, deps)` where `deps` is an array of sorted and de-duplicated npm package names.

### CLI

The CLI takes a bundle in stdin and writes JSON array to stdout. Or, you can pretty-print with shell pipes.

```
Usage:
  snoop-bundle-deps [opts] < bundle.js

Options:
  --pretty, -p   pretty-print the results
```

### in the wild

This could even be used for minified bundles in the wild. For example, as of April 2015, [Yahoo Play](https://screen.yahoo.com/play/) is using roughly 77 public npm modules in its primary bundle.

```sh
curl https://screen.yahoo.com/play/bundle.js | snoop-bundle-deps -p
dependencies [77]
├── asn1.js
├── asn1.js-rfc3280
├── async-cache
├── base64-js
├── blast-text
├── bn.js
├── brorand
├── browserify-aes
├── browserify-rsa
  ...
```

[(full list)](https://gist.github.com/mattdesl/429baa59932d72523f3f)

This will not work on modules compressed with `bundle-collapser`.

Related:

- [scrape-scripts](https://www.npmjs.com/package/scrape-scripts)
- [is-browserify-bundle](https://www.npmjs.com/package/is-browserify-bundle)


## License

MIT, see [LICENSE.md](http://github.com/mattdesl/snoop-bundle-deps/blob/master/LICENSE.md) for details.
