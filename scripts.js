var request = new XMLHttpRequest();
request.open("GET", "data.json", false);
request.send(null);
var obj = JSON.parse(request.responseText);

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
	if (results.length>0) {
		for(i=0; i<results.length; i++) {
			document.getElementById('moduleCode' + i.toString()).innerHTML = results[i].moduleCode;
			document.getElementById("moduleLink" + i.toString()).href = "https://portal.st-andrews.ac.uk/catalogue/" + results[i].moduleLink;
			document.getElementById("year" + i.toString()).innerHTML = results[i].year;
			document.getElementById("title" + i.toString()).innerHTML = results[i].title;
		}
	}
	else {
		document.getElementById('results').innerHTML = '<a href="#" target="_blank" id="moduleLink0"><h1 id="moduleCode0"></h1></a><h1 id="year0"></h1><h1 id="title0"></h1><a href="#" target="_blank" id="moduleLink1"><h1 id="moduleCode1"></h1></a><h1 id="year1"></h1><h1 id="title1"></h1>';
	}
}

