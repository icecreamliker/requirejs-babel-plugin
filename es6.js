/**
 * Author: Lee Yao <yaoli111144@gmail.com>
 * Version: 0.5.0
 * License: MIT
 */

define(['babel', 'module'], function(babel, _module) {

    'use strict';

    var fetchText, buildMap = {};
    if (typeof window !== "undefined" && window.navigator && window.document) {
        fetchText = function(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function(evt) {
                // Do not explicitly handle errors, those should be
                // visible via console output in the browser.
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            };
            xhr.send(null);
        };
    } else if (typeof process !== "undefined" &&
        process.versions &&
        !!process.versions.node) {
        // Using special require.nodeRequire, something added by r.js.
        fs = require.nodeRequire('fs');
        fetchText = function(path, callback) {
            callback(fs.readFileSync(path, 'utf8'));
        };
    }

    return {
        version: '0.5.0',

        load: function(name, req, onload, config) {

            var 
              pluginOptions = config.es6 || {},
              fileExtension = pluginOptions.fileExtension || '.js',
              pathToRoot = pluginOptions.pathToRoot || './',  
              sourceFileName = name + fileExtension,
              url = req.toUrl(sourceFileName);

            if (!config.isBuild) {
              try{
                //use of eval because firefox would not even allow to parse es6.js if not
                eval('import(pathToRoot+name+fileExtension).then(onload).catch(function(err){console.log(err,"\\r\\ncheck your pathToRoot config in es6")});');
                return;
              }catch(e){
                console.log('native import() failed, babelise the file '+url)  
              }
            }

            var babelOptions;
            try {
                // Deep clone babel config (#7)
                babelOptions = JSON.parse(JSON.stringify(config.babel));
                // clone callbacks from babel config manually
                var callbackNames = ['getModuleId', 'resolveModuleSource', 'shouldPrintComment', 'wrapPluginVisitorMethod'];
                callbackNames.forEach(function(key) {
                    babelOptions[key] = config.babel[key];
                })
            } catch (err) {
                babelOptions = {}
                onload.error(err);
            }

            // Do not load if it is an empty: url
            if (url.indexOf('empty:') === 0) {
                onload();
                return;
            }

            var defaults = {
                sourceMaps: config.isBuild ? false : 'inline',
                sourceFileName: sourceFileName
            };
            for (var key in defaults) {
                babelOptions[key] = defaults[key];
            }

            fetchText(url, function(text) {
                try {
                    var code = babel.transform(text, babelOptions).code;
                } catch (err) {
                    onload.error(err);
                }

                if (config.isBuild) {
                    buildMap[name] = code;
                }

                onload.fromText(code);
            });
        },

        write: function(pluginName, moduleName, write) {
            if (moduleName in buildMap) {
                write.asModule(pluginName + '!' + moduleName, buildMap[moduleName]);
            }
        }
    }
});
