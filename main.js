const checkCount = require('./req');
const moment = require('moment-jalaali')
const config = require('./config.json')

for (let office of Object.keys(config.offices)) {
	let m = moment();
	for (let i = 0; i < 6; i++) {
		m.add(1, 'day')
		let date = m.format('jYYYY/jMM/jDD').split('/');
		checkCount(config.offices[office],date[0]+'-'+date[1]+'-' + date[2],14).then((res,err)=>{
			console.log(office + ", " + date[0]+'/'+date[1]+'/'+date[2]+": " + res);
		})
	}
}
