'use strict';

var $ = require('jquery');

// enable cookie
require('jquery.cookie');

// enable placeholder support for older browsers
require('jquery.placeholder');
$('input, textarea').placeholder();

// enable fastclick
var attachFastClick = require('fastclick');
attachFastClick(document.body);

// enable foundation
require('foundation');
$(document).foundation();