// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require bigslide
//= require fastclick.min
//= require modernizr.custom.min
//= require retina.min.js
//= require_tree ./main



$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});

$(function() {
  var link = ["<a class='btn btn-default button-zm button-zm--contact' href='", "ma", "ilto:",  "ziemek", "@", "zmwolski.com", "'>","Contact Me","</a>"];
  $("#contact-home").html(link.join(""));

  $(".scroll-to-js").click(function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $($(this).attr("href")).offset().top - 100
    }, 700);
  });
});

