/**
 * Author: Lee Yao <yaoli111144@gmail.com>
 * Version: 0.1.1
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
                //Do not explicitly handle errors, those should be
                //visible via console output in the browser.
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            };
            xhr.send(null);
        };
    } else if (typeof process !== "undefined" &&
        process.versions &&
        !!process.versions.node) {
        //Using special require.nodeRequire, something added by r.js.
        fs = require.nodeRequire('fs');
        fetchText = function(path, callback) {
            callback(fs.readFileSync(path, 'utf8'));
        };
    }

    return {
        version: '0.1.1',

        load: function(name, req, onload, config) {

            var babelOptions = config.babel || {},
                fileExtension = babelOptions.fileExtension || '.js',
                url = req.toUrl(name + fileExtension);

            var defaults = {
                modules: babelOptions.modules || 'common',
                sourceMap: config.isBuild ? false : 'inline',
                sourceFileName: name
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
