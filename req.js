process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

const request = require('request');
const config = require('./config.json');

function checkCount(officeID, date, special) {
	let headers = {
		'authority': 'nobatdehi.epolice.ir',
		'pragma': 'no-cache',
		'cache-control': 'no-cache',
		'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
		'accept': 'application/json, text/javascript, */*; q=0.01',
		'sec-ch-ua-mobile': '?0',
		'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
		'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'origin': 'https://nobatdehi.epolice.ir',
		'sec-fetch-site': 'same-origin',
		'sec-fetch-mode': 'cors',
		'sec-fetch-dest': 'empty',
		'referer': 'https://nobatdehi.epolice.ir/office/19863',
		'accept-language': 'en-US,en;q=0.9',
		'cookie': config.cookie
	};

	let dataString = 'office_id=' + officeID + '&get_date=' + date + '&special=' + special;

	let options = {
		url: 'https://nobatdehi.epolice.ir/reserve_office/',
		method: 'POST',
		headers: headers,
		body: dataString
	};

	return new Promise((resolve, reject)=>{
		request(options, (error, response, body) => {
			if (!error && response.statusCode == 200) {
				let startIndex = body.search("count_open");
				let finishIndex = body.search("show_dialog");
				let countOpen = parseInt(body.slice(startIndex+"count_open".length+2,finishIndex-2));
				resolve(countOpen)
			}
		});
	})
}

module.exports = checkCount;

