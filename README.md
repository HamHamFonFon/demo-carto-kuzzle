Demonstration cartographie avec Kuzzle
===================

[![Build Status](https://travis-ci.org/HamHamFonFon/demo-carto-kuzzle.svg?branch=develop)](https://travis-ci.org/HamHamFonFon/demo-carto-kuzzle)

Plugin Status
-------------
Beta stage of development : v. 0.2.0

Requirements
-------------
 - [NodeJS (4.x min) and NPM](https://nodejs.org/en/)
 - [A Kuzzle instance](http://kuzzle.io/guide/), [installation](https://github.com/kuzzleio/kuzzle#installation)


 Installation
-------------
```
// Clone the repository
git clone git@github.com:HamHamFonFon/demo-carto-kuzzle.git
cd demo-carto-kuzzle

// Installation of dependencies
npm install
```

 Build
-------------
Compile the script with
```
npm run webpack
```

Launch htpp server : 
```
npm run start
```

Finally go to http://localhost:3333

Only for developpers
------------
You want using browserify also webback:


```
npm install --save-dev browserify transform-es2015-modules-commonjs
```

in package.json, add :

```
"scripts": {
    "browserify": "browserify -e --transform [ babelify --plugins [ transform-es2015-modules-commonjs ] ] ./dist/src/app.js -o ./public/main.browserify.js",
}
```

And run
```
npm run browserify
```


Sources
-------
Installation webpack : https://webpack.js.org/guides/code-splitting-import/#usage-with-babel