(function() {
	function getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i = 0; i <ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) === ' ') {
	            c = c.substring(1,c.length);
	        }
	        if (c.indexOf(name) === 0) {
	            return c.substring(name.length,c.length);
	        }
	    }
	    return "";
	}

	var cval = getCookie('board_effect_nonprofit_laws'),
		redirectURL = "http://www.boardeffect.com/nonprofits-laws-board-rules-and-regulations/";
	/*if (cval!=="") {
		window.location = redirectURL;
		location = redirectURL;
	}*/

	if(document.cookie.indexOf("board_effect_nonprofit_laws") == -1) {
		//window.location = redirectURL;
		//location = redirectURL;
		/*var sKey = "board_effect_nonprofit_laws";
		console.log(' --- ' + getCookie('board_effect_nonprofit_laws'));
		console.log(' --- ' + document.cookie.split(';'));
    	console.log(decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null);

    	var theCookies = document.cookie.split(';');
	    var aString = '';
	    for (var i = 1 ; i <= theCookies.length; i++) {
	        aString += i + ' ' + theCookies[i-1] + "\n";
	    }

	    return aString;
	    */
	} else {
		console.log('match cookie');
		window.location = redirectURL;
		location = redirectURL;
	}

	//console.log('get the cookie = ' + document.cookie.indexOf("board_effect_nonprofit_laws"));
})();