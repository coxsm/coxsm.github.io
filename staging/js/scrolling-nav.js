//jQuery to collapse the navbar on scroll
$(window).bind('scroll', function () {
    if ($(window).scrollTop() > 100) {
        $('.navbar').addClass('nav-purple');
    } else {
        $('.navbar').removeClass('nav-purple');
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
