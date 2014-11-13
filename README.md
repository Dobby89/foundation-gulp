#Foundation 5 - Gulp Boilerplate

## Key Features
* Compiles and concatenates Foundation's Sass files, Foundation's iconfont and your own Sass files.
* Concatenates Foundation's JavaScript and your own JavaScript using Browserify.
* Watches for changes to styles, scripts and images.
* Serves the files.

## Getting Started

Install Node packages:
```
$ npm install
```

Install Bower components:
```
$ bower install
```

Install Ruby Gems:
```
// This exact combination of sass and compass is the only one which seems to work with Foundation (see: http://foundation.zurb.com/forum/posts/18630-scss-compiles-but-resulting-css-file-incomplete)
$ gem install sass --version 3.2.9
$ gem install compass --version 0.12.7
```

Compile and process styles and scripts (with browserify):
```
$ gulp
```

## Watch Assets

To watch for changes to styles, scripts and images:
```
$ gulp watch
```

To ONLY watch styles:
```
$ gulp watch:styles // Currently using gulp-compass, but a dormant libsass task is available
```

To ONLY watch scripts:
```
$ gulp watch:scripts
```

## Serve

To serve static files from base directory or as a proxy server (as `127.0.0.1:8000` or something like `yourlocal.dev`):
```
$ gulp serve // Uses BrowserSync - further config may be required
```