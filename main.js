const checkCount = require('./req');
const moment = require('moment-jalaali')
const config = require('./config.json')
let promises = []
let results = []

for (let office of Object.keys(config.offices)) {
	let m = moment();
	for (let i = 0; i < 6; i++) {
		m.add(1, 'day')
		let date = m.format('jYYYY/jMM/jDD').split('/');
		promises.push(checkCount(config.offices[office],date[0]+'-'+date[1]+'-' + date[2],14).then((res,err)=>{
			results.push({"office": office, "date": date[0]+"/"+date[1]+"/"+date[2], "count": res});
		}));
	}
}

Promise.all(promises).then(()=>{
	results.sort((a,b)=>{
		return ('' + a.office).localeCompare(b.office);
	})
	console.table(results)
})
