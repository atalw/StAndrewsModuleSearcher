var request = new XMLHttpRequest();
request.open("GET", "data.json", false);
request.send(null);
var obj = JSON.parse(request.responseText);

function search() {
	var results = [];
	var input = document.getElementById('moduleSearcher').value;
	var searchField = "moduleCode";
	var searchVal = input.toUpperCase();
	for (var i=0; i<obj.length; ++i) {
		if (obj[i][searchField] == searchVal) {
			results.push(obj[i]);
		}
	}
	for(i=0; i<=results.length; i++) {
		document.getElementById('moduleCode' + i.toString()).innerHTML = results[i].moduleCode;
		document.getElementById("moduleLink" + i.toString()).href = "https://portal.st-andrews.ac.uk/catalogue/" + results[i].moduleLink;
		document.getElementById("year" + i.toString()).innerHTML = results[i].year;
		document.getElementById("title" + i.toString()).innerHTML = results[i].title;
	}
}

