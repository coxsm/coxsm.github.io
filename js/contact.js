$(document).ready(function() {
	$("#contactSubmit").click(function(e) {
		$(".error").hide();

		var nam = $("#contactName").val();
		if(nam == "") {
			$("#contactName").prev().show();
			return false;
		}
		var ema = $("#contactEmail").val();
		if (!isValidEmailAddress(ema) || ema == "") {
	        $("#contactEmail").prev().show();
        	return false;  
    	}
    	var cont = $("#contactContent").val();
		if(cont == "") {
			$("#contactContent").prev().show();
			return false;
		}

		$.ajax({  
			type: "POST",  
			url: "php/contact.php",
			data: { "content" : cont, "email" : ema, "name" : nam },
			success: function() {
    			$("#contact").hide();
				$("#formSuccess").show();
     		}
		});
		return false;
	});

	function isValidEmailAddress(emailAddress) {
	    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
	    return pattern.test(emailAddress);
	};

});