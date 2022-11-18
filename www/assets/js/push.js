onmessage = function(e) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			res=JSON.parse(this.responseText);
			if (res.status==1)
				postMessage(res.mes);
		}
	};
	xhttp.open("GET",e.data[0],true);	
	xhttp.send();
}