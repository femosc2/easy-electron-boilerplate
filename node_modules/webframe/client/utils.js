function request(method, path, payload, cb) {
	var xhr = new XMLHttpRequest();
	xhr.open(method, path);
	xhr.overrideMimeType("text/plain; charset=x-user-defined");
	xhr.send(payload);

	xhr.addEventListener("load", function() {
		if (cb)
			cb(null, xhr.responseText);
	});
	xhr.addEventListener("abort", function() {
		if (cb)
			cb(new Error("Aborted"));
	});
	xhr.addEventListener("error", function() {
		if (cb)
			cb(new Error("Error"));
	});

	return xhr;
}

function get(path, cb) {
	return request("GET", path, null, cb);
}

function post(path, payload, cb) {
	return request("POST", path, payload, cb);
}

window.$$ = document.querySelector.bind(document);
window.request = request;
window.get = get;
window.post = post;
