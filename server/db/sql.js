const mysql = require('mysql');
let connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:"root1234",
	// database:'vue_store'
	database:'taowu'
})
module.exports = connection;