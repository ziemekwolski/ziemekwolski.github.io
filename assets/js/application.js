

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

