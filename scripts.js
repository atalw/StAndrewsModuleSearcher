var request = new XMLHttpRequest();
request.open("GET", "data1.json", false);
request.send(null);
var obj = JSON.parse(request.responseText);
var div = document.getElementById("result");

function search() {
	var results = [];
	var input = document.getElementById('search').value;
	var searchField = "moduleCode";
	var searchVal = input.toUpperCase();
	for (var i=0; i<obj.length; ++i) {
		if (obj[i][searchField] == searchVal) {
			results.push(obj[i]);
		}
	}
	if (results.length > 1) {
		document.getElementById('results').innerHTML = '';
		for (i=0; i<results.length; i++) {
			document.getElementById("results").appendChild(div.cloneNode(true));
		}
		for(i=0; i<results.length; i++) {
			for (var key in results[i]) {
				if(results[i].hasOwnProperty(key)) {
					if (key == "moduleCode") {
						var detail = '<a href="#"><h1 name="' + key + '">' + key + ' ' + results[i][key] + '</h1></a>';
						console.log('here');
						document.getElementsByName("result")[i].innerHTML = document.getElementsByName("result")[i].innerHTML + detail;
					}
					if (key == "moduleLink") {
						document.getElementsByName("moduleCode")[i].href = results[i][key];
					}
					else {
						var detail = '<h1 name="' + key + '">' + key + ' ' + results[i][key] + '</h1>';
						document.getElementsByName("result")[i].innerHTML = document.getElementsByName("result")[i].innerHTML + detail;
					}
				}
			}
		}
	}
}

