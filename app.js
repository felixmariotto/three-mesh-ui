const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express()
	
	.use(express.static('public'))

	.get('/', (req, res)=> {
		res.sendFile(path.join(__dirname + '/public/index.html'));
	})

	.listen(PORT, ()=> {
		console.log('App listening on port ' + PORT);
	})