(function($) {
	function nano(template, data) {
		return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
			var keys = key.split("."),
				v = data[keys.shift()];
			for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
			return (typeof v !== "undefined" && v !== null) ? v : "";
		});
	}
	$.fn.NanoTE = function(url, data, type, func, arg) {
		var s_obj = this;
		var template = s_obj.html();
		s_obj.html("");
		if (type == undefined) type = "get";
		$.ajax({
			dataType: "json",
			type: type,
			data: data,
			url: url,
			success: function(responseData, status, xhr){
				$.each(responseData.list, function(i, item) {
					s_obj.append(nano(template, item));
				});
				if (responseData.status != 1)
					s_obj.attr("data-error", responseData.status + ':' + responseData.mes);
				if (func != undefined) 
					eval(func + "('" + arg + "');");
				//console.log(responseData);
			}	
		}).fail(function(xhr, status, err) {
			s_obj.attr("data-error", status + ':' + err);
		});
	}
}(jQuery));