$(document).ready(function() {
	var urlstring = window.location.href;

	urlstring = urlstring.split("/");
	urlstring = urlstring.pop();

	if(sessionStorage.getItem(urlstring) != "true") {
		$(".background").fadeIn(1000);
		$(".fade").hide().delay(500).fadeIn(1000);
		$(".fade2").hide().delay(2000).fadeIn(1000);
		sessionStorage.setItem(urlstring, "true");
	}
	else {
		$(".background").show();
	}
});

// $(document).ready(function() {
//    $(".fade").hide(0).delay(1000).fadeIn(1000);
// });

// $(document).ready(function() {
//    $(".fade2").hide(0).delay(2000).fadeIn(1000);
// });