# requirejs-babel-plugin
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

Customize the babel options:

```javascript
  requirejs.config({
    es6: {
      fileExtension: '.js' // put in .jsx for JSX transformation
    },
    babel: {
      blacklist: [],
      nonStandard: true,
      ...
    }
  });
  
```
See more: https://babeljs.io/docs/usage/options/

License
---

requirejs-babel-plugin is available under the terms of [the MIT license](LICENSE).



