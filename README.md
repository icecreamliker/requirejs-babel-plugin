# requirejs-babel-plugin

[![npm](https://img.shields.io/npm/dm/requirejs-babel-plugin.svg)](https://www.npmjs.com/package/requirejs-babel-plugin)
[![npm](https://img.shields.io/npm/dt/requirejs-babel-plugin.svg)](https://www.npmjs.com/package/requirejs-babel-plugin)
[![npm](https://img.shields.io/npm/v/requirejs-babel-plugin.svg)](https://www.npmjs.com/package/requirejs-babel-plugin)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/icecreamliker/requirejs-babel-plugin/blob/master/LICENSE)

A better RequireJS plugin for babel

Installation
---

```
  $ npm install requirejs-babel-plugin
```
or

```
  $ npm install -g bower
  $ bower install requirejs-babel-plugin
```

Usage
---

Add the paths to configuration:

```javascript
  paths: {
    es6: 'your_file_path/es6',
    babel: 'your_babel_file_path',
    ...
  }
```

Reference files via the es6! plugin name:
```javascript
  define(['es6!your_es6_module'], function(module) {
    // ...
  });
```

When optimizing the source code with r.js, exclude the babel and plugin:
```javascript
  modules: [{
    "name": "your_entry_file"
  }],
  stubModules: ['babel', 'es6'] // Stub out the modules
```

Options
---

**Babel 6.x**

```javascript
  requirejs.config({
    es6: {
      fileExtension: '.js' // put in .jsx for JSX transformation
    },
    babel: {
      presets: ['es2015'],
      plugins: ['transform-es2015-modules-amd']
    }
  });
  
```

**Babel 5.x**

```javascript
  requirejs.config({
    es6: {
      fileExtension: '.js' // put in .jsx for JSX transformation
    },
    babel: {
      blacklist: [],
      nonStandard: true,
      modules: 'amd'
    }
  });
  
```
See more: https://babeljs.io/docs/usage/options/

License
---

requirejs-babel-plugin is available under the terms of [the MIT license](LICENSE).



