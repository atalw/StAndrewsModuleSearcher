var request = require('request'),
	cheerio = require('cheerio'),
	fs = require('fs'),
	allModules = [],
	rows = [];

var moduleLink;
request('https://portal.st-andrews.ac.uk/catalogue/Search?dept=xxALL&level=ALL', function(err, resp, body) {
		if( !err && resp.statusCode == 200) {
			var $ = cheerio.load(body);
			$('tbody tr', '#content').each(function(i, tr) {
				var child = $(this).children();
				var moduleCode = child.eq(0);
				moduleLink = child.eq(0).children().eq(0);
				var year = child.eq(1);
				var title = child.eq(2);
				var row = {
						"moduleCode": moduleCode.text(),
						"moduleLink": moduleLink.attr('href'),
						"year": year.text(),
						"title": title.text()
				};
				allModules.push(moduleCode.text());
				request('https://portal.st-andrews.ac.uk/catalogue/' + moduleLink.attr('href'), function(err, resp, body) {
						if ( !err && resp.statusCode == 200) {
							var $ = cheerio.load(body);
							$('tr', '#content').each(function(i, tr) {
								var child = $(this).children();
								var deet = child.eq(0);
								var val = child.eq(1);
								var deetText = deet.text();
								row[deetText] = val.text();
							});
							console.log(row);
							rows.push(row);
						}
						fs.writeFile('data1.json', JSON.stringify(rows, null, 4), function(err) {
							console.log("successful writing rows");
						});
				});
			});
			fs.writeFile('moduleCodes.json', JSON.stringify(allModules, null, 4), function(err) {
				console.log("successful writing module codes");
			});
		}
});

