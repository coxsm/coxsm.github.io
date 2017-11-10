$(document).ready(function(){
    $('.brand-name').hide();
});

//jQuery to collapse the navbar on scroll
$(window).bind('scroll', function () {
    if ($(window).scrollTop() > 100) {
        $('.navbar').addClass('nav-purple');
        $('.brand-name').show();
    } else {
        $('.navbar').removeClass('nav-purple');
        $('.brand-name').hide();
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('.the-one-wrapper-to-rule-them-all').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
