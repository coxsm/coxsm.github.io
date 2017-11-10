$(document).ready(function() {
    if ($(window).scrollTop() > 100) {
        $('.navbar').addClass('nav-purple shadow-no-hover');
    }
});

//jQuery to collapse the navbar on scroll
$(window).bind('scroll', function () {
    if ($(window).scrollTop() > 100) {
        $('.navbar').addClass('nav-purple shadow-no-hover');
        // $('.brand-name').show();
    } else {
        $('.navbar').removeClass('nav-purple shadow-no-hover');
        $('.brand-name').hide();
    }
});

$(document).ready(function(){
    // Add smooth scrolling to all links
    $(".nav-link").on('click', function(event) {
  
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top-70
        }, 400, function(){

        });
      } // End if
    });
  });
