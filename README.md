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
    ...
  }
```

Reference files via the es6! plugin name:
```javascript
  define(['es6!your-es6-module'], function(module) {
    // ...
  });
```

Options
---

Customize the babel options:

```javascript
  
```



