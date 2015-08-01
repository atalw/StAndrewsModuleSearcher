var request = require('request'),
	cheerio = require('cheerio'),
	fs = require('fs'),
	rows = [];


request('https://portal.st-andrews.ac.uk/catalogue/Search?dept=xxALL&level=ALL', function(err, resp, body) {
	if( !err && resp.statusCode == 200) {
		var $ = cheerio.load(body);
		$('tbody tr', '#content').each(function(i, tr) {
			var child = $(this).children();
			var moduleCode = child.eq(0);
			var moduleLink = child.eq(0).children().eq(0);
			var year = child.eq(1);
			var title = child.eq(2);
			var row = {
				"moduleCode": moduleCode.text(),
				"moduleLink": moduleLink.attr('href'),
				"year": year.text(),
				"title": title.text(),
			};
			rows.push(row);
		});
		fs.writeFile('data.json', JSON.stringify(rows, null, 4), function(err) {
			console.log("successful");
		})
	}
});
